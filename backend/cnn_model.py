import os
import numpy as np
import pickle
from PIL import Image

# Try importing tensorflow safely
try:
    import tensorflow as tf
    from tensorflow.keras.models import Sequential
    from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense
    TENSORFLOW_AVAILABLE = True
except ImportError:
    TENSORFLOW_AVAILABLE = False

from sklearn.ensemble import RandomForestClassifier
from sklearn.neural_network import MLPClassifier

CATEGORIES = ['garbage', 'pothole', 'streetlight', 'traffic', 'water_supply', 'vandalism', 'drainage', 'other']

# Feature Engineering Helper
def extract_features(image_path, latitude, longitude, severity):
    # 1. Image features
    try:
        img = Image.open(image_path).convert('RGB')
        img_resized = img.resize((32, 32))
        arr = np.array(img_resized)
        
        # Color histograms / statistics
        mean_r = np.mean(arr[:, :, 0]) / 255.0
        mean_g = np.mean(arr[:, :, 1]) / 255.0
        mean_b = np.mean(arr[:, :, 2]) / 255.0
        std_r = np.std(arr[:, :, 0]) / 255.0
        std_g = np.std(arr[:, :, 1]) / 255.0
        std_b = np.std(arr[:, :, 2]) / 255.0
        
        # Simple edge density / texture proxy
        gray = np.mean(arr, axis=2)
        diff_h = np.abs(gray[:, :-1] - gray[:, 1:])
        diff_v = np.abs(gray[:-1, :] - gray[1:, :])
        edge_density = (np.mean(diff_h) + np.mean(diff_v)) / 255.0
    except Exception as e:
        print(f"Error extracting image features: {e}")
        mean_r, mean_g, mean_b, std_r, std_g, std_b, edge_density = 0.5, 0.5, 0.5, 0.2, 0.2, 0.2, 0.1

    # 2. Metadata validation and imputation
    # Severity code
    sev_map = {'low': 0, 'medium': 1, 'high': 2}
    sev_code = sev_map.get(str(severity).lower(), 1)
    
    # Lat/Lng validation (India bounds roughly)
    try:
        lat = float(latitude) if latitude is not None else 18.5204
        lng = float(longitude) if longitude is not None else 73.8567
        if not (6.0 <= lat <= 38.0) or not (68.0 <= lng <= 98.0):
            # Impute to Pune center if out of bounds
            lat = 18.5204
            lng = 73.8567
    except (ValueError, TypeError):
        lat = 18.5204
        lng = 73.8567
        
    return np.array([mean_r, mean_g, mean_b, std_r, std_g, std_b, edge_density, sev_code, lat, lng], dtype=np.float32)

class HybridCivicModel:
    def __init__(self):
        # 1. CNN Model (TensorFlow or MLP fallback)
        if TENSORFLOW_AVAILABLE:
            print("TensorFlow available. Initializing CNN model...")
            self.cnn = Sequential([
                Conv2D(32, (3, 3), activation='relu', input_shape=(32, 32, 3)),
                MaxPooling2D((2, 2)),
                Conv2D(64, (3, 3), activation='relu'),
                MaxPooling2D((2, 2)),
                Flatten(),
                Dense(64, activation='relu'),
                Dense(len(CATEGORIES), activation='softmax')
            ])
            self.cnn.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
            self.cnn_fitted = False
        else:
            print("TensorFlow NOT available. Initializing MLP fallback...")
            self.cnn = MLPClassifier(hidden_layer_sizes=(64, 32), max_iter=100, random_state=42)
            self.cnn_fitted = False
            
        # 2. Random Forest Model (Scikit-Learn)
        self.rf = RandomForestClassifier(n_estimators=100, random_state=42)
        self.rf_fitted = False

    def train_cnn(self, X_images, y):
        # X_images shape: (N, 32, 32, 3)
        if TENSORFLOW_AVAILABLE:
            self.cnn.fit(X_images, y, epochs=10, batch_size=16, verbose=0)
            self.cnn_fitted = True
        else:
            # Flatten images for MLP
            N = X_images.shape[0]
            X_flat = X_images.reshape(N, -1)
            self.cnn.fit(X_flat, y)
            self.cnn_fitted = True

    def train_rf(self, X_features, y):
        # X_features shape: (N, 10)
        self.rf.fit(X_features, y)
        self.rf_fitted = True

    def predict_cnn_probs(self, X_image):
        # X_image shape: (1, 32, 32, 3) or (32, 32, 3)
        if len(X_image.shape) == 3:
            X_image = np.expand_dims(X_image, axis=0)
            
        if not self.cnn_fitted:
            return np.ones(len(CATEGORIES)) / len(CATEGORIES)
            
        if TENSORFLOW_AVAILABLE:
            probs = self.cnn.predict(X_image, verbose=0)[0]
            return probs
        else:
            # Flatten image for MLP
            X_flat = X_image.reshape(1, -1)
            probs = self.cnn.predict_proba(X_flat)[0]
            return probs

    def predict_rf_probs(self, X_feature):
        # X_feature shape: (10,) or (1, 10)
        if len(X_feature.shape) == 1:
            X_feature = X_feature.reshape(1, -1)
            
        if not self.rf_fitted:
            return np.ones(len(CATEGORIES)) / len(CATEGORIES)
            
        probs = self.rf.predict_proba(X_feature)[0]
        return probs

    def predict_hybrid(self, image_path, latitude=None, longitude=None, severity='medium'):
        # 1. Preprocess and get inputs
        try:
            img = Image.open(image_path).convert('RGB')
            img = img.resize((32, 32))
            arr = np.array(img).astype(np.float32) / 255.0
        except Exception:
            arr = np.random.rand(32, 32, 3).astype(np.float32)
            
        # Get probability from CNN
        cnn_probs = self.predict_cnn_probs(arr)
        
        # Get probability from Random Forest
        feat = extract_features(image_path, latitude, longitude, severity)
        rf_probs = self.predict_rf_probs(feat)
        
        # Hybrid prediction (average of both probabilities)
        hybrid_probs = 0.5 * cnn_probs + 0.5 * rf_probs
        pred_idx = int(np.argmax(hybrid_probs))
        
        return CATEGORIES[pred_idx], float(hybrid_probs[pred_idx])

# Global model save paths
cnn_model_dir = os.path.dirname(os.path.abspath(__file__))
cnn_path_tf = os.path.join(cnn_model_dir, 'cnn_model_tf')
mlp_path_pkl = os.path.join(cnn_model_dir, 'mlp_model.pkl')
rf_path_pkl = os.path.join(cnn_model_dir, 'rf_model.pkl')

_model_instance = None

def get_model():
    global _model_instance
    if _model_instance is not None:
        return _model_instance
        
    _model_instance = HybridCivicModel()
    
    # Load CNN
    if TENSORFLOW_AVAILABLE:
        if os.path.exists(cnn_path_tf) or os.path.exists(cnn_path_tf + '.keras'):
            try:
                # Load Keras model
                p = cnn_path_tf if os.path.exists(cnn_path_tf) else cnn_path_tf + '.keras'
                _model_instance.cnn = tf.keras.models.load_model(p)
                _model_instance.cnn_fitted = True
                print("Loaded trained TensorFlow CNN model.")
            except Exception as e:
                print(f"Failed to load TensorFlow model: {e}")
    else:
        if os.path.exists(mlp_path_pkl):
            try:
                with open(mlp_path_pkl, 'rb') as f:
                    _model_instance.cnn = pickle.load(f)
                _model_instance.cnn_fitted = True
                print("Loaded trained MLP fallback model.")
            except Exception as e:
                print(f"Failed to load MLP model: {e}")
                
    # Load RF
    if os.path.exists(rf_path_pkl):
        try:
            with open(rf_path_pkl, 'rb') as f:
                _model_instance.rf = pickle.load(f)
            _model_instance.rf_fitted = True
            print("Loaded trained Random Forest model.")
        except Exception as e:
            print(f"Failed to load Random Forest model: {e}")
            
    return _model_instance

def predict_category(image_path, latitude=None, longitude=None, severity='medium'):
    model = get_model()
    # Call the hybrid prediction
    return model.predict_hybrid(image_path, latitude, longitude, severity)

def save_model(model):
    # Save CNN
    if TENSORFLOW_AVAILABLE:
        try:
            model.cnn.save(cnn_path_tf + '.keras')
            print(f"Saved TensorFlow CNN model to {cnn_path_tf}.keras")
        except Exception as e:
            print(f"Failed to save TensorFlow CNN: {e}")
    else:
        try:
            with open(mlp_path_pkl, 'wb') as f:
                pickle.dump(model.cnn, f)
            print(f"Saved MLP model to {mlp_path_pkl}")
        except Exception as e:
            print(f"Failed to save MLP model: {e}")
            
    # Save RF
    try:
        with open(rf_path_pkl, 'wb') as f:
            pickle.dump(model.rf, f)
        print(f"Saved Random Forest model to {rf_path_pkl}")
    except Exception as e:
        print(f"Failed to save Random Forest model: {e}")

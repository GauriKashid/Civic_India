import os
import numpy as np
import pickle
from PIL import Image
from sklearn.neural_network import MLPClassifier
from sklearn.exceptions import NotFittedError

CATEGORIES = ['garbage', 'pothole', 'streetlight', 'traffic', 'water_supply', 'vandalism', 'drainage', 'other']

class SimpleCNN:
    def __init__(self, input_shape=(3, 32, 32), num_classes=8):
        self.input_shape = input_shape
        self.num_classes = num_classes
        # Use MLPClassifier to replace the complex manual CNN.
        # This standard neural network is clean, fast, and easy to maintain.
        self.clf = MLPClassifier(
            hidden_layer_sizes=(64, 32),
            activation='relu',
            solver='adam',
            max_iter=50,
            random_state=42
        )
        self.is_fitted = False
        
    def forward(self, X):
        # Flatten input: X is of shape (C, H, W) e.g., (3, 32, 32)
        X_flat = X.flatten().reshape(1, -1)
        
        if not self.is_fitted:
            # Return uniform probabilities if not yet trained
            return np.ones((self.num_classes, 1)) / self.num_classes
            
        try:
            probs = self.clf.predict_proba(X_flat)[0]
            return probs.reshape(-1, 1)
        except NotFittedError:
            return np.ones((self.num_classes, 1)) / self.num_classes

    def train(self, X_train, y_train):
        # X_train shape: (N, C, H, W). Flatten to (N, C*H*W)
        N = X_train.shape[0]
        X_flat = X_train.reshape(N, -1)
        self.clf.fit(X_flat, y_train)
        self.is_fitted = True

    def save(self, filepath):
        with open(filepath, 'wb') as f:
            pickle.dump(self, f)
            
    @staticmethod
    def load(filepath):
        with open(filepath, 'rb') as f:
            return pickle.load(f)

# Helper function to preprocess image
def preprocess_image(image_path):
    try:
        img = Image.open(image_path).convert('RGB')
        img = img.resize((32, 32))
        arr = np.array(img).astype(np.float32) / 255.0
        # Transpose to (C, H, W)
        arr = arr.transpose((2, 0, 1))
        return arr
    except Exception as e:
        print(f"Error preprocessing image: {e}")
        # Return a dummy image array in case of error
        return np.random.rand(3, 32, 32).astype(np.float32)

# Global model instance
model_path = os.path.join(os.path.dirname(__file__), 'model.pkl')
_model = None

def get_model():
    global _model
    if _model is not None:
        return _model
    
    if os.path.exists(model_path):
        try:
            _model = SimpleCNN.load(model_path)
            print("Loaded trained model weights.")
        except Exception as e:
            print(f"Failed to load model: {e}")
            _model = SimpleCNN()
    else:
        print("Model file not found. Initializing a new model.")
        _model = SimpleCNN()
        
    return _model

def predict_category(image_path):
    model = get_model()
    x = preprocess_image(image_path)
    probs = model.forward(x).flatten()
    pred_idx = int(np.argmax(probs))
    category = CATEGORIES[pred_idx]
    confidence = float(probs[pred_idx])
    return category, confidence

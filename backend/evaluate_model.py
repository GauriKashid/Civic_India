import os
import numpy as np
from PIL import Image
from cnn_model import (
    HybridCivicModel, CATEGORIES, save_model, extract_features,
    TENSORFLOW_AVAILABLE
)
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix
from sklearn.model_selection import cross_val_score, GridSearchCV
from sklearn.ensemble import RandomForestClassifier

# Generate synthetic dataset representing 8 classes of civic issues with images and tabular metadata
def generate_synthetic_data(num_samples_per_class=30):
    np.random.seed(42)
    X_images = []
    y = []
    metadata = []  # dict with latitude, longitude, severity
    
    severities = ['low', 'medium', 'high']
    
    # Normal coordinates for Pune: lat 18.5204, lng 73.8567
    for label_idx, category in enumerate(CATEGORIES):
        for _ in range(num_samples_per_class):
            # Create a 32x32x3 image with class-specific characteristics
            # Note: channel-last for standard TF CNN (32, 32, 3)
            img = np.random.rand(32, 32, 3) * 0.2  # background noise
            
            # Severity mapping (categories might have higher chance of high severity)
            if category in ['pothole', 'drainage', 'vandalism']:
                sev = np.random.choice(severities, p=[0.1, 0.3, 0.6])
            else:
                sev = np.random.choice(severities, p=[0.4, 0.4, 0.2])
                
            # Geographic coordinates in Pune area (+/- 0.05 variation)
            lat = 18.5204 + np.random.uniform(-0.05, 0.05)
            lng = 73.8567 + np.random.uniform(-0.05, 0.05)
            
            # Occasionally inject an invalid coordinate for preprocessing testing
            if np.random.rand() < 0.05:
                lat = 999.0  # Out of bounds
                
            if category == 'garbage':
                # Green/brown blobs
                img[10:22, 10:22, 1] += 0.6  # excess green
                img[12:20, 12:20, 0] += 0.3  # some red
            elif category == 'pothole':
                # Dark circle
                img[12:20, 12:20, :] -= 0.15
            elif category == 'streetlight':
                # Bright yellow center (high red & green)
                img[14:18, 14:18, 0] += 0.8
                img[14:18, 14:18, 1] += 0.8
            elif category == 'traffic':
                # Red traffic line
                img[5:8, :, 0] += 0.7
            elif category == 'water_supply':
                # Blue high
                img[:, 12:20, 2] += 0.7
            elif category == 'vandalism':
                # Graffiti (spiky red lines)
                for i in range(5, 27):
                    img[i, i, 0] += 0.7
                    img[i, 31 - i, 0] += 0.7
            elif category == 'drainage':
                # Dark mud (high red/green, low blue)
                img[15:28, :, 0] += 0.4
                img[15:28, :, 1] += 0.3
            else:
                # Other: white noise
                img += 0.2
            
            img = np.clip(img, 0.0, 1.0)
            X_images.append(img)
            y.append(label_idx)
            metadata.append({
                'latitude': lat,
                'longitude': lng,
                'severity': sev
            })
            
    return np.array(X_images), np.array(y), metadata

def main():
    print("--- Model Training and Evaluation Pipeline ---")
    print(f"TensorFlow Available: {TENSORFLOW_AVAILABLE}")
    
    print("\nGenerating synthetic datasets representing 8 civic issue categories...")
    X_images, y, metadata = generate_synthetic_data(num_samples_per_class=25)
    N = len(X_images)
    
    print(f"Total samples generated: {N}")
    
    # 1. Feature Engineering and Preprocessing
    print("\nRunning Feature Engineering on dataset...")
    # Temporarily save images to extract features (simulate real files)
    temp_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'temp_dataset')
    os.makedirs(temp_dir, exist_ok=True)
    
    X_features = []
    for i in range(N):
        temp_img_path = os.path.join(temp_dir, f"temp_{i}.png")
        # Save image
        img_pil = Image.fromarray((X_images[i] * 255.0).astype(np.uint8))
        img_pil.save(temp_img_path)
        
        # Extract features
        feat = extract_features(
            temp_img_path,
            metadata[i]['latitude'],
            metadata[i]['longitude'],
            metadata[i]['severity']
        )
        X_features.append(feat)
        
        # Clean up
        try:
            os.remove(temp_img_path)
        except Exception:
            pass
            
    X_features = np.array(X_features)
    try:
        os.rmdir(temp_dir)
    except Exception:
        pass
        
    print(f"Feature vector shape: {X_features.shape}")
    print("First sample features:")
    print(f" - Color Means (RGB): {X_features[0][:3]}")
    print(f" - Color Stds (RGB):  {X_features[0][3:6]}")
    print(f" - Edge Density:     {X_features[0][6]:.4f}")
    print(f" - Severity Code:    {X_features[0][7]}")
    print(f" - Validated Lat/Lng: {X_features[0][8]:.4f}, {X_features[0][9]:.4f}")
    
    # Train-test split (80-20)
    indices = np.arange(N)
    np.random.seed(42)
    np.random.shuffle(indices)
    
    split = int(0.8 * N)
    train_idx, test_idx = indices[:split], indices[split:]
    
    X_images_train, X_images_test = X_images[train_idx], X_images[test_idx]
    X_features_train, X_features_test = X_features[train_idx], X_features[test_idx]
    y_train, y_test = y[train_idx], y[test_idx]
    
    # 2. Hyperparameter Tuning for Random Forest
    print("\nTuning Hyperparameters for Random Forest Classifier...")
    rf_grid = {
        'n_estimators': [50, 100],
        'max_depth': [None, 10, 20],
        'min_samples_split': [2, 5]
    }
    grid_search = GridSearchCV(RandomForestClassifier(random_state=42), rf_grid, cv=3)
    grid_search.fit(X_features_train, y_train)
    best_rf = grid_search.best_estimator_
    print(f"Best RF Parameters: {grid_search.best_params_}")
    
    # Initialize our hybrid model
    model = HybridCivicModel()
    model.rf = best_rf
    model.rf_fitted = True
    
    # 3. Train Models
    print("\nTraining CNN / Image Classifier Model...")
    model.train_cnn(X_images_train, y_train)
    print("CNN Model training completed.")
    
    print("\nTraining Random Forest Classifier Model...")
    model.train_rf(X_features_train, y_train)
    print("Random Forest training completed.")
    
    # 4. Evaluation Framework
    print("\n--- MODEL EVALUATION ---")
    
    # Evaluate CNN
    y_pred_cnn = []
    for img in X_images_test:
        probs = model.predict_cnn_probs(img)
        y_pred_cnn.append(np.argmax(probs))
    y_pred_cnn = np.array(y_pred_cnn)
    
    # Evaluate Random Forest
    y_pred_rf = []
    for feat in X_features_test:
        probs = model.predict_rf_probs(feat)
        y_pred_rf.append(np.argmax(probs))
    y_pred_rf = np.array(y_pred_rf)
    
    # Evaluate Hybrid
    y_pred_hybrid = []
    # Combine predictions
    for i in range(len(X_images_test)):
        cnn_p = model.predict_cnn_probs(X_images_test[i])
        rf_p = model.predict_rf_probs(X_features_test[i])
        hybrid_p = 0.5 * cnn_p + 0.5 * rf_p
        y_pred_hybrid.append(np.argmax(hybrid_p))
    y_pred_hybrid = np.array(y_pred_hybrid)
    
    def print_metrics(y_true, y_pred, name):
        acc = accuracy_score(y_true, y_pred)
        prec = precision_score(y_true, y_pred, average='macro', zero_division=0)
        rec = recall_score(y_true, y_pred, average='macro', zero_division=0)
        f1 = f1_score(y_true, y_pred, average='macro', zero_division=0)
        print(f"\n{name} Model Performance:")
        print(f" - Accuracy:  {acc:.4f}")
        print(f" - Precision: {prec:.4f}")
        print(f" - Recall:    {rec:.4f}")
        print(f" - F1-Score:  {f1:.4f}")
        return acc
        
    print_metrics(y_test, y_pred_cnn, "CNN")
    print_metrics(y_test, y_pred_rf, "Random Forest")
    hybrid_acc = print_metrics(y_test, y_pred_hybrid, "Hybrid (CNN + RF)")
    
    # Cross Validation on Random Forest (Structured Features)
    print("\nRunning Cross-Validation on Random Forest Classifier...")
    scores = cross_val_score(model.rf, X_features, y, cv=5)
    print(f"CV Fold Accuracies: {scores}")
    print(f"Average CV Accuracy: {np.mean(scores):.4f}")
    
    # Confusion Matrix for Hybrid model
    print("\nConfusion Matrix for Hybrid Model:")
    cm = confusion_matrix(y_test, y_pred_hybrid)
    header = "True \\ Pred | " + " | ".join([c[:4] for c in CATEGORIES])
    print(header)
    print("-" * len(header))
    for idx, row in enumerate(cm):
        row_str = " | ".join([f"{val:4}" for val in row])
        print(f"{CATEGORIES[idx][:10]:10} | {row_str}")
        
    # Save model files
    save_model(model)
    print("\nAll trained models saved successfully!")

if __name__ == "__main__":
    main()

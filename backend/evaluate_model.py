import os
import numpy as np
from cnn_model import SimpleCNN, CATEGORIES, model_path
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix
from sklearn.model_selection import cross_val_score

# Generate synthetic dataset representing 8 classes of civic issues
def generate_synthetic_data(num_samples_per_class=20):
    np.random.seed(42)
    X = []
    y = []
    
    for label_idx, category in enumerate(CATEGORIES):
        for _ in range(num_samples_per_class):
            # Create a 3x32x32 image with class-specific characteristics
            img = np.random.rand(3, 32, 32) * 0.2  # background noise
            
            if category == 'garbage':
                # Green/brown blobs
                img[1, 10:22, 10:22] += 0.6  # excess green
                img[0, 12:20, 12:20] += 0.3  # some red
            elif category == 'pothole':
                # Dark grey/black circles
                img[:, 12:20, 12:20] -= 0.15  # darker circle
                img = np.clip(img, 0, 1)
            elif category == 'streetlight':
                # Bright yellow center (high red & green)
                img[0, 14:18, 14:18] += 0.8
                img[1, 14:18, 14:18] += 0.8
            elif category == 'traffic':
                # Red/green horizontal traffic line
                img[0, 5:8, :] += 0.7  # red bar
            elif category == 'water_supply':
                # Blue lines/streams
                img[2, :, 12:20] += 0.7  # blue channel high
            elif category == 'vandalism':
                # Graffiti (spiky red lines)
                for i in range(5, 27):
                    img[0, i, i] += 0.7
                    img[0, i, 31 - i] += 0.7
            elif category == 'drainage':
                # Dark mud (high red/green, low blue)
                img[0, 15:28, :] += 0.4
                img[1, 15:28, :] += 0.3
            else:
                # Other: white noise
                img += 0.2
            
            img = np.clip(img, 0.0, 1.0)
            X.append(img)
            y.append(label_idx)
            
    return np.array(X), np.array(y)

# Simplified training helper using standard scikit-learn fitting
def train_model(model, X, y, epochs=10, lr=0.01):
    model.train(X, y)

# Evaluate metrics using standard scikit-learn metrics instead of custom formulas
def evaluate(model, X_eval, y_eval):
    y_pred = []
    for x in X_eval:
        probs = model.forward(x).flatten()
        y_pred.append(np.argmax(probs))
    y_pred = np.array(y_pred)
    
    accuracy = accuracy_score(y_eval, y_pred)
    precision = precision_score(y_eval, y_pred, average=None, zero_division=0).tolist()
    recall = recall_score(y_eval, y_pred, average=None, zero_division=0).tolist()
    f1 = f1_score(y_eval, y_pred, average=None, zero_division=0).tolist()
    
    avg_precision = precision_score(y_eval, y_pred, average='macro', zero_division=0)
    avg_recall = recall_score(y_eval, y_pred, average='macro', zero_division=0)
    avg_f1 = f1_score(y_eval, y_pred, average='macro', zero_division=0)
    
    cm = confusion_matrix(y_eval, y_pred)
    
    return {
        'accuracy': accuracy,
        'precision': avg_precision,
        'recall': avg_recall,
        'f1_score': avg_f1,
        'class_precision': precision,
        'class_recall': recall,
        'class_f1': f1,
        'confusion_matrix': cm
    }

# Simplified cross-validation helper using standard cross_val_score
def cross_validate(X, y, k=5, epochs=5, lr=0.01):
    X_flat = X.reshape(len(X), -1)
    dummy_model = SimpleCNN()
    scores = cross_val_score(dummy_model.clf, X_flat, y, cv=k)
    return scores

def main():
    print("--- STEP 8: Model Evaluation (Development Phase) ---")
    print("Generating synthetic image datasets for 8 civic issue categories...")
    X, y = generate_synthetic_data(num_samples_per_class=6) # 48 samples total
    
    # Train-test split (80-20)
    split_idx = int(0.8 * len(X))
    shuffled_idx = np.arange(len(X))
    np.random.seed(42)
    np.random.shuffle(shuffled_idx)
    
    train_idx = shuffled_idx[:split_idx]
    test_idx = shuffled_idx[split_idx:]
    
    X_train, y_train = X[train_idx], y[train_idx]
    X_test, y_test = X[test_idx], y[test_idx]
    
    print(f"Total samples: {len(X)}")
    print(f"Train samples: {len(X_train)}")
    print(f"Test samples: {len(X_test)}")
    
    print("\nTraining MLP Neural Network Model using scikit-learn...")
    model = SimpleCNN()
    train_model(model, X_train, y_train)
    
    print("\nEvaluating Model on Test Data...")
    metrics = evaluate(model, X_test, y_test)
    
    print("\n--- MODEL METRICS ---")
    print(f"Accuracy:  {metrics['accuracy']:.4f}")
    print(f"Precision: {metrics['precision']:.4f}")
    print(f"Recall:    {metrics['recall']:.4f}")
    print(f"F1-Score:  {metrics['f1_score']:.4f}")
    
    print("\nConfusion Matrix:")
    header = "True \\ Pred | " + " | ".join([c[:4] for c in CATEGORIES])
    print(header)
    print("-" * len(header))
    for idx, row in enumerate(metrics['confusion_matrix']):
        row_str = " | ".join([f"{val:4}" for val in row])
        print(f"{CATEGORIES[idx][:10]:10} | {row_str}")
        
    print("\nRunning 3-Fold Cross-Validation...")
    cv_scores = cross_validate(X, y, k=3)
    print(f"CV Fold Accuracies: {cv_scores}")
    print(f"Average CV Accuracy: {np.mean(cv_scores):.4f}")
    
    # Save the model
    os.makedirs(os.path.dirname(model_path), exist_ok=True)
    model.save(model_path)
    print(f"\nModel training completed and weights saved to {model_path}!")

if __name__ == "__main__":
    main()

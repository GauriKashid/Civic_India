import os
import numpy as np
from cnn_model import SimpleCNN, CATEGORIES, model_path

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

# Backprop training loop for the custom NumPy CNN
def train_one_sample(model, X_sample, y_label, lr=0.01):
    # 1. Forward Pass
    probs = model.forward(X_sample)
    
    # One-hot target
    target = np.zeros((model.num_classes, 1))
    target[y_label] = 1.0
    
    # Loss: Cross Entropy
    loss = -np.log(probs[y_label] + 1e-15)
    
    # 2. Backward Pass
    # Gradient of FC layer
    d_fc_out = probs - target  # shape (num_classes, 1)
    d_W_fc = np.dot(d_fc_out, model.flat_out.T)
    d_b_fc = d_fc_out
    d_flat_out = np.dot(model.W_fc.T, d_fc_out)  # shape (fc_in_dim, 1)
    
    # Reshape d_flat_out to pool_out shape
    d_pool_out = d_flat_out.reshape(model.num_filters, model.pool_out_h, model.pool_out_w)
    
    # Max Pool Backward Pass
    d_relu_out = np.zeros_like(model.relu_out)
    for f in range(model.num_filters):
        for i in range(model.pool_out_h):
            for j in range(model.pool_out_w):
                # Locate the index of max value in the patch
                h_start = i * model.pool_size
                h_end = h_start + model.pool_size
                w_start = j * model.pool_size
                w_end = w_start + model.pool_size
                
                patch = model.relu_out[f, h_start:h_end, w_start:w_end]
                max_val = np.max(patch)
                
                for pi in range(model.pool_size):
                    for pj in range(model.pool_size):
                        if patch[pi, pj] == max_val:
                            d_relu_out[f, h_start + pi, w_start + pj] = d_pool_out[f, i, j]
                            break
                            
    # ReLU Backward Pass
    d_conv_out = d_relu_out * (model.conv_out > 0)
    
    # Conv Backward Pass
    d_filters = np.zeros_like(model.filters)
    d_conv_bias = np.zeros_like(model.conv_bias)
    
    C, H, W = X_sample.shape
    for f in range(model.num_filters):
        d_conv_bias[f] = np.sum(d_conv_out[f])
        for c in range(C):
            for i in range(model.input_shape[1] - model.filter_size + 1):
                for j in range(model.input_shape[2] - model.filter_size + 1):
                    d_filters[f, c] += d_conv_out[f, i, j] * X_sample[c, i:i+model.filter_size, j:j+model.filter_size]
                    
    # Update Weights via SGD
    model.W_fc -= lr * d_W_fc
    model.b_fc -= lr * d_b_fc
    model.filters -= lr * d_filters
    model.conv_bias -= lr * d_conv_bias
    
    return loss[0]

def train_model(model, X, y, epochs=10, lr=0.01):
    for epoch in range(epochs):
        # Shuffle
        indices = np.arange(len(X))
        np.random.shuffle(indices)
        epoch_loss = 0
        for idx in indices:
            loss = train_one_sample(model, X[idx], y[idx], lr)
            epoch_loss += loss
        # print(f"Epoch {epoch+1}/{epochs} - Avg Loss: {epoch_loss / len(X):.4f}")

def evaluate(model, X_eval, y_eval):
    y_pred = []
    for x in X_eval:
        probs = model.forward(x).flatten()
        y_pred.append(np.argmax(probs))
    y_pred = np.array(y_pred)
    
    # Accuracy
    accuracy = np.mean(y_pred == y_eval)
    
    # Precision, Recall, F1
    num_classes = len(CATEGORIES)
    precision = []
    recall = []
    f1_score = []
    
    confusion_matrix = np.zeros((num_classes, num_classes), dtype=int)
    for t_val, p_val in zip(y_eval, y_pred):
        confusion_matrix[t_val, p_val] += 1
        
    for c in range(num_classes):
        tp = confusion_matrix[c, c]
        fp = np.sum(confusion_matrix[:, c]) - tp
        fn = np.sum(confusion_matrix[c, :]) - tp
        
        prec = tp / (tp + fp) if (tp + fp) > 0 else 0
        rec = tp / (tp + fn) if (tp + fn) > 0 else 0
        f1 = 2 * prec * rec / (prec + rec) if (prec + rec) > 0 else 0
        
        precision.append(prec)
        recall.append(rec)
        f1_score.append(f1)
        
    avg_precision = np.mean(precision)
    avg_recall = np.mean(recall)
    avg_f1 = np.mean(f1_score)
    
    return {
        'accuracy': accuracy,
        'precision': avg_precision,
        'recall': avg_recall,
        'f1_score': avg_f1,
        'class_precision': precision,
        'class_recall': recall,
        'class_f1': f1_score,
        'confusion_matrix': confusion_matrix
    }

def cross_validate(X, y, k=5, epochs=5, lr=0.01):
    fold_size = len(X) // k
    indices = np.arange(len(X))
    np.random.shuffle(indices)
    
    accuracies = []
    
    for fold in range(k):
        val_indices = indices[fold*fold_size : (fold+1)*fold_size]
        train_indices = np.setdiff1d(indices, val_indices)
        
        X_train, y_train = X[train_indices], y[train_indices]
        X_val, y_val = X[val_indices], y[val_indices]
        
        fold_model = SimpleCNN()
        train_model(fold_model, X_train, y_train, epochs=epochs, lr=lr)
        
        metrics = evaluate(fold_model, X_val, y_val)
        accuracies.append(metrics['accuracy'])
        
    return accuracies

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
    
    print("\nTraining CNN Model using NumPy Backpropagation...")
    model = SimpleCNN()
    train_model(model, X_train, y_train, epochs=3, lr=0.05)
    
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
    cv_scores = cross_validate(X, y, k=3, epochs=1, lr=0.05)
    print(f"CV Fold Accuracies: {cv_scores}")
    print(f"Average CV Accuracy: {np.mean(cv_scores):.4f}")
    
    # Save the model
    os.makedirs(os.path.dirname(model_path), exist_ok=True)
    model.save(model_path)
    print(f"\nModel training completed and weights saved to {model_path}!")

if __name__ == "__main__":
    main()

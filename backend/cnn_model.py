import os
import numpy as np
import pickle
from PIL import Image

CATEGORIES = ['garbage', 'pothole', 'streetlight', 'traffic', 'water_supply', 'vandalism', 'drainage', 'other']

class SimpleCNN:
    def __init__(self, input_shape=(3, 32, 32), num_classes=8):
        self.input_shape = input_shape
        self.num_classes = num_classes
        self.num_filters = 8
        self.filter_size = 3
        self.pool_size = 2
        
        # Initialize filter weights and biases
        # Filters shape: (num_filters, channels, filter_size, filter_size)
        self.filters = np.random.randn(self.num_filters, input_shape[0], self.filter_size, self.filter_size) * 0.1
        self.conv_bias = np.zeros((self.num_filters, 1, 1))
        
        conv_out_h = input_shape[1] - self.filter_size + 1
        conv_out_w = input_shape[2] - self.filter_size + 1
        
        self.pool_out_h = conv_out_h // self.pool_size
        self.pool_out_w = conv_out_w // self.pool_size
        self.fc_in_dim = self.num_filters * self.pool_out_h * self.pool_out_w
        
        # FC layer weights and biases
        self.W_fc = np.random.randn(num_classes, self.fc_in_dim) * np.sqrt(2.0 / self.fc_in_dim)
        self.b_fc = np.zeros((num_classes, 1))
        
    def conv_forward(self, X):
        C, H, W = X.shape
        out_h = H - self.filter_size + 1
        out_w = W - self.filter_size + 1
        out = np.zeros((self.num_filters, out_h, out_w))
        
        for f in range(self.num_filters):
            for c in range(C):
                for i in range(out_h):
                    for j in range(out_w):
                        patch = X[c, i:i+self.filter_size, j:j+self.filter_size]
                        out[f, i, j] += np.sum(patch * self.filters[f, c])
            out[f] += self.conv_bias[f]
        return out
        
    def maxpool_forward(self, X):
        F, H, W = X.shape
        out_h = H // self.pool_size
        out_w = W // self.pool_size
        out = np.zeros((F, out_h, out_w))
        
        for f in range(F):
            for i in range(out_h):
                for j in range(out_w):
                    patch = X[f, i*self.pool_size:(i+1)*self.pool_size, j*self.pool_size:(j+1)*self.pool_size]
                    out[f, i, j] = np.max(patch)
        return out

    def relu(self, X):
        return np.maximum(0, X)
        
    def softmax(self, z):
        exp_z = np.exp(z - np.max(z))
        return exp_z / np.sum(exp_z, axis=0, keepdims=True)
        
    def forward(self, X):
        # Input shape: (C, H, W)
        self.last_input = X
        
        # Conv + ReLU
        self.conv_out = self.conv_forward(X)
        self.relu_out = self.relu(self.conv_out)
        
        # Max Pooling
        self.pool_out = self.maxpool_forward(self.relu_out)
        
        # Flatten
        self.flat_out = self.pool_out.flatten().reshape(-1, 1)
        
        # FC + Softmax
        self.fc_out = np.dot(self.W_fc, self.flat_out) + self.b_fc
        self.probs = self.softmax(self.fc_out)
        return self.probs

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
            print("Loaded trained CNN model weights.")
        except Exception as e:
            print(f"Failed to load CNN model: {e}")
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

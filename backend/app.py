import os
import time
import base64
import hmac
import hashlib
import json
import random
from datetime import datetime
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename

from db import get_connection, init_db
from cnn_model import predict_category

# Initialize Flask app
app = Flask(__name__)
CORS(app) # Enable CORS for all routes

# Config
UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

JWT_SECRET = os.getenv("JWT_SECRET", "supersecretcivicindiajwtkey")

# --- JWT helpers ---
def generate_token(user_id, email, role):
    header = {"alg": "HS256", "typ": "JWT"}
    payload = {
        "user_id": user_id,
        "email": email,
        "role": role,
        "exp": time.time() + 86400 * 7 # 7 days
    }
    
    header_b64 = base64.urlsafe_b64encode(json.dumps(header).encode()).decode().replace("=", "")
    payload_b64 = base64.urlsafe_b64encode(json.dumps(payload).encode()).decode().replace("=", "")
    
    signature = hmac.new(
        JWT_SECRET.encode(),
        f"{header_b64}.{payload_b64}".encode(),
        hashlib.sha256
    ).digest()
    signature_b64 = base64.urlsafe_b64encode(signature).decode().replace("=", "")
    
    return f"{header_b64}.{payload_b64}.{signature_b64}"

def verify_token(token):
    try:
        parts = token.split(".")
        if len(parts) != 3:
            return None
        header_b64, payload_b64, signature_b64 = parts
        
        expected_sig = hmac.new(
            JWT_SECRET.encode(),
            f"{header_b64}.{payload_b64}".encode(),
            hashlib.sha256
        ).digest()
        expected_sig_b64 = base64.urlsafe_b64encode(expected_sig).decode().replace("=", "")
        
        if not hmac.compare_digest(signature_b64.encode(), expected_sig_b64.encode()):
            return None
            
        rem = len(payload_b64) % 4
        if rem > 0:
            payload_b64 += "=" * (4 - rem)
        payload = json.loads(base64.urlsafe_b64decode(payload_b64.encode()).decode())
        
        if payload["exp"] < time.time():
            return None
            
        return payload
    except Exception as e:
        print(f"Token verification failed: {e}")
        return None

def get_auth_user():
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return None
    token = auth_header.split(' ')[1]
    return verify_token(token)

# --- Routes ---

# Server static uploaded files
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# Register Citizen or Admin
@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    full_name = data.get('fullName')
    role = data.get('role', 'citizen') # 'citizen' or 'admin'
    
    if not email or not password or not full_name:
        return jsonify({"error": "Missing email, password, or full name"}), 400
        
    hashed_pwd = generate_password_hash(password)
    
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        
        # Check if user already exists
        cursor.execute("SELECT id FROM users WHERE email = %s", (email,))
        if cursor.fetchone():
            cursor.close()
            conn.close()
            return jsonify({"error": "Email already registered"}), 400
            
        cursor.execute(
            "INSERT INTO users (email, password_hash, full_name, role) VALUES (%s, %s, %s, %s)",
            (email, hashed_pwd, full_name, role)
        )
        user_id = cursor.lastrowid
        conn.commit()
        
        token = generate_token(user_id, email, role)
        
        cursor.close()
        conn.close()
        
        return jsonify({
            "token": token,
            "user": {
                "id": user_id,
                "email": email,
                "fullName": full_name,
                "role": role
            }
        }), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Login Citizen or Admin
@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({"error": "Missing email or password"}), 400
        
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()
        
        if not user or not check_password_hash(user['password_hash'], password):
            cursor.close()
            conn.close()
            return jsonify({"error": "Invalid email or password"}), 401
            
        token = generate_token(user['id'], user['email'], user['role'])
        
        cursor.close()
        conn.close()
        
        return jsonify({
            "token": token,
            "user": {
                "id": user['id'],
                "email": user['email'],
                "fullName": user['full_name'],
                "role": user['role']
            }
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Profile info
@app.route('/api/auth/me', methods=['GET'])
def get_me():
    user_payload = get_auth_user()
    if not user_payload:
        return jsonify({"error": "Unauthorized"}), 401
        
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT id, email, full_name, role FROM users WHERE id = %s", (user_payload['user_id'],))
        user = cursor.fetchone()
        cursor.close()
        conn.close()
        
        if not user:
            return jsonify({"error": "User not found"}), 404
            
        return jsonify({
            "id": user['id'],
            "email": user['email'],
            "fullName": user['full_name'],
            "role": user['role']
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Upload image and predict category using CNN
@app.route('/api/predict', methods=['POST'])
def predict():
    user_payload = get_auth_user()
    if not user_payload:
        return jsonify({"error": "Unauthorized"}), 401
        
    if 'image' not in request.files:
        return jsonify({"error": "No image part in the request"}), 400
        
    file = request.files['image']
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400
        
    if file:
        filename = secure_filename(f"{int(time.time())}_{file.filename}")
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        
        # Run CNN prediction
        predicted_cat, confidence = predict_category(file_path)
        
        # Public URL of the image
        image_url = f"http://localhost:5000/uploads/{filename}"
        
        return jsonify({
            "category": predicted_cat,
            "confidence": confidence,
            "image_url": image_url
        })
        
    return jsonify({"error": "Invalid request"}), 400

# Save complaint
@app.route('/api/complaints', methods=['POST'])
def create_complaint():
    user_payload = get_auth_user()
    if not user_payload:
        return jsonify({"error": "Unauthorized"}), 401
        
    data = request.json
    category = data.get('category')
    severity = data.get('severity', 'medium')
    title = data.get('title')
    description = data.get('description')
    latitude = data.get('latitude')
    longitude = data.get('longitude')
    address = data.get('address')
    city = data.get('city')
    state = data.get('state')
    pincode = data.get('pincode')
    image_url = data.get('image_url')
    ai_predicted_category = data.get('ai_predicted_category')
    ai_confidence = data.get('ai_confidence', 0.0)
    
    if not category or not title or not description:
        return jsonify({"error": "Missing category, title, or description"}), 400
        
    # Generate unique complaint number: CIV-YYYYMMDD-XXXXX
    date_str = datetime.now().strftime("%Y%m%d")
    rand_suffix = str(random.randint(10000, 99999))
    complaint_number = f"CIV-{date_str}-{rand_suffix}"
    
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        
        # Insert complaint, set status to 'Pending'
        cursor.execute("""
            INSERT INTO complaints (
                complaint_number, user_id, category, severity, status, title, description,
                latitude, longitude, address, city, state, pincode, image_url
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            complaint_number, user_payload['user_id'], category, severity, 'Pending', title, description,
            latitude, longitude, address, city, state, pincode, image_url
        ))
        
        # Log AI accuracy if prediction matches or mismatch
        if ai_predicted_category:
            is_correct = (ai_predicted_category == category)
            cursor.execute("""
                INSERT INTO ai_logs (predicted_category, confirmed_category, is_correct, confidence)
                VALUES (%s, %s, %s, %s)
            """, (ai_predicted_category, category, is_correct, ai_confidence))
            
        conn.commit()
        cursor.close()
        conn.close()
        
        return jsonify({
            "message": "Complaint submitted successfully",
            "complaint_number": complaint_number
        }), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Get complaints
@app.route('/api/complaints', methods=['GET'])
def get_complaints():
    user_payload = get_auth_user()
    if not user_payload:
        return jsonify({"error": "Unauthorized"}), 401
        
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        
        if user_payload['role'] == 'admin':
            # Admin sees all complaints
            cursor.execute("SELECT * FROM complaints ORDER BY created_at DESC")
        else:
            # Citizen sees only their own complaints
            cursor.execute("SELECT * FROM complaints WHERE user_id = %s ORDER BY created_at DESC", (user_payload['user_id'],))
            
        complaints = cursor.fetchall()
        cursor.close()
        conn.close()
        
        # Convert date time types to strings
        for c in complaints:
            if c['created_at']:
                c['created_at'] = c['created_at'].isoformat()
            if c['updated_at']:
                c['updated_at'] = c['updated_at'].isoformat()
            if c['resolved_at']:
                c['resolved_at'] = c['resolved_at'].isoformat()
                
        return jsonify(complaints)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Track complaint by complaint_number
@app.route('/api/complaints/<complaint_number>', methods=['GET'])
def get_complaint_by_number(complaint_number):
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM complaints WHERE complaint_number = %s", (complaint_number,))
        complaint = cursor.fetchone()
        cursor.close()
        conn.close()
        
        if not complaint:
            return jsonify({"error": "Complaint not found"}), 404
            
        if complaint['created_at']:
            complaint['created_at'] = complaint['created_at'].isoformat()
        if complaint['updated_at']:
            complaint['updated_at'] = complaint['updated_at'].isoformat()
        if complaint['resolved_at']:
            complaint['resolved_at'] = complaint['resolved_at'].isoformat()
            
        return jsonify(complaint)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Update complaint (Admin only)
@app.route('/api/complaints/<complaint_number>', methods=['PUT'])
def update_complaint(complaint_number):
    user_payload = get_auth_user()
    if not user_payload or user_payload['role'] != 'admin':
        return jsonify({"error": "Unauthorized. Admin privileges required"}), 403
        
    data = request.json
    status = data.get('status')
    assigned_to = data.get('assigned_to')
    remarks = data.get('authority_remarks')
    
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        
        # Verify it exists
        cursor.execute("SELECT status FROM complaints WHERE complaint_number = %s", (complaint_number,))
        complaint = cursor.fetchone()
        if not complaint:
            cursor.close()
            conn.close()
            return jsonify({"error": "Complaint not found"}), 404
            
        # Prepare fields
        updates = []
        params = []
        
        if status:
            updates.append("status = %s")
            params.append(status)
            if status == 'Resolved':
                updates.append("resolved_at = %s")
                params.append(datetime.now())
        if assigned_to is not None:
            updates.append("assigned_to = %s")
            params.append(assigned_to)
        if remarks is not None:
            updates.append("authority_remarks = %s")
            params.append(remarks)
            
        if not updates:
            cursor.close()
            conn.close()
            return jsonify({"message": "No updates provided"})
            
        params.append(complaint_number)
        query = f"UPDATE complaints SET {', '.join(updates)} WHERE complaint_number = %s"
        cursor.execute(query, tuple(params))
        
        conn.commit()
        cursor.close()
        conn.close()
        
        return jsonify({"message": "Complaint updated successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Get Analytics data
@app.route('/api/analytics', methods=['GET'])
def get_analytics():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        
        # 1. Total complaints
        cursor.execute("SELECT COUNT(*) as total FROM complaints")
        total_complaints = cursor.fetchone()['total']
        
        # 2. Resolved vs Pending
        cursor.execute("SELECT status, COUNT(*) as count FROM complaints GROUP BY status")
        status_split = cursor.fetchall()
        
        # 3. Complaints by category
        cursor.execute("SELECT category, COUNT(*) as count FROM complaints GROUP BY category")
        category_split = cursor.fetchall()
        
        # 4. Complaints by area (city)
        cursor.execute("SELECT city, COUNT(*) as count FROM complaints WHERE city IS NOT NULL AND city != '' GROUP BY city")
        area_split = cursor.fetchall()
        
        # 5. AI Prediction Accuracy
        cursor.execute("SELECT COUNT(*) as total_ai FROM ai_logs")
        total_ai = cursor.fetchone()['total_ai']
        
        accuracy = 100.0
        if total_ai > 0:
            cursor.execute("SELECT COUNT(*) as correct_ai FROM ai_logs WHERE is_correct = 1")
            correct_ai = cursor.fetchone()['correct_ai']
            accuracy = (correct_ai / total_ai) * 100.0
            
        # 6. Monthly trend data (last 6 months)
        cursor.execute("""
            SELECT DATE_FORMAT(created_at, '%b %Y') as month, COUNT(*) as count 
            FROM complaints 
            GROUP BY month 
            ORDER BY MIN(created_at) ASC 
            LIMIT 6
        """)
        monthly_trend = cursor.fetchall()
        
        cursor.close()
        conn.close()
        
        return jsonify({
            "total_complaints": total_complaints,
            "status_split": status_split,
            "category_split": category_split,
            "area_split": area_split,
            "ai_accuracy": round(accuracy, 2),
            "monthly_trend": monthly_trend
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Initialize DB
    try:
        init_db()
    except Exception as e:
        print(f"Error initializing DB on server start: {e}")
        
    app.run(host='0.0.0.0', port=5000, debug=True)

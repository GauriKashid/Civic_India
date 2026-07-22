import os
import mysql.connector
from mysql.connector import Error
from dotenv import load_dotenv
from werkzeug.security import generate_password_hash

# Load environment variables
load_dotenv()

DB_HOST = os.getenv("DB_HOST", "localhost")
DB_USER = os.getenv("DB_USER", "root")
DB_PASSWORD = os.getenv("DB_PASSWORD", "")
DB_PORT = os.getenv("DB_PORT", "3306")
DB_NAME = os.getenv("DB_NAME", "civicindia")

def get_connection(include_db=True):
    """Establishes connection to MySQL database."""
    try:
        connection = mysql.connector.connect(
            host=DB_HOST,
            user=DB_USER,
            password=DB_PASSWORD,
            port=int(DB_PORT),
            database=DB_NAME if include_db else None
        )
        return connection
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        raise e

def init_db():
    """Initializes the database and tables if they do not exist."""
    try:
        # Step 1: Connect to server without database to create it
        conn = mysql.connector.connect(
            host=DB_HOST,
            user=DB_USER,
            password=DB_PASSWORD,
            port=int(DB_PORT)
        )
        cursor = conn.cursor()
        cursor.execute(f"CREATE DATABASE IF NOT EXISTS {DB_NAME}")
        conn.close()

        # Step 2: Connect to created database and create tables
        conn = get_connection(include_db=True)
        cursor = conn.cursor()

        # Create Users table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                full_name VARCHAR(255) NOT NULL,
                role ENUM('citizen', 'admin') NOT NULL DEFAULT 'citizen',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        # Create Complaints table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS complaints (
                id INT AUTO_INCREMENT PRIMARY KEY,
                complaint_number VARCHAR(50) UNIQUE NOT NULL,
                user_id INT,
                category VARCHAR(50) NOT NULL,
                severity VARCHAR(50) NOT NULL DEFAULT 'medium',
                status VARCHAR(50) NOT NULL DEFAULT 'Pending',
                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                latitude DOUBLE,
                longitude DOUBLE,
                address TEXT,
                city VARCHAR(100),
                state VARCHAR(100),
                pincode VARCHAR(20),
                image_url VARCHAR(512),
                assigned_to VARCHAR(255) DEFAULT NULL,
                authority_remarks TEXT DEFAULT NULL,
                resolved_at TIMESTAMP NULL DEFAULT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
            )
        """)

        # Create AI Logs table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS ai_logs (
                id INT AUTO_INCREMENT PRIMARY KEY,
                predicted_category VARCHAR(50) NOT NULL,
                confirmed_category VARCHAR(50) NOT NULL,
                is_correct BOOLEAN NOT NULL,
                confidence FLOAT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        # Seed default Admin account if it does not exist
        cursor.execute("SELECT id FROM users WHERE email = %s", ("admin@civicindia.gov.in",))
        admin_exists = cursor.fetchone()
        if not admin_exists:
            hashed_pwd = generate_password_hash("admin123")
            cursor.execute(
                "INSERT INTO users (email, password_hash, full_name, role) VALUES (%s, %s, %s, %s)",
                ("admin@civicindia.gov.in", hashed_pwd, "Municipal Admin", "admin")
            )
            print("Seeded default admin account (admin@civicindia.gov.in / admin123)")

        conn.commit()
        cursor.close()
        conn.close()
        print("Database initialized successfully!")
    except Error as e:
        print(f"Error during database initialization: {e}")
        raise e

if __name__ == "__main__":
    init_db()

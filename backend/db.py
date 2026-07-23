import os
import sqlite3
from dotenv import load_dotenv
from werkzeug.security import generate_password_hash

# Load environment variables
load_dotenv()

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'civicindia.db')

def get_connection(include_db=True):
    """Establishes connection to SQLite database."""
    try:
        connection = sqlite3.connect(DB_PATH)
        connection.row_factory = sqlite3.Row  # Access columns by name
        connection.execute("PRAGMA foreign_keys = ON")  # Enable foreign keys
        return connection
    except Exception as e:
        print(f"Error connecting to SQLite: {e}")
        raise e

def init_db():
    """Initializes the SQLite database and tables if they do not exist."""
    try:
        conn = get_connection()
        cursor = conn.cursor()

        # Create Users table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                full_name TEXT NOT NULL,
                role TEXT NOT NULL DEFAULT 'citizen',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        # Create Complaints table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS complaints (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                complaint_number TEXT UNIQUE NOT NULL,
                user_id INTEGER,
                category TEXT NOT NULL,
                severity TEXT NOT NULL DEFAULT 'medium',
                status TEXT NOT NULL DEFAULT 'Pending',
                title TEXT NOT NULL,
                description TEXT NOT NULL,
                latitude REAL,
                longitude REAL,
                address TEXT,
                city TEXT,
                state TEXT,
                pincode TEXT,
                image_url TEXT,
                assigned_to TEXT DEFAULT NULL,
                authority_remarks TEXT DEFAULT NULL,
                resolved_at TIMESTAMP NULL DEFAULT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
            )
        """)

        # Create AI Logs table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS ai_logs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                predicted_category TEXT NOT NULL,
                confirmed_category TEXT NOT NULL,
                is_correct BOOLEAN NOT NULL,
                confidence REAL NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        # Seed default Admin account if it does not exist
        cursor.execute("SELECT id FROM users WHERE email = ?", ("admin@civicindia.gov.in",))
        admin_exists = cursor.fetchone()
        if not admin_exists:
            hashed_pwd = generate_password_hash("admin123")
            cursor.execute(
                "INSERT INTO users (email, password_hash, full_name, role) VALUES (?, ?, ?, ?)",
                ("admin@civicindia.gov.in", hashed_pwd, "Municipal Admin", "admin")
            )
            print("Seeded default admin account (admin@civicindia.gov.in / admin123)")

        conn.commit()
        cursor.close()
        conn.close()
        print("SQLite Database initialized successfully!")
    except Exception as e:
        print(f"Error during database initialization: {e}")
        raise e

if __name__ == "__main__":
    init_db()

import os
import sqlite3
from dotenv import load_dotenv
from werkzeug.security import generate_password_hash

# Load environment variables
load_dotenv()

DB_TYPE = os.getenv("DB_TYPE", "").lower()  # "mysql" or "sqlite"
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_USER = os.getenv("DB_USER", "root")
DB_PASSWORD = os.getenv("DB_PASSWORD", "")
DB_PORT = os.getenv("DB_PORT", "3306")
DB_NAME = os.getenv("DB_NAME", "civicindia")
DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'civicindia.db')

# Try importing mysql.connector
try:
    import mysql.connector
    from mysql.connector import Error as MySQLError
    MYSQL_AVAILABLE = True
except ImportError:
    MYSQL_AVAILABLE = False
    MySQLError = Exception

class MySQLCursorWrapper:
    def __init__(self, cursor):
        self.cursor = cursor

    def execute(self, query, params=None):
        # Convert ? placeholders to %s for MySQL compatibility
        translated_query = query.replace('?', '%s')
        if params is not None:
            self.cursor.execute(translated_query, params)
        else:
            self.cursor.execute(translated_query)

    def fetchone(self):
        row = self.cursor.fetchone()
        return row

    def fetchall(self):
        rows = self.cursor.fetchall()
        return rows

    @property
    def lastrowid(self):
        return self.cursor.lastrowid

    def close(self):
        self.cursor.close()

class MySQLConnectionWrapper:
    def __init__(self, conn):
        self.conn = conn

    def cursor(self, *args, **kwargs):
        # Always use dictionary=True for compatibility with sqlite3.Row dict conversions
        mysql_cursor = self.conn.cursor(dictionary=True, buffered=True)
        return MySQLCursorWrapper(mysql_cursor)

    def commit(self):
        self.conn.commit()

    def rollback(self):
        self.conn.rollback()

    def close(self):
        self.conn.close()

def is_mysql_configured():
    # If explicitly set to mysql
    if DB_TYPE == "mysql":
        return True
    # If explicitly set to sqlite
    if DB_TYPE == "sqlite":
        return False
    # If DB_HOST is defined, check if MySQL is available
    if MYSQL_AVAILABLE and (DB_HOST or DB_USER):
        return True
    return False

def get_connection(include_db=True):
    """Establishes connection to MySQL database or falls back to SQLite."""
    if is_mysql_configured() and MYSQL_AVAILABLE:
        try:
            conn = mysql.connector.connect(
                host=DB_HOST,
                user=DB_USER,
                password=DB_PASSWORD,
                port=int(DB_PORT),
                database=DB_NAME if include_db else None
            )
            return MySQLConnectionWrapper(conn)
        except MySQLError as e:
            print(f"Error connecting to MySQL: {e}. Falling back to SQLite.")
            # Fall through to SQLite fallback

    # SQLite fallback
    try:
        connection = sqlite3.connect(DB_PATH)
        connection.row_factory = sqlite3.Row  # Access columns by name
        connection.execute("PRAGMA foreign_keys = ON")  # Enable foreign keys
        return connection
    except Exception as e:
        print(f"Error connecting to SQLite: {e}")
        raise e

def init_db():
    """Initializes the database and tables if they do not exist."""
    use_mysql = is_mysql_configured() and MYSQL_AVAILABLE
    
    if use_mysql:
        # Step 1: Connect to server without database to create it
        try:
            conn = mysql.connector.connect(
                host=DB_HOST,
                user=DB_USER,
                password=DB_PASSWORD,
                port=int(DB_PORT)
            )
            cursor = conn.cursor()
            cursor.execute(f"CREATE DATABASE IF NOT EXISTS {DB_NAME}")
            conn.close()
        except MySQLError as e:
            print(f"Failed to create MySQL database: {e}. Falling back to SQLite initialization.")
            use_mysql = False

    try:
        conn = get_connection(include_db=use_mysql)
        cursor = conn.cursor()

        if use_mysql:
            # MySQL Initialization
            print("Initializing MySQL Database...")
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    email VARCHAR(255) UNIQUE NOT NULL,
                    password_hash VARCHAR(255) NOT NULL,
                    full_name VARCHAR(255) NOT NULL,
                    role VARCHAR(50) NOT NULL DEFAULT 'citizen',
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)

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
        else:
            # SQLite Initialization
            print("Initializing SQLite Database...")
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
        print("Database initialized successfully!")
    except Exception as e:
        print(f"Error during database initialization: {e}")
        raise e

if __name__ == "__main__":
    init_db()

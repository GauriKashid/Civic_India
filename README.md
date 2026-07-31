# CivicIndia 🇮🇳

CivicIndia is a modern, AI-powered civic engagement platform designed for Indian local communities. The application allows citizens to report local civic issues (such as garbage accumulation, potholes, broken streetlights, water supply failure, etc.), track resolving progress in real-time, avoid duplicate submissions, learn about their civic responsibilities via quizzes, and compete on a public leaderboard. 

It features an **AI-based Image Classifier** that automatically detects the category of a civic issue from an uploaded photo to speed up reporting.

---

## 🚀 Key Features

* **Smart Issue Reporting & CivicAI**: Pinpoint issue locations, describe the problem, and upload a photo. The built-in AI model automatically predicts the category (e.g., *pothole*, *garbage*, *streetlight*) and helps tag the report.
* **Duplicate Detection**: Instantly checks if an issue of the same category has already been reported in your city to prevent redundant reports and save administrative time.
* **Real-Time Resolution Tracking**: Citizens can monitor their submitted reports as they transition through *Pending*, *In Progress*, and *Resolved* or *Rejected* states.
* **Education Hub (Quizzes)**: Test and improve knowledge of Indian traffic laws, environmental conservation, public safety, and civic duties.
* **Gamified Leaderboard & Badges**: Earn contribution points for reporting issues and completing educational modules. Collect badges like *First Report*, *Active Citizen*, or *Quiz Master*.
* **Multilingual Support**: Switch seamlessly between 8 major Indian languages (English, Hindi, Bengali, Marathi, Telugu, Tamil, Gujarati, and Kannada).
* **Municipal Admin Dashboard**: A central interface for authorities to view all complaints, assign them to departments, write remarks, and update their resolution status.

---

## 🛠️ Technology Stack

CivicIndia is structured as a decoupled full-stack application:

### Frontend
* **Core Framework**: React (Vite)
* **Language**: JavaScript (JSX)
* **Styling**: Tailwind CSS & shadcn-ui (Radix UI primitives)
* **Routing & State**: React Router DOM, TanStack React Query
* **Icons & Visualization**: Lucide React, Recharts (for analytical graphs)

### Backend
* **Web Framework**: Python (Flask)
* **Database**: SQLite (local server database, managed with standard SQL queries)
* **Authentication**: JWT-based session security (using `itsdangerous` token signing)
* **API Integration**: RESTful API endpoints for authentication, reports, duplicate check, and predictions

### Artificial Intelligence & Machine Learning
* **Image Processing**: Pillow (PIL) & NumPy for image resizing and normalization
* **Classifier Model**: Scikit-learn (`MLPClassifier` neural network model) trained to identify 8 categories of civic issues

---

## ⚙️ Installation & Setup

Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) and [Python 3.8+](https://www.python.org/) installed.

### 1. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a Python virtual environment:
   ```bash
   # On Windows:
   python -m venv venv
   .\venv\Scripts\activate

   # On macOS/Linux:
   python3 -m venv venv
   source venv/bin/activate
   ```
3. Install required packages:
   ```bash
   pip install flask flask-cors itsdangerous scikit-learn pillow numpy python-dotenv
   ```
4. Initialize the SQLite database and seed the default admin account:
   ```bash
   python db.py
   ```
5. Create a `.env` file inside the `backend` folder based on `.env.example`:
   ```env
   PORT=5000
   JWT_SECRET=supersecretcivicindiajwtkey
   ```
6. Start the Flask server:
   ```bash
   python app.py
   ```
   *The backend will run on `http://localhost:5000`.*

---

### 2. Frontend Setup
1. Return to the root directory:
   ```bash
   cd ..
   ```
2. Install the frontend dependencies:
   ```bash
   npm install
   ```
3. Run the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend will run on `http://localhost:5173` (or the port specified in terminal).*

---

## 🔐 Default Credentials for Testing

To check out the different workflows without registering new accounts, use these pre-seeded users:

### Municipal Admin Account
* **Email**: `admin@civicindia.gov.in`
* **Password**: `admin123`

### Citizen Account
You can register a new account on the auth page or log in with any new signup credentials.

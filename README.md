# CivicIndia

CivicIndia is a modern, multilingual platform designed to empower local communities. Citizens can report local issues (such as potholes, streetlight failure, and garbage accumulation), track resolutions in real-time, compete on the contribution leaderboard, and learn about civic responsibilities through educational quizzes.

## Features

- **Civic Issue Reporting**: Easily pinpoint issue locations, add descriptions, and upload photographs.
- **Real-Time Tracking**: Get live status updates as authorities review and resolve issues.
- **Education Hub**: Learn about Indian traffic regulations, environmental awareness, and civic duties through interactive quizzes.
- **Citizen Leaderboard**: Compete with fellow citizens, earn points, and collect contribution badges.
- **Multilingual Support**: Supports 8 Indian languages (English, Hindi, Bengali, Marathi, Telugu, Tamil, Gujarati, and Kannada) seamlessly.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/GauriKashid/Civic_India.git
   cd Civic_India
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and configure your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
   ```

4. Run the development server locally:
   ```sh
   npm run dev
   ```

## Tech Stack

- **Framework**: React (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, shadcn-ui
- **Database / Auth**: Supabase
- **Icons**: Lucide React

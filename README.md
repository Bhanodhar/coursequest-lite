🎓 CourseQuest Lite

A full-stack web app to search, filter, and compare university courses with an AI-powered natural language search.

🚀 Features

🔍 Course Search & Filtering – Filter by department, level, delivery mode, rating, and fee

📊 Course Comparison – Compare up to 4 courses side-by-side

🤖 Ask AI – Query in plain English like "Show me online CS courses under 50000 INR"

📱 Responsive Design – Works smoothly on desktop, tablet, and mobile

🎨 Modern UI – Gradients, animations, and professional styling

🛠️ Tech Stack

Frontend: React, Axios
Backend: Node.js, Express.js, PostgreSQL, csv-parser
Development Tools: Nodemon, dotenv

🖼️ Screenshots
Search & Filter, Course Comparison, Ask AI
https://github.com/Bhanodhar/coursequest-lite/blob/2d74cc5a5f2424a531b353d9cea83ae7e294aed3/Screenshot%202025-09-19%20143727.png
	
⚡ Setup
1. Clone & Install
git clone <repo-url>
cd coursequest-lite
npm install (required packages in node-modules)

2. Configure .env
DATABASE_URL=postgresql://username:password@localhost:5432/coursequest
INGEST_TOKEN=your_secret_token
PORT=5000

3. Database Setup
CREATE DATABASE coursequest;


4. Frontend Setup
cd coursequest-lite-frontend
npm install (required packages in node-modules)

▶️ Running the App
Start Backend
npm run dev

Start Frontend (by opening another terminal)
cd coursequest-lite-frontend
npm run dev (as per scripts)

📡 API Endpoints
Get Courses
GET /api/courses


Query params: department, level, delivery_mode, min_rating, max_fee, page, limit

Compare Courses
GET /api/compare?ids=1,3,5

Ask AI
POST /api/ask


Body:

{ "question": "Show me online computer science courses under 50000 INR" }

Ingest Data (Protected)
POST /api/ingest


Header:

x-ingest-token: your_secret_token

🎯 How to Use

Search and filter courses

Add courses to Compare

Use Ask AI for natural language queries

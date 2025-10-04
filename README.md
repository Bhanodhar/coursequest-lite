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
Search & Filter
<img width="1830" height="869" alt="Image" src="https://github.com/user-attachments/assets/3715005b-7d40-41fc-81be-05db6c505fa8" />
	
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
-- Connect to PostgreSQL and create database
CREATE DATABASE coursequest;

-- Connect to the database and create table
\c coursequest;

CREATE TABLE courses (
  course_id SERIAL PRIMARY KEY,
  course_name VARCHAR(255) NOT NULL,
  department VARCHAR(100),
  level VARCHAR(2) CHECK (level IN ('UG', 'PG')),
  delivery_mode VARCHAR(10) CHECK (delivery_mode IN ('online', 'offline', 'hybrid')),
  credits INT,
  duration_weeks INT,
  rating NUMERIC(3, 2),
  tuition_fee_inr INT,
  year_offered INT
);

-- Create indexes for better performance
CREATE INDEX idx_courses_department ON courses(department);
CREATE INDEX idx_courses_level ON courses(level);
CREATE INDEX idx_courses_delivery ON courses(delivery_mode);
CREATE INDEX idx_courses_rating ON courses(rating);
CREATE INDEX idx_courses_fee ON courses(tuition_fee_inr);


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

Course Comparison Screensshot
<img width="1786" height="852" alt="Image" src="https://github.com/user-attachments/assets/53246b1d-1866-4578-90cc-d04f8f5389a2" />

ASK AI Page
<img width="1787" height="817" alt="Image" src="https://github.com/user-attachments/assets/72c77ddd-8aa0-4a6b-96da-d9ab0485d3fd" />

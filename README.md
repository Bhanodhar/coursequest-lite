
# 🎓 CourseQuest Lite

A full-stack web app to search, filter, and compare university courses with an AI-powered natural language search.


## 🌐 Live Demo

Frontend (Vercel): https://coursequest-lite-rust.vercel.app

Backend (Render): https://coursequest-lite-ahgc.onrender.com
## Tech Stack

***Frontend:*** 
React.js, Vite, CSS, Axios

***Backend:***
Node.js, Express.js, PostgreSQL

***Dev Tools:***
VS Code, Thunder Client, Git/GitHub

## Installation
### For Backend
Install my-project with npm

```bash
git clone <repo-url>
npm install 
npm run dev
```
- with **npm install** (required packages will be installed used in this project)    


### For Frontend

```bash
cd coursequest-lite-frontend
npm install
npm run dev
```

Visit {http://localhost: $port_no} 
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

- Create a .env file:

`DATABASE_URL` : your_postegreSQldb_url

`INGEST_TOKEN` : your_secret_key

`PORT` : your_port_no


## Start server:

Run the following command

```bash
  npm run dev
```
- As per in the scripts
## 🚀 Features


* 🔍 Course Search & Filtering – Filter by department, level, delivery mode, rating, and fee

* 📊 Course Comparison – Compare up to 4 courses side-by-side

* 🤖 Ask AI – Query in plain English like "Show me online CS courses under 50000 INR"

* 📱 Responsive Design – Works smoothly on desktop, tablet, and mobile

* 🎨 Modern UI – Gradients, animations, and professional styling

## 🎯 How to Use

* Search and filter courses

* Add courses to Compare

* Use Ask AI for natural language queries
## API Endpoints :

### GET Courses

| Method | Endpoint         | Description        |
| ------ | ---------------- | ------------------ |
| GET    | /api/courses     | Get all Courses    |

### Query params: department, level, delivery_mode, min_rating, max_fee, page, limit

### Compare Courses

| Method | Endpoint             | Description               |
| ------ | -------------------- | ------------------------- |
| GET   | /api/compare?ids=1,3,5| Compare Selected Courses  |


### Ask AI

| Method | Endpoint | Description  |
| ------ | ---------------------------------- | -------------------------- |
| POST   | /api/ask      | Ask AI for Suggestions (which is best course)      |

### Body:

{ "question": "Show me online computer science courses under 50000 INR" }


## Ingest Data (Protected)
| Method | Endpoint             | Description               |
| ------ | -------------------- | ------------------------- |
| POST   | /api/ingest          | Endpoint to ingest Courses by only ADMIN  |
 
### Header:

x-ingest-token: your_secret_token

---




## Screenshots

### Show Courses
![Image Alt](https://github.com/Bhanodhar/coursequest-lite/blob/main/coursequest-lite-frontend/public/UI_IMAGES/show%20courses.png?raw=true)

### Compare Courses
![Image Alt](https://github.com/Bhanodhar/coursequest-lite/blob/main/coursequest-lite-frontend/public/UI_IMAGES/compare%20%20page.png?raw=true)

### ASK AI 
![Image Alt](https://github.com/Bhanodhar/coursequest-lite/blob/main/coursequest-lite-frontend/public/UI_IMAGES/ask%20ai.png?raw=true)


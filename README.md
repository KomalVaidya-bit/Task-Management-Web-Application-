**Task Management Web Application**

A simple Full Stack Task Management Web Application built as part of a Full Stack Development Internship Skill Assessment.
Users can create, view, update, filter, and delete tasks with persistent storage using MongoDB.


**Features**

Create new tasks
View all tasks
Update / Edit existing tasks
Delete tasks

Filter tasks by status:

-Pending
-In Progress

Completed

Persistent data storage using MongoDB

Responsive and clean UI

REST API based backend


**Tech Stack**
-Frontend
HTML
CSS
JavaScript (Vanilla JS)

-Backend
Node.js
Express.js

-Database
MongoDB

Project Structure
task-manager/
│
├── backend/
│   ├── models/
│   │   └── Task.js
│   ├── routes/
│   │   └── taskRoutes.js
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── index.html
    ├── style.css
    └── script.js





Setup Instructions
 1. Clone the repository
```bash

git clone https://github.com/KomalVaidya-bit/Task-Management-Web-Application-.git

2. Go to backend folder 
cd backend

3. Start backend server
node server.js     server will run  http://localhost:5000

4. Open frontend
Open frontend/index.html using Live Server or directly in browser.

Fullstack Project

This is a Full Stack Web Application name (CloudNova) built using React (Frontend), Node.js + Express (Backend), and MySQL (Database).
It allows users to Sign Up, Log In, Upload, View, play and Delete, files securely.

🚀 Features

1. User Signup and Login (Authentication)
2. File Upload with Validation (No Duplicate Files Allowed)
3. View and Delete Uploaded Files
4. JWT-based Secure Routes
5. MySQL Database Integration

Responsive Frontend using React and Bulma CSS

🗂️ Project Structure
fullstack_project/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── README.md

⚙️ Installation
1️⃣ Clone the Repository
git clone https://github.com/MohdFazalKoder/fullstack_project.git
cd fullstack_project

2️⃣ Setup Backend
cd backend
npm install


Create a .env file inside backend/ folder:

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root@1234
DB_NAME=media_app
JWT_SECRET=mysecretkey


Start the backend server:

npm start

3️⃣ Setup Frontend
cd ../frontend
npm install
npm start


Frontend runs on: http://localhost:3000

Backend runs on: http://localhost:5000

🛠️ Database Setup (MySQL)

Open MySQL and run:

CREATE DATABASE media_app;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255)
);

CREATE TABLE files (
  id INT AUTO_INCREMENT PRIMARY KEY,
  file_name VARCHAR(255) UNIQUE,
  file_path VARCHAR(255),
  file_type VARCHAR(100),
  file_size INT,
  upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); project name is CloudNova

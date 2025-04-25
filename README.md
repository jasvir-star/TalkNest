# 🗨️ TalkNest

TalkNest app is made using modern technologies where the user can register, log in, and send/receive messages — everything is secure and runs in a containerized system.

---

## 🧱 Project Structure


TalkNest/
├── Backend/          # Node.js + Express backendAPI + sql + package.json + server.js
├── Frontend/         # Static HTML/CSS/JS frontend served by Nginx
├── Database/         # SQL files for initial database schema and content
├── .env              # Environment variables for PostgreSQL and pgAdmin
└── docker-compose.yml


---

## 🚀 How to Run It

> Make sure that Docker Desktop is running.

1. Open a terminal in the TalkNest/ folder.
2. Run:

bash
docker-compose up --build


To reset the database and re-run init.sql and content.sql, run:

bash
docker-compose down --volumes
docker-compose build --no-cache
docker-compose up


---

## 🌐 Access the App

| Component | URL                       |
|----------|----------------------------|
| Frontend | http://localhost:8080      |
| Backend  | http://localhost:3000/chat |
| pgAdmin  | http://localhost:5050      |

*pgAdmin Login:*

- Email: joalampela@gmail.com
- Password: password123

Once logged in, add a new server:
- Hostname: db
- Username: joal
- Password: password123

---

## 🛠️ Technologies Used 

- Frontend: HTML, CSS, JS  
- Backend: Node.js, Express  
- Database: PostgreSQL  
- Others: Docker, Docker Compose, pgAdmin, bcrypt, jsonwebtoken (JWT)

---

## 🌐 App Features

1. The database has two tables called users and messages.
2. Nginx handles all the traffic and connects all parts of the app.
3. The app keeps the user logged in using JWT tokens.
4. Users can send messages and also check old messages with date and time.
5. The whole app runs in Docker containers using Docker Compose.
6. Users can sign up and log in, and their passwords are saved safely using bcrypt.
7. .env file is used to store database info and pgAdmin login details safely.

---

## 📬 API Endpoints

- POST /api/register – Register a user
- POST /api/login – Login and get JWT token
- POST /api/messages – Post a chat message (auth required)
- GET  /api/messages – Get all chat messages

---


## 🧪 Sample Data

Loaded via Database/001_content.sql:
- 1 user account
- 3 sample messages

---

## 👾 Difficulties

I faced a lot of problems while completing this assignment from the beginning to the end. Like at first, when I modified the files, after that the containers were not running. So, I took help from ChatGPT to find the errors, and after step 2, it took 2 hours but it got solved. Then I faced issues with the backend and frontend. Whenever I was opening them in the browser, an error was showing saying "cannot get/". I solved that too with the help of ChatGPT, and finally, my app started running successfully. But in the last step, when I was uploading my assignment to GitHub, I again faced many difficulties. But with the help of ChatGPT, I was successful to complete this assignment.

---

*THANKS*


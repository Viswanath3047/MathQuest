# 🎮 MathQuest – Mathematical Puzzle Game

MathQuest is an interactive mathematical puzzle game developed as a web application. The project is designed to make mathematical practice more engaging through different puzzle categories, difficulty levels, timed questions, scoring, and result tracking.

## 📌 Project Overview

MathQuest provides a simple game-based learning environment where users can:

- Register and log in
- Select a puzzle category
- Choose a difficulty level
- Solve timed mathematical puzzles
- Receive immediate feedback
- Track their score and performance
- View game results
- Manage application settings

The project follows a **MEAN Stack** architecture:

- **M** – MongoDB
- **E** – Express.js
- **A** – Angular
- **N** – Node.js

---

## ✨ Features

### 🔐 User Authentication
- User registration
- User login
- Basic account validation
- User session handling

### 🧩 Puzzle Categories
MathQuest can support multiple puzzle categories, including:

- Mathematics
- Formula
- Location
- Image Puzzle

### 🎯 Difficulty Levels

| Level | Questions | Time | Points |
|---|---:|---:|---:|
| Easy | 10 | 60 seconds | 10 points |
| Medium | 15 | 60 seconds | 15 points |
| Hard | 20 | 45 seconds | 20 points |

### 🎮 Game System
- Multiple-choice questions
- Question progress tracking
- Countdown timer
- Correct/wrong answer feedback
- Automatic game completion
- Score calculation

### 📊 Result System
After completing a game, the application can display:

- Total score
- Correct answers
- Wrong answers
- Accuracy
- Category
- Difficulty
- Time taken

### ⚙️ Settings
A settings section is included for application/user preferences.

---

## 🖥️ Application Flow

```text
Register / Login
       ↓
     Home
       ↓
 Select Category
       ↓
 Select Difficulty
       ↓
      Game
       ↓
     Result
       ↓
 Play Again / Home
```

---

## 🏗️ Project Structure

```text
MathQuest/
│
├── frontend/                 # Angular frontend application
│   ├── src/
│   │   ├── app/
│   │   │   ├── pages/
│   │   │   │   ├── login/
│   │   │   │   ├── register/
│   │   │   │   ├── home/
│   │   │   │   ├── difficulty/
│   │   │   │   ├── game/
│   │   │   │   ├── result/
│   │   │   │   └── setting/
│   │   │   ├── app.ts
│   │   │   ├── app.html
│   │   │   ├── app.css
│   │   │   ├── app.routes.ts
│   │   │   └── app.config.ts
│   │   └── ...
│   ├── package.json
│   └── angular.json
│
├── backend/                 # Node.js + Express backend
│   ├── ...
│   └── package.json
│
├── db/                      # Database-related files/configuration
│   └── ...
│
└── README.md
```

> The exact contents of the `backend` and `db` folders may vary depending on the current implementation.

---

## 🛠️ Technologies Used

### Frontend
- Angular
- TypeScript
- HTML5
- CSS3
- Angular Router
- Angular Forms

### Backend
- Node.js
- Express.js
- REST API

### Database
- MongoDB
- Mongoose

### Development Tools
- Visual Studio Code
- Git
- GitHub
- MongoDB / MongoDB Atlas
- PowerShell

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/MathQuest.git
```

Move into the project:

```bash
cd MathQuest
```

---

## 🎨 Run the Frontend

Open a terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start Angular:

```bash
ng serve
```

Open:

```text
http://localhost:4200/
```

---

## ⚙️ Run the Backend

Open another terminal:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start the backend using the command configured in your backend project, for example:

```bash
npm start
```

or:

```bash
node server.js
```

The backend will normally run on a local port such as:

```text
http://localhost:5000
```

> Use the actual port and start command defined in your `backend` project.

---

## 🗄️ Database Setup

For local MongoDB, make sure MongoDB is installed and running.

Example connection:

```text
mongodb://127.0.0.1:27017/mathquest
```

For online deployment, MongoDB Atlas can be used instead of a local MongoDB server.

---

## 🔑 Environment Variables

Do not upload passwords, API keys, database credentials, JWT secrets, or other private information to GitHub.

Create a `.env` file in the backend if required:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Add `.env` to `.gitignore`:

```gitignore
.env
node_modules/
dist/
.angular/
```

---

## 🔌 API Structure

The backend can expose REST API endpoints such as:

```text
POST   /api/auth/register
POST   /api/auth/login

GET    /api/questions
GET    /api/questions/:category/:difficulty

POST   /api/results
GET    /api/results/:userId
```

The exact endpoints depend on the current backend implementation.

---

## 📈 Game Data

A game result can contain information such as:

```json
{
  "category": "Mathematics",
  "difficulty": "Easy",
  "score": 80,
  "correctAnswers": 8,
  "wrongAnswers": 2,
  "accuracy": 80,
  "timeTaken": 52
}
```

---

## 🔒 Security Notes

For development, the application may use browser storage for basic prototype functionality.

For a production deployment:

- Passwords should be hashed using a secure password-hashing library.
- Authentication should use secure sessions or JWT.
- Database credentials should be stored in environment variables.
- Sensitive information should never be committed to GitHub.
- CORS should be configured for the deployed frontend domain.
- Input validation should be implemented on the backend.

---

## 🌐 Deployment

The application can be deployed using separate services:

```text
Angular Frontend → Vercel
Node/Express API → Render
MongoDB → MongoDB Atlas
```

Example architecture:

```text
                 ┌──────────────────┐
                 │      Users       │
                 └────────┬─────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │ Angular Frontend │
                 │     Vercel       │
                 └────────┬─────────┘
                          │
                       HTTP/API
                          │
                          ▼
                 ┌──────────────────┐
                 │ Node + Express   │
                 │     Render       │
                 └────────┬─────────┘
                          │
                       Mongoose
                          │
                          ▼
                 ┌──────────────────┐
                 │     MongoDB      │
                 │      Atlas       │
                 └──────────────────┘
```

---

## 🎓 Project Purpose

MathQuest is suitable as an academic/project application for demonstrating:

- Full-stack web development
- Angular frontend development
- REST API development
- Node.js and Express.js
- MongoDB database integration
- User authentication
- Game logic
- Data management
- Responsive web design

---

## 🔮 Future Enhancements

Possible future improvements include:

- User profile management
- Leaderboard
- Daily challenges
- Question randomization
- More puzzle categories
- Question difficulty adaptation
- Achievement/badge system
- Detailed performance analytics
- Admin dashboard
- Question management system
- Online multiplayer mode
- Progressive Web App support
- Improved authentication and security

---

## 👨‍💻 Developer

**MathQuest – Mathematical Puzzle Game**

Developed as a full-stack web application using the MEAN Stack.

---

## 📄 License

This project is intended for educational and academic purposes.

You can add a specific open-source license such as MIT License if you decide to distribute the project under that license.

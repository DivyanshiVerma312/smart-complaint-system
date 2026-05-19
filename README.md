# 🛡️ AI-Based Smart Complaint Management System

> **AI-Driven Full Stack Development (AI308B) — ESE Examination Project**  
> MERN Stack + AI-Powered Complaint Analysis

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

---

## 📋 Project Overview

A full-stack web application that enables users to **register complaints online** with AI-powered analysis. The system uses AI APIs to:

- 🎯 **Detect complaint urgency** (High / Medium / Low priority)
- 🏢 **Recommend responsible department** based on category
- 📝 **Generate complaint summary** automatically
- 💬 **Create automated response messages** for citizens

## 🚀 Features

| Feature | Description |
|---------|------------|
| **Complaint Registration** | Submit complaints with name, email, title, description, category, location |
| **Complaint Tracking** | View all complaints, filter by category, search by location |
| **Status Management** | Update complaint status (Pending → In Progress → Resolved / Rejected) |
| **AI Analysis** | AI-powered priority detection, department routing, summarization |
| **Authentication** | JWT-based auth with bcrypt password hashing |
| **Dark/Light Mode** | Seamless theme switching with CSS variables |
| **Responsive Design** | Mobile-first design that works on all screen sizes |

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite, React Router DOM, Tailwind CSS v4, Framer Motion |
| **Backend** | Node.js, Express.js, Mongoose ODM |
| **Database** | MongoDB Atlas |
| **AI** | OpenRouter API (GPT-4o-mini) + Local Deterministic Fallback |
| **Auth** | JWT + bcrypt |

## 📁 Project Structure

```
├── backend/
│   ├── config/db.js          # MongoDB connection
│   ├── controllers/          # Auth, Complaint, AI controllers
│   ├── middleware/            # JWT auth, Error handler
│   ├── models/               # User, Complaint schemas
│   ├── routes/               # API route definitions
│   ├── utils/aiFallback.js   # Local AI fallback algorithm
│   ├── seed.js               # Demo data seeder
│   └── server.js             # Express server entry
│
├── frontend/
│   ├── src/
│   │   ├── api/axios.js      # Axios instance
│   │   ├── components/       # Reusable UI components
│   │   ├── context/          # Auth & Theme providers
│   │   └── pages/            # Route pages
│   └── index.html
│
└── README.md
```

## 🔧 Local Setup

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free tier)

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd ESE_FINAL

# Backend
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Frontend
cd ../frontend
npm install
```

### 2. Configure Environment Variables

Create `backend/.env`:
```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/complaint-system
JWT_SECRET=your_secret_key_here
OPENROUTER_API_KEY=your_key_here  # Optional - fallback works without it
```

### 3. Seed Demo Data

```bash
cd backend
npm run seed
```

This creates:
- 👤 **Demo User 1**: rahul@gmail.com / password123
- 👤 **Demo User 2**: priya@gmail.com / password123
- 📋 **8 sample complaints** across all categories

### 4. Run Development Servers

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 📡 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | ❌ | Register new user |
| POST | `/api/auth/login` | ❌ | Login (returns JWT) |
| GET | `/api/auth/me` | ✅ | Get current user |
| POST | `/api/complaints` | ✅ | Add complaint |
| GET | `/api/complaints` | ✅ | Get all (filter: `?category=`) |
| GET | `/api/complaints/search` | ✅ | Search (`?location=`) |
| GET | `/api/complaints/:id` | ✅ | Get single complaint |
| PUT | `/api/complaints/:id` | ✅ | Update status |
| DELETE | `/api/complaints/:id` | ✅ | Delete complaint |
| POST | `/api/ai/analyze` | ✅ | AI complaint analysis |

## 🚀 Deployment (Render)

### Backend Deployment
1. Create a **Web Service** on Render
2. Connect your GitHub repo
3. Set **Root Directory**: `backend`
4. Set **Build Command**: `npm install`
5. Set **Start Command**: `node server.js`
6. Add environment variables (MONGO_URI, JWT_SECRET)

### Frontend Deployment
1. Create a **Static Site** on Render
2. Set **Root Directory**: `frontend`
3. Set **Build Command**: `npm install && npm run build`
4. Set **Publish Directory**: `dist`
5. Add env: `VITE_API_URL=https://your-backend.onrender.com/api`

## 📄 License

This project was built for academic evaluation — ESE Examination, B.Tech 4th Semester.

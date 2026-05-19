# AI-Based Smart Complaint Management System

A professional, Next-Gen full-stack MERN application for modern civic and organizational complaint management, fulfilling the B.Tech AI Driven Full Stack Development (AI308B) ESE Examination 2025-26 requirements.

## 🚀 Features
- **JWT Authentication**: Secure Role-based access (User & Admin).
- **AI Integration**: Automatically analyzes complaints, detects priority (Low/Medium/High/Critical), routes to correct departments, generates summaries, and drafts professional automated responses using Google Gemini API (or a fully capable fallback local AI heuristic engine).
- **Responsive UI**: Stunning dark-mode neon glassmorphism UI built with Tailwind CSS and React.
- **Admin Dashboard**: Custom dynamic SVG dashboard analytics without external charting libraries for maximum performance.
- **Render Ready**: Complete `render.yaml` configuration for instantaneous deployment of both static frontend and Node web service.

## 🛠 Tech Stack
- **Frontend**: React (Vite), React Router DOM, Axios, Tailwind CSS, Lucide React.
- **Backend**: Node.js, Express.js, MongoDB Atlas (Mongoose), JWT, Bcrypt.js, `@google/generative-ai`.

## ⚙️ Installation & Local Development

### 1. Backend Setup
```bash
cd backend
npm install
npm run dev
```

Create a `.env` in the `backend/` directory:
```env
PORT=5000
MONGO_URI=mongodb://sunny6ara:Kiet7677@ac-l5zyu7t-shard-00-00.ctc10ky.mongodb.net:27017,ac-l5zyu7t-shard-00-01.ctc10ky.mongodb.net:27017,ac-l5zyu7t-shard-00-02.ctc10ky.mongodb.net:27017/candidateDB?ssl=true&replicaSet=atlas-kb4u8w-shard-0&authSource=admin&retryWrites=true&w=majority
JWT_SECRET=7f9d3a8b6c1e2f4a9d8c7b5e3f1a6b9c0d2e4f6a8b1c3d5e7f9a0b2c4d6e8f1
OPENAI_API_KEY=your_gemini_api_key_here # Optional. Will use fallback engine if empty.
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Create a `.env` in the `frontend/` directory (if different API URL needed):
```env
VITE_API_URL=http://localhost:5000/api
```

## 🌍 Deployment on Render
1. Commit the repository to GitHub.
2. Go to Render.com -> Blueprints -> New Blueprint Instance.
3. Connect the GitHub repository.
4. Render will automatically read `render.yaml` and deploy both the backend service and the frontend static site!
5. Ensure you input the secret environment variables (`MONGO_URI`, `JWT_SECRET`) in the Render Dashboard when prompted.

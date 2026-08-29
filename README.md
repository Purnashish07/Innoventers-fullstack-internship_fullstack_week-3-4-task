# ProjectSync (Full Stack Week 3-4 Advanced)

ProjectSync is a robust full-stack project management application demonstrating advanced backend and frontend integration with strict security, authentication, and state management.

## Tech Stack
- **Frontend**: React, Vite, Redux Toolkit, React Router, Axios, Vanilla CSS
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Security**: JWT Authentication, bcrypt, RBAC (Role-Based Access Control)
- **Validation**: express-validator

Live Demo [View Website] https://fullstack-week3-4.vercel.app

## Major Features & Fixes
- **Security Enhancements**: 
  - Registration payload injection prevented (users can no longer self-assign `admin` role).
  - Secure project ownership checks for all CRUD operations (only the project owner can edit/delete).
  - Protected API routes and protected React routes.
- **Advanced State Management**: 
  - Complete Redux setup (authSlice, projectSlice, adminSlice).
  - Async Thunks for API calls with robust error payload handling.
- **UI/UX Overhaul**:
  - Entirely rebuilt with a premium Vanilla CSS design system (glassmorphism, vibrant palettes).
  - Modular UI architecture (Navbar, ProjectCard, ProjectModal, ProtectedRoute).
- **Admin Dashboard**:
  - Secure API endpoints for aggregated statistics (`/api/admin/stats`).
  - View overall platform usage (total users, projects) restricted exclusively to Admins.
- **Centralized Error Handling**:
  - Proper mapping of Mongoose errors (`CastError`, `ValidationError`, `11000`) into clean API responses.
  - Interceptors for handling 401s smoothly.

## Setup & Run

### 1. Backend Setup
```bash
cd backend
npm install
```
- Rename or duplicate `backend/.env.example` to `backend/.env`.
- **Important:** Ensure MongoDB is running locally (or update `MONGO_URI` to an Atlas string).
- **Start Backend:**
```bash
npm run dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install
```
- **Start Frontend:**
```bash
npm run dev
```

### 3. Administrator Setup
By default, registration creates standard `user` accounts. To create an initial admin, ensure your MongoDB is running and execute:
```bash
cd backend
node seedAdmin.js
```
*This will create an admin account (admin@example.com / admin123).*

## Folder Structure
```
├── backend/
│   ├── seedAdmin.js          # Admin account creation script
│   ├── .env.example          # Environment variables template
│   └── src/
│       ├── controllers/      # Route controllers (admin, auth, project)
│       ├── middlewares/      # auth, error, validation
│       ├── models/           # Mongoose schemas (User, Project)
│       └── routes/           # Express routers
└── frontend/
    └── src/
        ├── api/              # Axios instance and interceptors
        ├── components/       # Reusable UI components
        ├── pages/            # Page-level components
        ├── store/            # Redux store and slices
        └── index.css         # Global design system
```

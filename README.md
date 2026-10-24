# EduTrack 🎓

**Smart Student Academic Performance Monitoring & Analytics System**

EduTrack is a comprehensive, production-ready web platform and REST API designed for schools to track, analyze, and elevate student learning outcomes across Classes 1 through 8.

---

## 🌟 Key Features

- **Multi-Role Portal Access**:
  - **Teacher**: Record marks across 5 core subjects, update attendance, log behavioral remarks, and respond to parent inquiries.
  - **Principal**: High-level macro analytics, grade distributions, and inter-class performance benchmarks.
  - **Academic Coordinator**: Issue class-wide pedagogical directives, track curriculum implementation, and guide teachers.
  - **Parent**: Track student progress, view detailed subject & topic breakdown, and submit doubts directly to subject teachers.
  - **System Admin**: Manage user accounts, role allocations, audit logs, and system thresholds.

- **Granular Subject & Diagnostic Tracking**:
  - 5 Key Subjects: Mathematics, English, Gujarati, Hindi, and Environmental Studies (EVS).
  - Diagnostic sub-topics per subject to pinpoint remedial learning needs.

- **Interactive Visualizations & Analytics**:
  - Real-time percentage recalculation, pass/fail thresholds, and class ranking.
  - Comparative charts and drill-down metrics.

- **Secure REST API Backend**:
  - Layered Express.js architecture with Mongoose data modeling.
  - JWT Authentication, bcrypt password hashing, RBAC middleware.
  - Dual-mode database: MongoDB Atlas with automatic zero-friction in-memory fallback for local dev.
  - Helmet headers, rate-limiting, and sanitized CORS policies.

---

## 📁 Repository Structure

```
EduTrack/
├── admin.html               # Admin management portal
├── coordinator.html         # Academic coordinator portal
├── index.html               # Main dashboard / landing page
├── login.html               # Unified authentication portal
├── parent.html              # Parent monitoring portal
├── principal.html           # Principal analytics dashboard
├── teacher.html             # Teacher marks & attendance portal
├── config.js                # Frontend API environment configuration
├── script.js                # Core frontend application logic
├── style.css                # Global responsive styling & design system
├── netlify.toml             # Netlify deployment configuration
├── render.yaml              # Render backend deployment blueprint
├── _redirects               # SPA routing redirects
├── student_record.csv       # Sample student data import (CSV)
├── student_record.xlsx      # Sample student data import (Excel)
└── backend/                 # Node.js + Express REST API Backend
    ├── server.js            # Express server entry point
    ├── package.json         # Backend dependencies & scripts
    ├── EduTrack_API_Collection.json # Postman API Collection
    ├── src/
    │   ├── config/          # Database configuration
    │   ├── controllers/     # Route controller logic
    │   ├── middlewares/     # Auth, RBAC, error handling
    │   ├── models/          # Mongoose Schemas (User, Student, Advice, Doubt, Audit)
    │   ├── routes/          # REST API endpoints
    │   └── utils/           # Database seeding & helpers
    └── tests/               # Automated integration tests
```

---

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (or uses built-in in-memory MongoDB fallback)

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

The backend server will run on `http://localhost:5000` (or `PORT` specified in `.env`).

### 3. Frontend Setup
You can serve the frontend using any static web server (such as Live Server in VS Code, `npx serve`, or Python's `http.server`):
```bash
# From the root directory:
npx serve .
```
Or open `index.html` in your web browser.

---

## 🧪 Testing

Run automated API integration tests:
```bash
cd backend
npm test
```

---

## 🌐 Deployment

- **Frontend**: Pre-configured for deployment on **Netlify** with `netlify.toml` and `_redirects`.
- **Backend**: Pre-configured for deployment on **Render** with `render.yaml`.

---

## 📄 License
ISC

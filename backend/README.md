# EduTrack Backend API

Production-ready REST API backend for the **EduTrack** Smart Student Academic Performance Monitoring System.

---

## 🚀 Key Features
- **Node.js & Express.js** modular layered architecture.
- **MongoDB Atlas & Mongoose** data modeling with schema validation, indexing, and automatic overall percentage calculation.
- **Role-Based Access Control (RBAC)** supporting 5 roles: `teacher`, `principal`, `coordinator`, `parent`, and `admin`.
- **JWT Authentication & bcrypt Password Hashing** (salted passwords, HTTP-only cookie + Bearer header options).
- **Comprehensive Academic Ledger**:
  - 5 Subjects (*Mathematics, English, Gujarati, Hindi, EVS*) with 5 diagnostic topics each.
  - Granular mark updates with live average recalculation.
  - Excel/CSV bulk student import (`/api/v1/students/bulk`).
- **Coordinator Pedagogical Directives** (`/api/v1/advice`).
- **Parent Doubts & School Inquiries** (`/api/v1/doubts`) with teacher response workflow.
- **Admin Panel** (`admin.html`) with real-time statistics, user provisioning, audit logging, and seed controls.
- **Production Hardened**: Helmet security headers, rate limiting on sensitive endpoints, CORS configured for Netlify and localhost, centralized error handling.
- **Dual Database Mode**: Automatically connects to MongoDB Atlas via `MONGODB_URI`. If run offline or without a URI in local development, it starts an in-memory MongoDB instance for zero-friction testing.

---

## 🛠️ Quick Local Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

| Variable | Description | Default |
| :--- | :--- | :--- |
| `PORT` | Port for the Express server | `5000` |
| `MONGODB_URI` | MongoDB Atlas connection string | *(empty = in-memory fallback)* |
| `JWT_SECRET` | Secret key for signing JWT tokens | `edutrack_jwt_secret_dev_key...` |
| `JWT_EXPIRES_IN` | Token duration | `7d` |
| `FRONTEND_URL` | Allowed CORS origins (comma-separated) | `https://chipper-syrniki-ba897a.netlify.app,...` |
| `ADMIN_INITIAL_EMAIL` | Initial admin account email | `admin@edutrack.edu` |
| `ADMIN_INITIAL_PASSWORD` | Initial admin password | `AdminSecurePass@2026` |

### 3. Run Automated Tests
```bash
npm test
```
All 14 integration tests will run verifying health checks, auth, CRUD, RBAC, analytics, doubts, and admin security.

### 4. Start Server
```bash
# Start in development mode with live watch:
npm run dev

# Or start in standard mode:
npm start
```

The server will automatically seed initial demo accounts and student rosters on first run.

---

## 👥 Pre-Configured Demo Accounts

| Role | Email | Password | Scope / Class |
| :--- | :--- | :--- | :--- |
| **Teacher** | `teacher@edutrack.edu` | `teach123` | Class 4 - Section A |
| **Principal** | `principal@edutrack.edu` | `admin123` | School-Wide (Class 1 to 8) |
| **Coordinator** | `brc@edutrack.edu` | `brc123` | Class 4, Class 5, Class 6 |
| **Parent** | `parent@edutrack.edu` | `parent123` | Linked to Aarav & Pooja Patel |
| **Super Admin** | `admin@edutrack.edu` | `AdminSecurePass@2026` | Central Admin Panel (`admin.html`) |

---

## 📡 API Reference Overview (`/api/v1`)

### 1. Health & Status
- `GET /health` — Service health check and student count
- `GET /api/status` — Backward-compatibility status for frontend

### 2. Authentication (`/api/v1/auth`)
- `POST /api/v1/auth/login` — Authenticate and receive JWT token
- `POST /api/v1/auth/register` — Register a new account
- `GET /api/v1/auth/me` — Get authenticated user profile
- `PUT /api/v1/auth/update-password` — Change password
- `POST /api/v1/auth/logout` — Clear session / cookie

### 3. Students (`/api/v1/students`)
- `GET /api/v1/students` — List students (filter by `className`, `section`, `search`, `parentEmail`)
- `GET /api/v1/students/:id` — Get single student by `studentId` or Mongo `_id`
- `POST /api/v1/students` — Add student with topic scores *(Teacher, Admin)*
- `PUT /api/v1/students/:id` — Update student marks or remarks *(Teacher, Admin)*
- `DELETE /api/v1/students/:id` — Delete student *(Admin, Teacher)*
- `POST /api/v1/students/bulk` — Bulk import array of parsed students *(Teacher, Admin)*

### 4. Coordinator Advice (`/api/v1/advice`)
- `GET /api/v1/advice` — List directives (filter by `className`)
- `POST /api/v1/advice` — Issue pedagogical directive *(Coordinator, Admin)*
- `PUT /api/v1/advice/:id/status` — Update implementation status *(Coordinator, Principal, Admin)*
- `DELETE /api/v1/advice/:id` — Delete directive *(Admin)*

### 5. Parent Doubts (`/api/v1/doubts`)
- `GET /api/v1/doubts` — List parent doubts (filter by `studentId`, `parentEmail`, `status`)
- `POST /api/v1/doubts` — Submit new question
- `PUT /api/v1/doubts/:id/reply` — Submit teacher/admin reply *(Teacher, Admin)*
- `PUT /api/v1/doubts/:id/status` — Mark status (`Pending`, `Replied`, `Resolved`)

### 6. Analytics & Comparison (`/api/v1/analytics`)
- `GET /api/v1/analytics/overview` — School-wide metric counters and mastery distribution
- `GET /api/v1/analytics/class-comparison` — Average score comparisons across Class 1 to 8
- `GET /api/v1/analytics/subject-comparison` — Average scores across 5 core subjects

### 7. Settings (`/api/v1/settings`)
- `GET /api/v1/settings/thresholds` — Get mastery thresholds (default: 75% Excellent, 40% Average)
- `PUT /api/v1/settings/thresholds` — Update thresholds *(Teacher, Admin)*

### 8. Admin Control (`/api/v1/admin`)
- `GET /api/v1/admin/dashboard` — Live counters, role breakdowns, and recent activity
- `GET /api/v1/admin/users` — List all registered users
- `POST /api/v1/admin/users` — Provision new user with specified role
- `PUT /api/v1/admin/users/:id` — Update user status / role / class
- `DELETE /api/v1/admin/users/:id` — Remove user
- `GET /api/v1/admin/audit-logs` — Paginated administrative activity log
- `POST /api/v1/admin/seed` — Reset & seed database with standard Gujarat school roster

---

## 📮 Postman Collection
Import [`backend/EduTrack_API_Collection.json`](EduTrack_API_Collection.json) into Postman to test all endpoints with pre-configured requests, environment variables, and authentication test scripts.

---

## ☁️ Deployment Instructions (Render)

1. Push this repository to GitHub.
2. In the [Render Dashboard](https://dashboard.render.com), click **New +** > **Blueprint** (or **Web Service**).
3. Connect your GitHub repository. Render will automatically detect [`render.yaml`](../render.yaml):
   - **Root Directory**: `.`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && node server.js`
   - **Health Check Path**: `/health`
4. Set the following environment variables in the Render dashboard:
   - `MONGODB_URI`: Your MongoDB Atlas connection string.
   - `JWT_SECRET`: A secure random secret string.
   - `FRONTEND_URL`: `https://chipper-syrniki-ba897a.netlify.app`
5. Click **Deploy**. Your API will be live at `https://<your-service-name>.onrender.com`.
6. To connect your Netlify frontend, add this one-line tag in your HTML headers or configure in Netlify environment variables:
   ```html
   <script>window.EDUTRACK_API_URL = 'https://<your-service-name>.onrender.com';</script>
   ```

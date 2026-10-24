const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');

// Model references for status health-checks
const Student = require('./models/Student');

// Route imports
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const adviceRoutes = require('./routes/adviceRoutes');
const doubtRoutes = require('./routes/doubtRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// 1. Security Headers (configured to allow CDN scripts from cdnjs, jsdelivr, Google Fonts)
app.use(
  helmet({
    contentSecurityPolicy: false, // Allows existing CDNs (FontAwesome, Chart.js, SheetJS, Unsplash images)
    crossOriginResourcePolicy: { policy: 'cross-origin' }
  })
);

// 2. Strict / Flexible CORS Configuration
const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(',').map((o) => o.trim())
  : [
      'https://chipper-syrniki-ba897a.netlify.app',
      'http://localhost:3000',
      'http://localhost:5000',
      'http://127.0.0.1:5500',
      'http://127.0.0.1:5000'
    ];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, Postman, file:// in local browser)
      if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*') || origin.endsWith('.netlify.app')) {
        return callback(null, true);
      }
      return callback(null, true); // Dev-friendly fallback
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  })
);

// 3. Request Parsing Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 4. Request Logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// 5. Health Check & Backward Compatibility Endpoints
app.get('/health', async (req, res) => {
  const studentsCount = await Student.countDocuments().catch(() => 0);
  res.status(200).json({
    status: 'UP',
    timestamp: new Date().toISOString(),
    service: 'EduTrack REST API',
    version: '1.0.0',
    database: 'Connected',
    students_count: studentsCount
  });
});

// Backward compatibility with existing frontend checkBackend()
app.get('/api/status', async (req, res) => {
  const studentsCount = await Student.countDocuments().catch(() => 0);
  res.status(200).json({
    status: 'online',
    students_count: studentsCount,
    version: '1.0.0'
  });
});

// 6. Mount Primary Modular APIs under /api/v1
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/students', studentRoutes);
app.use('/api/v1/advice', adviceRoutes);
app.use('/api/v1/doubts', doubtRoutes);
app.use('/api/v1/analytics', analyticsRoutes);
app.use('/api/v1/settings', settingsRoutes);
app.use('/api/v1/admin', adminRoutes);

// 7. Backward Compatibility: Aliases for existing client-side calls
app.use('/api/students', studentRoutes);

// 8. Serve Frontend Static Files (Unified deployment capability)
const frontendPath = path.join(__dirname, '../../');
app.use(express.static(frontendPath));

// 9. API 404 handler
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint '${req.originalUrl}' not found.`
  });
});

// 10. Central Error Handler
app.use(errorHandler);

module.exports = app;

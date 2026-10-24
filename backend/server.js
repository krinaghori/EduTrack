require('dotenv').config();
const app = require('./src/app');
const { connectDB, disconnectDB } = require('./src/config/db');
const { runSeed } = require('./src/utils/seedData');
const User = require('./src/models/User');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // 1. Connect to Database (Atlas or in-memory fallback)
    await connectDB();

    // 2. Auto-seed if database is brand new (zero setup friction)
    const usersCount = await User.countDocuments();
    if (usersCount === 0) {
      console.log('⚡ Initializing database with seed data...');
      await runSeed();
    }

    // 3. Start Express HTTP Server
    const server = app.listen(PORT, () => {
      console.log(`=======================================================`);
      console.log(`🚀 EduTrack Backend Server running on port ${PORT}`);
      console.log(`🌐 Base API URL: http://localhost:${PORT}/api/v1`);
      console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
      console.log(`📊 Mode: ${process.env.NODE_ENV || 'development'}`);
      console.log(`=======================================================`);
    });

    // 4. Graceful Shutdown Handlers
    const shutdown = async (signal) => {
      console.log(`\n🛑 Received ${signal}. Shutting down gracefully...`);
      server.close(async () => {
        await disconnectDB();
        console.log('✅ Server & Database closed cleanly.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
};

startServer();

const mongoose = require('mongoose');

let memoryServer = null;

const connectDB = async () => {
  try {
    let mongoUri = process.env.MONGODB_URI;

    if (!mongoUri || mongoUri.trim() === '') {
      console.log('ℹ️ No MONGODB_URI provided in .env. Initializing local in-memory MongoDB database...');
      try {
        const { MongoMemoryServer } = require('mongodb-memory-server');
        memoryServer = await MongoMemoryServer.create();
        mongoUri = memoryServer.getUri();
        console.log(`✅ In-Memory MongoDB running at: ${mongoUri}`);
      } catch (memErr) {
        console.warn('⚠️ Could not start mongodb-memory-server, falling back to local mongodb://localhost:27017/edutrack:', memErr.message);
        mongoUri = 'mongodb://127.0.0.1:27017/edutrack';
      }
    }

    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000
    });

    console.log(`✅ MongoDB Connected successfully: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (err) {
    console.error(`❌ MongoDB Connection Error: ${err.message}`);
    // If external URI failed in local dev, try memory server fallback
    if (!memoryServer && process.env.NODE_ENV !== 'production') {
      try {
        console.log('🔄 Attempting fallback to in-memory MongoDB for offline development...');
        const { MongoMemoryServer } = require('mongodb-memory-server');
        memoryServer = await MongoMemoryServer.create();
        const fallbackUri = memoryServer.getUri();
        const conn = await mongoose.connect(fallbackUri);
        console.log(`✅ Fallback In-Memory MongoDB Connected: ${fallbackUri}`);
        return conn;
      } catch (fallbackErr) {
        console.error('❌ Fallback failed:', fallbackErr.message);
      }
    }
    process.exit(1);
  }
};

const disconnectDB = async () => {
  await mongoose.disconnect();
  if (memoryServer) {
    await memoryServer.stop();
  }
};

module.exports = { connectDB, disconnectDB };

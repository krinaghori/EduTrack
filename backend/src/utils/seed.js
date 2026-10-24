require('dotenv').config();
const { connectDB, disconnectDB } = require('../config/db');
const { runSeed } = require('./seedData');

const execute = async () => {
  try {
    await connectDB();
    await runSeed();
    console.log('🎉 Seed script finished successfully.');
    await disconnectDB();
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed script error:', err);
    process.exit(1);
  }
};

execute();

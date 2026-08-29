const mongoose = require('mongoose');

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    let uri = process.env.MONGO_URI;

    const isLocalOrMissing = !uri || uri.includes('localhost') || uri.includes('127.0.0.1');
    if (isLocalOrMissing && process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
      console.log('No external MongoDB found - starting in-memory MongoDB...');
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      uri = mongod.getUri();
      console.log('In-memory MongoDB started at:', uri);
    }

    if (!uri) {
      console.warn('MONGO_URI not set. Using in-memory MongoDB for this session.');
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      uri = mongod.getUri();
    }

    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (e) {
    console.error('MongoDB connection error:', e);
    process.exit(1);
  }
};

module.exports = connectDB;

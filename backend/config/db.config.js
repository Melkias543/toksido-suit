import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the URL environment variable");
}

/**
 * Production Connection Options
 * 1. autoIndex: Set to false in production to avoid performance hits.
 * 2. connectTimeoutMS: How long to wait for initial connection.
 * 3. socketTimeoutMS: How long to wait for inactive sockets.
 */
const options = {
  autoIndex: false, 
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  family: 4, // Use IPv4, skip trying IPv6
};

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI, options);
    console.log(`🚀 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Initial Connection Error: ${error.message}`);
    // In production, you might want to retry rather than exit
    process.exit(1); 
  }

  // EVENT LISTENERS FOR LIFECYCLE ERRORS
  mongoose.connection.on('error', (err) => {
    console.error(`🔥 MongoDB Runtime Error: ${err}`);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('⚠️ MongoDB Disconnected! Attempting to reconnect...');
  });

  // GRACEFUL SHUTDOWN
  process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('🛑 MongoDB connection closed due to app termination');
    process.exit(0);
  });
};

export default connectDB;
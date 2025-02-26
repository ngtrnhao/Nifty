import express from 'express';
import dotenv from 'dotenv';
import { connectMongoDB, postgresPool } from './config/index.js';
import mongoose from 'mongoose';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 2002;

// Kết nối databases
connectMongoDB();

// Middleware
app.use(express.json());

// Test routes
app.get('/test-db', async (req, res) => {
  try {
    // Test PostgreSQL
    const pgResult = await postgresPool.query('SELECT NOW()');

    // Test MongoDB
    const mongoStatus = mongoose.connection.readyState === 1;

    res.json({
      postgresql: {
        status: 'Kết nối thành công',
        timestamp: pgResult.rows[0].now,
      },
      mongodb: {
        status: mongoStatus ? 'Kết nối thành công' : 'Chưa kết nối',
      },
    });
  } catch (err) {
    res.status(500).json({
      message: 'Lỗi kết nối database',
      error: err.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server đang chạy trên port ${PORT}`);
});

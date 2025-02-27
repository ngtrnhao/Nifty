import 'dotenv/config';
import express from 'express';
import mongoDBConnection from './patterns/singleton/MongoDBConnection.js';
import postgreSQLConnection from './patterns/singleton/PostgreSQLConnection.js';

const app = express();
const PORT = process.env.PORT || 2002;

// Kiểm tra biến môi trường
console.log('Checking environment variables:');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Defined' : 'Undefined');
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Defined' : 'Undefined');

const startServer = async () => {
  try {
    // Kết nối databases
    await Promise.all([
      mongoDBConnection.connect(),
      postgreSQLConnection.connect()
    ]);

    // Test route để kiểm tra kết nối
    app.get('/test-db', async (req, res) => {
      try {
        const pgPool = postgreSQLConnection.getPool();
        const pgResult = await pgPool.query('SELECT NOW()');
        
        res.json({
          postgresql: {
            status: 'Kết nối thành công',
            timestamp: pgResult.rows[0].now,
          },
          mongodb: {
            status: mongoDBConnection.isConnected() ? 'Kết nối thành công' : 'Chưa kết nối',
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
  } catch (error) {
    console.error('Lỗi khởi động server:', error);
    process.exit(1);
  }
};

// Xử lý đóng kết nối khi tắt server
process.on('SIGINT', async () => {
  try {
    await Promise.all([
      mongoDBConnection.disconnect(),
      postgreSQLConnection.disconnect()
    ]);
    process.exit(0);
  } catch (error) {
    console.error('Lỗi khi đóng kết nối:', error);
    process.exit(1);
  }
});

startServer();

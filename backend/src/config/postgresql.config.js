import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Thêm log để debug
console.log('Database Config:', {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

const postgresPool = new Pool({
  user: process.env.DB_USER || 'postgres', // Thêm giá trị mặc định
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'db_socail_media',
  password: String(process.env.DB_PASSWORD),
  port: parseInt(process.env.DB_PORT, 10) || 5432,
});

// Thêm log để debug
console.log('Attempting to connect with:', {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

//Kiểm tra kết nối
postgresPool.connect((err) => {
  if (err) {
    console.error('Lỗi kết nối database: ', err);
  } else {
    console.log('Kết nối database thành công');
  }
});
export default postgresPool;

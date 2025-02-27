import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Log ra giá trị biến môi trường DATABASE_URL để chắc chắn nó đã được load
console.log('DATABASE_URL:', process.env.DATABASE_URL);

// Tạo pool kết nối
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Nếu RDS yêu cầu SSL
  },
});

// Hàm kiểm tra kết nối
async function testConnection() {
  console.log('Đang thử kết nối đến PostgreSQL...');
  try {
    const client = await pool.connect();
    console.log('Kết nối RDS PostgreSQL thành công!');

    // Thực hiện truy vấn đơn giản
    const res = await client.query('SELECT NOW() AS current_time');
    console.log('Kết quả truy vấn:', res.rows[0]);

    // Đóng kết nối
    client.release();
  } catch (err) {
    console.error('Lỗi kết nối:', err);
  }
}

// Gọi hàm testConnection khi file được chạy
testConnection();

export default pool;

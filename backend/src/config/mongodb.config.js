import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectMongoDB = async () => {
  try {
    // Cấu hình cho cluster
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout sau 5s nếu không kết nối được
      maxPoolSize: 10, // Số lượng kết nối tối đa trong pool
      socketTimeoutMS: 45000, // Thời gian chờ socket
      family: 4, // IPv4, 6 cho IPv6
    };

    // Kết nối với cluster MongoDB
    const conn = await mongoose.connect(process.env.MONGODB_URI, options);

    console.log('MongoDB Cluster đã kết nối thành công!');
    console.log(`Host: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);

    // Xử lý sự kiện kết nối
    mongoose.connection.on('connected', () => {
      console.log('Mongoose đã kết nối thành công');
    });

    mongoose.connection.on('error', (err) => {
      console.error('Lỗi kết nối Mongoose:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose đã ngắt kết nối');
    });

    // Xử lý tắt ứng dụng
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('Đã đóng kết nối Mongoose do ứng dụng kết thúc');
      process.exit(0);
    });
  } catch (error) {
    console.error(`Lỗi kết nối MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectMongoDB;

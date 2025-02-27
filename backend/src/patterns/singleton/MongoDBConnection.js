import mongoose from 'mongoose';

class MongoDBConnection {
  constructor() {
    if (MongoDBConnection.instance) {
      return MongoDBConnection.instance;
    }
    this._isConnected = false;
    MongoDBConnection.instance = this;
  }

  async connect() {
    if (this._isConnected) {
      console.log('MongoDB đã được kết nối, sử dụng kết nối hiện tại');
      return;
    }

    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI không được định nghĩa trong biến môi trường');
    }

    try {
      const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        maxPoolSize: 10,
        socketTimeoutMS: 45000,
        family: 4,
      };

      const conn = await mongoose.connect(process.env.MONGODB_URI, options);
      this._isConnected = true;
      
      console.log('MongoDB Cluster đã kết nối thành công!');
      console.log(`Host: ${conn.connection.host}`);
      console.log(`Database: ${conn.connection.name}`);

      this.setupEventHandlers();
    } catch (error) {
      this._isConnected = false;
      console.error('Lỗi kết nối MongoDB:', error);
      throw error;
    }
  }

  setupEventHandlers() {
    mongoose.connection.on('connected', () => {
      console.log('Mongoose đã kết nối thành công');
    });

    mongoose.connection.on('error', (err) => {
      this._isConnected = false;
      console.error('Lỗi kết nối Mongoose:', err);
    });

    mongoose.connection.on('disconnected', () => {
      this._isConnected = false;
      console.log('Mongoose đã ngắt kết nối');
    });

    process.on('SIGINT', async () => {
      await this.disconnect();
    });
  }

  async disconnect() {
    if (!this._isConnected) return;

    try {
      await mongoose.connection.close();
      this._isConnected = false;
      console.log('Đã đóng kết nối MongoDB');
    } catch (error) {
      console.error('Lỗi khi đóng kết nối MongoDB:', error);
      throw error;
    }
  }

  isConnected() {
    return this._isConnected;
  }
}

export default new MongoDBConnection();
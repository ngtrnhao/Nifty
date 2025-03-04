import pg from 'pg';
const { Pool } = pg;

class PostgreSQLConnection {
  constructor() {
    if (PostgreSQLConnection.instance) {
      return PostgreSQLConnection.instance;
    }

    if (!process.env.DATABASE_URL) {
      throw new Error(
        'DATABASE_URL không được định nghĩa trong biến môi trường'
      );
    }

    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    this._isConnected = false;
    PostgreSQLConnection.instance = this;
  }

  async connect() {
    if (this._isConnected) {
      console.log('PostgreSQL đã được kết nối, sử dụng kết nối hiện tại');
      return;
    }

    try {
      const client = await this.pool.connect();
      const result = await client.query('SELECT NOW()');
      client.release();

      this._isConnected = true;
      console.log('Kết nối PostgreSQL thành công!');
      console.log('Thời gian server:', result.rows[0].now);
    } catch (error) {
      this._isConnected = false;
      console.error('Lỗi kết nối PostgreSQL:', error);
      throw error;
    }
  }

  async disconnect() {
    if (!this._isConnected) return;

    try {
      await this.pool.end();
      this._isConnected = false;
      console.log('Đã đóng kết nối PostgreSQL');
    } catch (error) {
      console.error('Lỗi khi đóng kết nối PostgreSQL:', error);
      throw error;
    }
  }

  isConnected() {
    return this._isConnected;
  }

  getPool() {
    return this.pool;
  }
}

const postgreSQLConnection = new PostgreSQLConnection();
export default new PostgreSQLConnection();

import { supabase } from '../../config/supabase.js';

class PostgreSQLConnection {
  constructor() {
    if (PostgreSQLConnection.instance) {
      return PostgreSQLConnection.instance;
    }
    this.supabase = supabase;
    this._isConnected = false;
    PostgreSQLConnection.instance = this;
  }
  async connect() {
    if (this._isConnected) {
      console.log('Supabase đã được kết nối,sử dụng kết nối hiện tại ');
      return;
    }
    try {
      const { data, error } = await this.supabase.from('users').select('count');
      if (error) throw error;
      this._isConnected = true;
      console.log('Kết nối Supabase thành công');
    } catch (error) {
      this._isConnected = false;
      console.error('Lỗi kết nối Supabase: ', error);
      throw error;
    }
  }
  getClient() {
    return this.supabase;
  }
  isConnected() {
    return this._isConnected;
  }
  getPool() {
    return this.supabase;
  }
}
export default new PostgreSQLConnection();

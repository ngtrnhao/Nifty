import postgreSQLConnection from '../../patterns/singleton/PostgreSQLConnection.js';
import bcrypt from 'bcrypt';

const supabase = postgreSQLConnection.getClient();

class UserModel {
  static async createUser(userData) {
    const { username, email, password, full_name, role } = userData;

    // Kiểm tra các trường bắt buộc
    if (!username || !email || !password) {
      throw new Error('Username, email và password là bắt buộc');
    }

    // Kiểm tra email tồn tại
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    if (existingUser) {
      throw new Error('Email đã được sử dụng');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userRole = role || 'user';
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          username,
          email,
          password: hashedPassword,
          full_name: full_name || '',
          is_verified: false,
          is_active: true,
          role: userRole,
        },
      ])
      .select('id, username, email, full_name, role')
      .maybeSingle();

    if (error) throw error;
    if (!data) throw new Error('Không thể tạo user');

    return data;
  }

  static async findByEmail(email) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  static async findById(id) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  static async updateVerificationStatus(userId, isVerified) {
    const { error } = await supabase
      .from('users')
      .update({ is_verified: isVerified })
      .eq('id', userId);

    if (error) throw error;
    return true;
  }

  static async updatePassword(userId, hashedPassword) {
    const { error } = await supabase
      .from('users')
      .update({ password: hashedPassword })
      .eq('id', userId);

    if (error) throw error;
    return true;
  }
  static async updateUserRole(userId, newRole) {
    const { error } = await supabase
      .from('users')
      .update({ role: newRole })
      .eq('id', userId);
    if (error) throw error;
    return true;
  }

  static async softDeleteUser(userId) {
    const { error } = await supabase
      .from('users')
      .update({ is_deleted: true, deleted_at: new Date() })
      .eq('id', userId);

    if (error) throw error;
    return true;
  }

  static async restoreUser(userId) {
    const { error } = await supabase
      .from('users')
      .update({ is_deleted: false, deleted_at: null })
      .eq('id', userId);

    if (error) throw error;
    return true;
  }

  static async findAllUsers() {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('is_deleted', false)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async findAllUsersIncludeDeleted() {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async findDeletedUsers() {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('is_deleted', true)
      .order('deleted_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async permanentlyDeleteUser(userId) {
    const { error } = await supabase.from('users').delete().eq('id', userId);

    if (error) throw error;
    return true;
  }
}

export default UserModel;

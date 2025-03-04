import postgreSQLConnection from '../../patterns/singleton/PostgreSQLConnection.js';
import bcrypt from 'bcrypt';

const pool = postgreSQLConnection.getPool();

class UserModel {
  static async createUser(userData) {
    const { username, email, password, full_name } = userData;
    
    // Kiểm tra các trường bắt buộc
    if (!username || !email || !password) {
      throw new Error('Username, email và password là bắt buộc');
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
        INSERT INTO users (username, email, password, full_name, is_verified, is_active, created_at, updated_at)
        VALUES ($1, $2, $3, $4, false, true, NOW(), NOW())
        RETURNING id, username, email, full_name
        `;

    const values = [username, email, hashedPassword, full_name || ''];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findByEmail(email) {
    const query = `
      SELECT * FROM users 
      WHERE email = $1 AND (is_deleted = FALSE OR is_deleted IS NULL)
    `;
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  static async findById(id) {
    const query = `
      SELECT * FROM users 
      WHERE id = $1 AND (is_deleted = FALSE OR is_deleted IS NULL)
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async updateVerificationStatus(userId, isVerified) {
    const query = `UPDATE users SET is_verified = $1, updated_at = NOW() WHERE id = $2 RETURNING *`;
    const result = await pool.query(query, [isVerified, userId]);
    return result.rows[0];
  }

  static async updatePassword(userId, hashedPassword) {
    const query = `UPDATE users SET password = $1, updated_at = NOW() WHERE id = $2 RETURNING *`;
    const result = await pool.query(query, [hashedPassword, userId]);
    return result.rows[0];
  }

  static async softDeleteUser(userId) {
    const query = `
      UPDATE users 
      SET is_deleted = TRUE, 
          deleted_at = NOW(), 
          updated_at = NOW() 
      WHERE id = $1 
      RETURNING *
    `;
    const result = await pool.query(query, [userId]);
    return result.rows[0];
  }

  static async restoreUser(userId) {
    const query = `
      UPDATE users 
      SET is_deleted = FALSE, 
          deleted_at = NULL, 
          updated_at = NOW() 
      WHERE id = $1 
      RETURNING *
    `;
    const result = await pool.query(query, [userId]);
    return result.rows[0];
  }

  static async findAllUsers() {
    const query = `
      SELECT * FROM users 
      WHERE is_deleted = FALSE OR is_deleted IS NULL
      ORDER BY created_at DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  static async findAllUsersIncludeDeleted() {
    const query = `
      SELECT * FROM users 
      ORDER BY created_at DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  static async findDeletedUsers() {
    const query = `
      SELECT * FROM users 
      WHERE is_deleted = TRUE
      ORDER BY deleted_at DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  static async permanentlyDeleteUser(userId) {
    const query = `DELETE FROM users WHERE id = $1 RETURNING *`;
    const result = await pool.query(query, [userId]);
    return result.rows[0];
  }
}

export default UserModel;

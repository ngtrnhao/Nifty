import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/postgresql/user.model.js';
import { sendEmail } from '../utils/email.js';
import dotenv from 'dotenv';

dotenv.config();

class AuthController {
  async register(req, res) {
    try {
      const { email, password, username, full_name } = req.body;
      
      // Kiểm tra dữ liệu đầu vào
      if (!email || !password || !username) {
        return res.status(400).json({ message: 'Email, password và username là bắt buộc' });
      }
      
      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'Email đã được sử dụng' });
      }
      
      console.log('Creating user with data:', { email, username, full_name }); // Log để debug
      
      const user = await UserModel.createUser({
        email,
        password,
        username,
        full_name,
      });
      
      //Verification token
      const verificationToken = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      //Send verification email
      await sendEmail({
        to: email,
        subject: 'Xác thực tài khoản',
        text: `Click vào link sau để xác thực: ${process.env.FRONTEND_URL}/verify-email/${verificationToken}`,
      });
      res.status(201).json({
        message: 'Đăng ký thành công',
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          full_name: user.full_name,
        },
        verificationToken,
      });
    } catch (error) {
      console.error('Register error:', error); // Log lỗi chi tiết
      res.status(500).json({ message: error.message });
    }
  }
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findByEmail(email);

      if (!user) {
        return res
          .status(401)
          .json({ message: 'Email hoặc mật khẩu không đúng' });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res
          .status(401)
          .json({ message: 'Email hoặc mật khẩu không đúng' });
      }

      if (!user.is_verified) {
        return res
          .status(401)
          .json({ message: 'Tài khoản chưa được xác thực' });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });

      res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          full_name: user.full_name,
        },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async verifyEmail(req, res) {
    try {
      const { token } = req.params;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      const user = await UserModel.findById(decoded.userId);
      if (!user) {
        return res.status(404).json({ message: 'Người dùng không tồn tại' });
      }

      await UserModel.updateVerificationStatus(user.id, true);
      res.json({ message: 'Xác thực email thành công' });
    } catch (error) {
      res.status(400).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
    }
  }
  async sendVerificationEmail(req, res) {
    try {
      const { email } = req.body;
      const user = await UserModel.findByEmail(email);
      
      if (!user) {
        return res.status(404).json({ message: 'Email không tồn tại' });
      }
      
      const verificationToken = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      await sendEmail({
        to: email,
        subject: 'Xác thực tài khoản',
        text: `Click vào link sau để xác thực: ${process.env.FRONTEND_URL}/verify-email/${verificationToken}`,
      });
      
      res.json({ message: 'Email xác thực đã được gửi' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async findAccount(req, res) {
    try {
      const { email } = req.body;
      const user = await UserModel.findByEmail(email);
      
      if (!user) {
        return res.status(404).json({ message: 'Không tìm thấy tài khoản' });
      }

      res.json({ 
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          full_name: user.full_name
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async resetPassword(req, res) {
    try {
      const { userId } = req.params;
      const { password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);
      await UserModel.updatePassword(userId, hashedPassword);

      res.json({ message: 'Đặt lại mật khẩu thành công' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async googleLogin(req, res) {
    try {
      const { token } = req.body;
      // Xử lý đăng nhập bằng Google
      res.json({ message: 'Đăng nhập Google thành công' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async deleteAccount(req, res) {
    try {
      const userId = req.user.id; // Lấy từ middleware xác thực
      
      const deletedUser = await UserModel.softDeleteUser(userId);
      if (!deletedUser) {
        return res.status(404).json({ message: 'Người dùng không tồn tại' });
      }
      
      res.json({ message: 'Tài khoản đã được xóa thành công' });
    } catch (error) {
      console.error('Delete account error:', error);
      res.status(500).json({ message: error.message });
    }
  }
  async restoreAccount(req, res) {
    try {
      const { userId } = req.params;
      
      const restoredUser = await UserModel.restoreUser(userId);
      if (!restoredUser) {
        return res.status(404).json({ message: 'Người dùng không tồn tại' });
      }
      
      res.json({ 
        message: 'Tài khoản đã được khôi phục thành công',
        user: {
          id: restoredUser.id,
          email: restoredUser.email,
          username: restoredUser.username,
          full_name: restoredUser.full_name
        }
      });
    } catch (error) {
      console.error('Restore account error:', error);
      res.status(500).json({ message: error.message });
    }
  }
  async permanentlyDeleteAccount(req, res) {
    try {
      const { userId } = req.params;
      
      const deletedUser = await UserModel.permanentlyDeleteUser(userId);
      if (!deletedUser) {
        return res.status(404).json({ message: 'Người dùng không tồn tại' });
      }
      
      res.json({ message: 'Tài khoản đã được xóa vĩnh viễn' });
    } catch (error) {
      console.error('Permanently delete account error:', error);
      res.status(500).json({ message: error.message });
    }
  }
}

// Tạo một instance và export instance đó
const authController = new AuthController();
export default authController;

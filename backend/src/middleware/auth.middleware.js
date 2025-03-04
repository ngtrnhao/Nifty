import jwt from 'jsonwebtoken';
import UserModel from '../models/postgresql/user.model.js';

export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Không có token xác thực' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ message: 'Người dùng không tồn tại' });
    }
    
    req.user = {
      id: user.id,
      email: user.email,
      username: user.username
    };
    
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
    }
    res.status(500).json({ message: error.message });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    // Kiểm tra xem người dùng đã được xác thực chưa
    if (!req.user) {
      return res.status(401).json({ message: 'Không được phép' });
    }
    
    // Lấy thông tin người dùng từ database
    const user = await UserModel.findById(req.user.id);
    
    // Kiểm tra quyền admin (giả sử có cột is_admin trong bảng users)
    if (!user || !user.is_admin) {
      return res.status(403).json({ message: 'Không có quyền truy cập' });
    }
    
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
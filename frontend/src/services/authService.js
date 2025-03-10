import api from './api';

// const mockUsers = [
//   {
//     _id: '1',
//     name: 'Nguyễn Văn A',
//     email: 'nguyenvana@gmail.com',
//     password: '123456',
//   },
//   {
//     _id: '2',
//     name: 'Trần Thị B',
//     email: 'tranthib@gmail.com',
//     password: '123456',
//   },
// ];

export const authService = {
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  findAccount: async (email) => {
    try {
      const response = await api.post('/auth/find-account', { email });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  resetPassword: async (userId, password) => {
    try {
      const response = await api.post(`/auth/reset-password/${userId}`, {
        password,
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  sendVerificationEmail: async (email) => {
    try {
      const response = await api.post('/auth/send-verification', { email });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  verifyEmail: async (token) => {
    try {
      const response = await api.post(`/auth/verify-email/${token}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  deleteAccount: async () => {
    try {
      const response = await api.delete('/auth/delete-account');
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  restoreAccount: async (userId) => {
    try {
      const response = await api.post(`/auth/restore-account/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  permanentlyDeleteAccount: async (userId) => {
    try {
      const response = await api.delete(`/auth/permanently-delete/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};
export default authService;

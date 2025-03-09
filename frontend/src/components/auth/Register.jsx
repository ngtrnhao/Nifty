import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  registerUser,
  sendVerificationEmail,
} from '../../store/slices/authSlice';
import { validateRegisterInput } from '../../utils/validation';
import LoadingSpinner from '../common/LoadingSpinner';
import Layout from '../layout/MainLayout';
import PasswordInput from '../common/PasswordInput';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    full_name: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isValid, errors } = validateRegisterInput(formData);

    console.log('Form data being sent:', formData);

    if (!isValid) {
      setFormErrors(errors);
      return;
    }
    try {
      await dispatch(registerUser(formData)).unwrap();
      await dispatch(sendVerificationEmail(formData.email)).unwrap();
      toast.success('Đăng ký thành công');
      navigate('/check-email');
    } catch (err) {
      toast.error(err.message || 'Đăng ký thất bại');
      console.error('Register failed:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Đăng ký tài khoản
          </h2>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <input
                type="text"
                name="full_name"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  formErrors.full_name ? 'border-red-500' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Họ và tên"
                value={formData.full_name}
                onChange={handleChange}
              ></input>
              {formErrors.full_name && (
                <p className="mt-1 text-sm text-red-500">
                  {formErrors.full_name}
                </p>
              )}
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                    formErrors.email ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {formErrors.email}
                  </p>
                )}
              </div>
              <div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                    formErrors.username ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="Tên người dùng"
                  value={formData.username}
                  onChange={handleChange}
                />
                {formErrors.username && (
                  <p className="mt-1 text-sm text-red-500">
                    {formErrors.username}
                  </p>
                )}
              </div>
              <PasswordInput
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Mật Khẩu"
                error={formErrors.password}
              />
              <PasswordInput
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Nhập lại mật khẩu"
                error={formErrors.confirmPassword}
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full  flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <LoadingSpinner />
                    <span className="ml-2">Đang đăng ký...</span>
                  </div>
                ) : (
                  'Đăng ký'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};
export default Register;

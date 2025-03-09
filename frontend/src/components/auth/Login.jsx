import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser, googleLogin } from '../../store/slices/authSlice';
import { validateLoginInput } from '../../utils/validation';
import LoadingSpinner from '../common/LoadingSpinner';
import Layout from '../layout/MainLayout';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import PasswordInput from '../common/PasswordInput';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isValid, errors } = validateLoginInput(formData);
    if (!isValid) {
      setFormErrors(errors);
      return;
    }
    try {
      await dispatch(loginUser(formData)).unwrap();
      toast.success('Đăng nhập thành công');
      navigate('/');
    } catch (err) {
      toast.error(
        err.message || 'Đăng nhập thất bại vui lòng kiểm tra lại thông tin'
      );
      console.error('Login failed:', err);
    }
  };
  const handleGoogleLoginSuccess = async (respone) => {
    try {
      await dispatch(googleLogin({ token: respone.credential })).unwrap();
      toast.success('Đăng nhập bằng Google thành công');
      navigate('/');
    } catch (err) {
      toast.error(
        err.message || 'Đăng nhập bằng Google thất bại, vui lòng thử lại !'
      );
      console.log('Google login failed');
    }
  };
  const handleGoogleLoginFailed = () => {
    toast.error('Đăng nhập bằng Google thất bại, vui lòng thử lại!');
  };
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Đăng Nhập
            </h2>
          </div>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
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
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    setFormErrors({ ...formErrors, email: '' });
                  }}
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {formErrors.email}
                  </p>
                )}
              </div>
              <div>
                <PasswordInput
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    setFormErrors({ ...formErrors, password: '' });
                  }}
                  placeholder="Mật Khẩu"
                  error={formErrors.password}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <LoadingSpinner />
                    <span className="ml-2">Đang xử lý...</span>
                  </div>
                ) : (
                  'Đăng nhập'
                )}
              </button>
            </div>
          </form>
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm">
              <Link
                to="/find-account"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Quên tài khoản?
              </Link>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginFailed}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Login;

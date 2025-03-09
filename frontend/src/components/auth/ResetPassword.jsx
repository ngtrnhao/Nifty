import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { resetPassword } from '../../store/slices/authSlice';
import LoadingSpinner from '../common/LoadingSpinner';
import Layout from '../layout/MainLayout';
import PasswordInput from '../common/PasswordInput';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams(); //useParams tự động lấy các giá trị của URL động (id)
  const { loading } = useSelector((state) => state.auth);
  //Trích xuất dữ liệu từ state của auth
  // mỗi khi giá trị thay đổi component sẽ tự động cập nhật lại
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const validateForm = () => {
    const errors = {};
    if (!formData.password) {
      errors.password = 'Mật khẩu không được để trống';
    } else if (formData.password.length > 8) {
      errors.password = 'Mật khẩu phải có ít nhất 8 ký tự';
    }
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Vui lòng nhập lại mật khẩu';
    } else if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = 'Mật khẩu không khớp';
    }
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isValid, errors } = validateForm();
    if (!isValid) {
      setFormErrors(errors);
      return;
    }
    try {
      await dispatch(
        resetPassword({
          userId,
          password: formData.password,
        })
      ).unwrap();
      toast.success('Đặt lại mật khẩu thành công');
      navigate('/login');
    } catch (err) {
      toast.error(err.message || 'Đặt lại mật khẩu thất bại');
    }
  };
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg ">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 ">
            Đặt lại mật khẩu
          </h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y ">
              <div>
                <PasswordInput
                  name="password"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    });
                    setFormErrors({ ...formErrors, password: '' });
                  }}
                  placeholder="Mật khẩu mới"
                  error={formErrors.password}
                />
              </div>
              <div>
                <PasswordInput
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    });
                    setFormErrors({ ...formErrors, confirmPassword: '' });
                  }}
                  placeholder="Nhập lại mật khẩu mới"
                  error={formErrors.confirmPassword}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <LoadingSpinner />
                    <span className="ml-2">Đang xử lý...</span>
                  </div>
                ) : (
                  'Đặt lại mật khẩu'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};
export default ResetPassword;

import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { sendVerificationEmail } from '../../store/slices/authSlice';
import Layout from '../layout/MainLayout';
import LoadingSpinner from '../common/LoadingSpinner';
const CheckEmail = () => {
  const dispatch = useDispatch();
  const { loading, email } = useSelector((state) => state.auth);
  const handleResend = async () => {
    try {
      await dispatch(sendVerificationEmail(email)).unwrap();
      toast.success('Đã gửi lại email xác thực');
    } catch (err) {
      toast.error('Gửi email thất bại, vui lòng thử lại');
    }
  };
  if (loading) return <LoadingSpinner />;
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-4">
            Kiểm tra email của bạn
          </h2>
          <p className="text-gray-600 text-center mb-4">
            Chúng tôi đã gửi email xác thực đến {email}. Vui lòng kiểm tra và
            click vào link trong email.
          </p>
          <button
            onClick={handleResend}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Gửi lại email xác thực
          </button>
        </div>
      </div>
    </Layout>
  );
};
export default CheckEmail;

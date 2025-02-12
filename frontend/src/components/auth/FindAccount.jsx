import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { findAccount } from '../../store/slices/authSlice';
import { validateEmail } from '../../utils/validation';
import LoadingSpinner from '../common/LoadingSpinner';
import Layout from '../layout/MainLayout';

const FindAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, foundAccount } = useSelector((state) => state.auth);

  const [searchInput, setSearchInput] = useState('');
  const [step, setStep] = useState(1);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!validateEmail(searchInput)) {
      toast.error('Email không hợp lệ');
      return;
    }

    try {
      await dispatch(findAccount(searchInput)).unwrap();
      setStep(2);
    } catch (err) {
      toast.error(err.message || 'Không tìm thấy tài khoản trùng khớp.');
    }
  };

  const handleContinue = () => {
    if (foundAccount?.user?._id) {
      navigate(`/reset-password/${foundAccount.user._id}`);
    }
  };

  const handleTryAgain = () => {
    setStep(1);
    setSearchInput('');
  };

  if (step === 2 && foundAccount?.user) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full space-y-6 p-8 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-center text-gray-900">
              Tài khoản đã được tìm thấy
            </h2>
            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-600">
                    {foundAccount.user.name?.charAt(0)?.toUpperCase() || '?'}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {foundAccount.user.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {foundAccount.user.email}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <button
                onClick={handleContinue}
                className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Tiếp tục
              </button>
              <button
                onClick={handleTryAgain}
                className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Thử lại với email khác
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg ">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Tìm tài khoản
          </h2>
          {error && (
            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <h2 className="text-left">
            Vui lòng nhập email để tìm kiếm tài khoản của bạn
          </h2>
          <form className="mt-8 space-y-6" onSubmit={handleSearch}>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Nhập email của bạn"
              />
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <LoadingSpinner />
                    <span className="ml-2">Đang tìm kiếm...</span>
                  </div>
                ) : (
                  'Tìm kiếm'
                )}
              </button>
              <Link
                to="/login"
                className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-center"
              >
                Hủy
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default FindAccount;

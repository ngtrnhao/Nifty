import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { verifyEmail } from '../../store/slices/authSlice';
import LoadingSpinner from '../common/LoadingSpinner';
import { toast } from 'react-toastify';

const EmailVerification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const { loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(verifyEmail(token))
        .unwrap()
        .then(() => {
          toast.success('Email đã được xác thực thành công');
          navigate('/login');
        })
        .catch((err) => {
          toast.error('Xác thực email thất bại');
        });
    }
  }, [token, dispatch, navigate]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">
          Đang xác thực email...
        </h2>
      </div>
    </div>
  );
};
export default EmailVerification;

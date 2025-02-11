import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logout } from '../../store/slices/authSlice';
import Logo from '../common/LogoNifty';

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Đã đăng xuất');
  };
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/*Logo*/}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="transform transition-transform duration-300 ease-in-out hover:scale-110">
              <Logo />
            </div>
            <span className="text-xl font-bold tracking-wider bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">
              NIFTY
            </span>
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-gray-700">Xin chào, {user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="py-2 px-4  bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="py-2 px-4 text-gray-700 hover:text-gray-900"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;

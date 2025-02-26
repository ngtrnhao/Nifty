import { createBrowserRouter } from 'react-router-dom';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import FindAccount from '../components/auth/FindAccount';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import ResetPassword from '../components/auth/ResetPassword';
import EmailVerication from '../components/auth/EmailVerification';
import CheckEmail from '../components/auth/CheckEmail';
import Home from '../pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/find-account',
    element: <FindAccount />,
  },
  {
    path: '/reset-password/:userId',
    element: <ResetPassword />,
  },
  {
    path: '/verify-email/:token',
    element: <EmailVerication />,
  },
  {
    path: '/check-email',
    element: <CheckEmail />,
  },
]);

export default router;

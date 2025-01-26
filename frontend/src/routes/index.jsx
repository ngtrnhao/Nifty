import { createBrowserRouter } from 'react-router-dom';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import ProtectedRoute from '../components/auth/ProtectedRoute';
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
]);

export default router;

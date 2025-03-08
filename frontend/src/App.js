import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import router from './routes';
import { store } from './store/slices';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId="608094057510-ja4in53c9k5vj3uumeakm828lu0lgdfr.apps.googleusercontent.com">
      <Provider store={store}>
        <RouterProvider router={router} />
        <ToastContainer position="top-right" autoClose={3000} />
      </Provider>
    </GoogleOAuthProvider>
  );
}

export default App;

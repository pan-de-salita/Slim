import { Navigate, createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Client from './pages/Client';
import { REQUEST_HEADERS, getRequestHeaders } from './utils/requestHeadersFunctions';
import { ReactNode } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { handleListAllUsers } from './adapters/api/apiCallGet';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  return REQUEST_HEADERS || getRequestHeaders() ? children : <Navigate to='/' replace={true} />;
};

const Router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <Login />
      </AuthProvider>
    ),
  },
  {
    path: '/client',
    element: (
      <PrivateRoute>
        <Client />
      </PrivateRoute>
    ),
    loader: async () => {
      return handleListAllUsers();
    },
    children: [

    ],
  },
]);

export default Router; 

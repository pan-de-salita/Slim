import { Navigate, createBrowserRouter, defer } from 'react-router-dom';
import Login from './pages/Login';
import Client from './pages/Client';
import { getRequestHeaders } from './utils/requestHeadersFunctions';
import { ReactNode } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { handleListAllUsers } from './adapters/api/apiCallGet';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  return getRequestHeaders() ? children : <Navigate to='/' replace={true} />;
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
    id: 'client',
    loader: async () => {
      return defer({ allUsers: handleListAllUsers() });
    },
    children: [

    ],
  },
]);

export default Router; 

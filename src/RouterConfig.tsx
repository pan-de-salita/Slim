import { Navigate, createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Client from './pages/Client';
import { requestHeaders } from './utils/requestHeadersFunctions';
import { ReactNode } from 'react';
import { AuthProvider } from './contexts/AuthContext';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  return requestHeaders() ? children : <Navigate to='/' replace={true} />;
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
    children: [

    ],
  },
]);

export default Router; 

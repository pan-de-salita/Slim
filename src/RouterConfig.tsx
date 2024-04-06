import { Navigate, createBrowserRouter } from 'react-router-dom';

import Login from './pages/Login';
import Client from './pages/Client';
import { requestHeaders } from './utils/requestHeadersFunctions';
import { ReactNode } from 'react';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const requestHeadersFromStorage = requestHeaders();
  return requestHeadersFromStorage ? children : <Navigate to='/' replace={true} />;
};

const LoggedInRoute = ({ children }: { children: ReactNode }) => {
  const requestHeadersFromStorage = requestHeaders();
  return requestHeadersFromStorage ? <Navigate to='/client' replace={true} /> : children;
};

const Router = createBrowserRouter([
  {
    path: '/',
    element: (
      <LoggedInRoute>
        <Login />
      </LoggedInRoute>
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

import { createBrowserRouter } from 'react-router-dom';

import Login from './pages/Login';
import Client from './pages/Client';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/client',
    element: <Client />,
  },
]);

export default Router; 

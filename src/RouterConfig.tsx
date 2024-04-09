import { createBrowserRouter, defer } from 'react-router-dom';
import Login from './pages/Login';
import Client from './pages/Client';
import { AuthProvider } from './contexts/AuthContext';
import { handleListAllUsers } from './adapters/api/apiCallGet';
import { SearchUsersContextProvider } from './contexts/SearchUsersContext';

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
      <SearchUsersContextProvider>
        <Client />
      </SearchUsersContextProvider>
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

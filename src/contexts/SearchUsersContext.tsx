import { Suspense, createContext, useContext } from 'react';
import { Await, Navigate, useRouteLoaderData } from 'react-router-dom';
import { User } from '../types/userType';
import LoadingUsers from '../pages/LoadingUsers';

export const SearchUsersContext = createContext<User[]>([]);

export const useSeachUsersContext = () => {
  const context = useContext(SearchUsersContext);
  return context;
};

export const SearchUsersContextProvider = ({ children }: { children: React.ReactNode }) => {
  const routeData = useRouteLoaderData('client') as { allUsers: { data: User[] } };
  const allUsers = routeData.allUsers;

  return (
    <Suspense fallback={<LoadingUsers />}>
      <Await
        resolve={allUsers}
        errorElement={<Navigate to='/' replace={true} />}
        children={(resolvedUsers) => {
          return (
            <SearchUsersContext.Provider value={resolvedUsers.data}>
              {children}
            </SearchUsersContext.Provider>
          );
        }}
      />
    </Suspense >
  );
};

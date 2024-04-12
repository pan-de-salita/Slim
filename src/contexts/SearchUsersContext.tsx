import { Suspense, createContext, useContext, useMemo, useState } from 'react';
import { Await, Navigate, useRouteLoaderData } from 'react-router-dom';
import { User } from '../types/userType';
import LoadingUsers from '../pages/LoadingUsers';
import { Channel } from '../types/Channel';
import { handleListAllChannels } from '../adapters/api/apiCallGet';

export const SearchUsersContext = createContext<{
  users: { data: User[] },
  channels: { data: Channel[] },
  updateChannels: () => void,
}>({
  users: { data: [] },
  channels: { data: [] },
  updateChannels: () => { },
});

export const useSeachUsersContext = () => {
  const context = useContext(SearchUsersContext);
  return context;
};

export const SearchUsersContextProvider = ({ children }: { children: React.ReactNode }) => {
  const routeData = useRouteLoaderData('client') as { allUsers: { data: User[] }, allChannels: { data: Channel[] } };
  const allUsers = routeData.allUsers;
  const allChannels = routeData.allChannels;
  const combinedRouteData = useMemo(() => Promise.all([allUsers, allChannels]), [allUsers, allChannels]);
  const [newChannels, setNewChannels] = useState(null);

  const updateChannels = async () => {
    const updatedChannels = await handleListAllChannels();
    if (updatedChannels instanceof Error) {
      console.error('Failed to update channels:', updatedChannels);
    } else {
      setNewChannels(updatedChannels);
    }
  };

  return (
    <Suspense fallback={<LoadingUsers />}>
      <Await
        resolve={combinedRouteData}
        errorElement={<Navigate to='/' replace={true} />}
        children={(resolvedData) => {
          const [users, channels] = resolvedData;

          return (
            <SearchUsersContext.Provider value={{ users, channels: newChannels || channels, updateChannels }}>
              {children}
            </SearchUsersContext.Provider>
          );
        }}
      />
    </Suspense >
  );
};

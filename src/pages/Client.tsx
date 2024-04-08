import { Suspense, useEffect } from "react";
import { Await, useNavigation, useRouteLoaderData } from "react-router-dom";
import { User } from "../types/userType";
import LoadingUsers from "./LoadingUsers";

const Client = () => {
  const routeData = useRouteLoaderData('client') as { allUsers: { data: User[] } };
  const allUsers = routeData.allUsers;

  return (
    <Suspense fallback={<LoadingUsers />}>
      <Await
        resolve={allUsers}
        errorElement={<div>Error loading users!</div>}
        children={(resolvedUsers) => (
          <div>
            {resolvedUsers.data.map((user: User) => (
              <div key={user.id}>{user.email}</div>
            ))}
          </div>
        )}
      />
    </Suspense>
  );
};

export default Client;

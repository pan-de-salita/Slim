import Logo from "../components/loginComponents/Logo";
import LoadingUsersHeader from '../components/loadingUsersComponents/LoadingUsersHeader';
import LoadingUsersMain from "../components/loadingUsersComponents/LoadingUsersMain";
import LoadingUsersMessage from "../components/loadingUsersComponents/LoadingUsersMessage";
import LoadingUsersSpinner from "../components/loadingUsersComponents/LoadingUsersSpinner";

const LoadingUsers = () => {
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-between'>
      <div className='w-full flex flex-col items-center'>
        <LoadingUsersHeader>
          <Logo />
        </LoadingUsersHeader>
        <LoadingUsersMain>
          <LoadingUsersSpinner />
          <LoadingUsersMessage />
        </LoadingUsersMain>
      </div>
    </div>
  );
};

export default LoadingUsers;

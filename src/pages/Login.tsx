import LoginFooter from '../components/LoginFooter';
import LoginHeader from '../components/LoginHeader';
import LoginMain from '../components/LoginMain'

const Login = () => {
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-between'>
      <div className='w-full flex flex-col items-center'>
        <LoginHeader />
        <LoginMain />
      </div>
      <LoginFooter />
    </div>
  );
};

export default Login;

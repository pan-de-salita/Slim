import { useState } from 'react';
import LoginFooter from '../components/init/LoginFooter';
import LoginHeader from '../components/init/LoginHeader';
import LoginMain from '../components/init/LoginMain'
import SignupTop from '../components/init/SignupTop';
import Logo from '../components/init/Logo';
import LoginHero from '../components/init/LoginHero';
import LoginForm from '../components/init/LoginForm';
import SignupBottom from '../components/init/SignupBottom';
import InsecureContentInstructions from '../components/init/InsecureContentInstructions';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const setIsLoginToggle = () => {
    setIsLogin(prev => !prev);
  };

  return (
    <div className='w-screen h-screen flex flex-col items-center justify-between'>
      <div className='w-full flex flex-col items-center'>
        <LoginHeader>
          <Logo />
          <SignupTop toggleIsLogin={setIsLoginToggle} isLoginText={isLogin} />
        </LoginHeader>
        <LoginMain>
          <LoginHero isLoginText={isLogin} />
          <LoginForm toggleIsLogin={setIsLoginToggle} isLoginFields={isLogin} />
          <InsecureContentInstructions />
          <SignupBottom toggleIsLogin={setIsLoginToggle} isLoginText={isLogin} />
        </ LoginMain>
      </div>
      <LoginFooter />
    </div>
  );
};

export default Login;

import { useState } from 'react';
import LoginFooter from '../components/LoginFooter';
import LoginHeader from '../components/LoginHeader';
import LoginMain from '../components/LoginMain'
import SignupTop from '../components/SignupTop';
import Logo from '../components/Logo';
import LoginHero from '../components/LoginHero';
import LoginForm from '../components/LoginForm';
import SignupBottom from '../components/SignupBottom';
import InsecureContentInstructions from '../components/InsecureContentInstructions';

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
          <LoginForm isLoginFields={isLogin} />
          <InsecureContentInstructions />
          <SignupBottom toggleIsLogin={setIsLoginToggle} isLoginText={isLogin} />
        </ LoginMain>
      </div>
      <LoginFooter />
    </div>
  );
};

export default Login;

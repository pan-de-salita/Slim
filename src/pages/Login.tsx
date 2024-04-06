import { useState } from 'react';
import LoginFooter from '../components/loginComponents/LoginFooter';
import LoginHeader from '../components/loginComponents/LoginHeader';
import LoginMain from '../components/loginComponents/LoginMain'
import SignupTop from '../components/loginComponents/SignupTop';
import Logo from '../components/loginComponents/Logo';
import LoginHero from '../components/loginComponents/LoginHero';
import LoginForm from '../components/loginComponents/LoginForm';
import SignupBottom from '../components/loginComponents/SignupBottom';
import InsecureContentInstructions from '../components/loginComponents/InsecureContentInstructions';

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

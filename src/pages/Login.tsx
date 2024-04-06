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
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-between'>
      <div className='w-full flex flex-col items-center'>
        <LoginHeader>
          <Logo />
          <SignupTop />
        </LoginHeader>
        <LoginMain>
          <LoginHero />
          <LoginForm />
          <InsecureContentInstructions />
          <SignupBottom />
        </ LoginMain>
      </div>
      <LoginFooter />
    </div>
  );
};

export default Login;

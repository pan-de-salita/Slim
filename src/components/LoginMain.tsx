import LoginHero from './LoginHero';
import LoginForm from './LoginForm';
import SignupBottom from './SignupBottom';
import InsecureContentInstructions from './InsecureContentInstructions';

const LoginMain = () => {
  return (
    <main className='w-full max-w-[800px] flex flex-col justify-center items-center' >
      <LoginHero />
      <LoginForm />
      <InsecureContentInstructions />
      <SignupBottom />
    </main >
  );
};

export default LoginMain;

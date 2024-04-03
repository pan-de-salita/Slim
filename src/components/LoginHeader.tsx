import Logo from './Logo.tsx';
import SignupTop from './SignupTop.tsx';

const LoginHeader = () => {
  return (
    <header className='w-full h-[126.133px] grid grid-cols-3 items-center pb-10 pt-10'>
      <div className='col-start-1 col-end-2'></div>
      <Logo />
      <SignupTop />
    </header>
  );
};

export default LoginHeader;

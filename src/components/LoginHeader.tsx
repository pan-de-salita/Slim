import Logo from './Logo.tsx';
import SignUpTop from './SignUpTop.tsx';

const LoginHeader = () => {
  return (
    <header className='w-full h-[126.133px] grid grid-cols-3 items-center pb-10 pt-10'>
      <div className='col-start-1 col-end-2'></div>
      <Logo />
      <SignUpTop />
    </header>
  );
};

export default LoginHeader;

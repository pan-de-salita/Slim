import { useAuth } from "../../contexts/AuthContext";

const LoginHero = () => {
  const { isLogin } = useAuth();

  return (
    <>
      <h1 className='text-[2.688rem] md:text-[2.813rem] lg:text-[2.813rem] font-black mb-[0.625rem] text-center text-[#1d1c1d]' >
        <span>
          {isLogin ? 'Log in' : 'Sign up'}
        </span>
        &nbsp;for Slack with
        <br />
        <span className={`${isLogin ? 'text-[#7db643]' : 'text-[#45c0f1]'}`}>&nbsp;minimal&nbsp;</span>
        functionality
      </h1>
      <div className='mb-[2rem] text-[#454245]'>
        <span className='font-bold'>Workspace:&nbsp;</span>
        <span>http://206.189.91.54/api/v1</span>
      </div>
    </>
  );
};

export default LoginHero;

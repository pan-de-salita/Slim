const SignupTop = (
  { toggleIsLogin, isLoginText }: { toggleIsLogin: () => void, isLoginText: boolean }
) => {
  return (
    <div className='col-start-3 col-end-4 hidden md:flex lg:flex flex-col justify-end items-end pr-[40px] self-end' >
      <span className='text-sm text-[#616061]'>
        {isLoginText ? "Don't have an account yet?" : "Already have an account?"}
      </span>
      <br />
      <button onClick={toggleIsLogin} className='text-sm text-[#1a69a6] font-bold'>
        {isLoginText ? 'Create an account' : 'Log in'}
      </button>
    </div >
  );
};

export default SignupTop;

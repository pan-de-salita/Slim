const SignupTop = (
  { toggleIsLogin, isLoginText }: { toggleIsLogin: () => void, isLoginText: boolean }
) => {
  return (
    <div className='col-start-3 col-end-4 hidden md:flex lg:flex flex-col justify-center items-end pr-[40px] self-end' >
      <span className='text-sm text-[#616061]'>
        {isLoginText ? "Don't have an account yet?" : "Already have an account?"}
      </span>
      <button onClick={toggleIsLogin} className='text-sm text-[#1a69a6] font-bold hover:underline'>
        {isLoginText ? 'Create an account' : 'Log in instead'}
      </button>
    </div >
  );
};

export default SignupTop;

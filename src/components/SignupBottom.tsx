const SignupBottom = (
  { toggleIsLogin, isLoginText }: { toggleIsLogin: () => void, isLoginText: boolean }
) => {
  return (
    <div className='col-start-3 col-end-4 flex md:hidden lg:hidden flex-col justify-center items-center py-[20px]'>
      <span className='text-sm text-[#616061]'>
        {isLoginText ? "Don't have an account yet?" : "Already have an account?"}
      </span>
      <br />
      <button onClick={toggleIsLogin} className='text-sm text-[#1a69a6] font-bold hover:underline'>
        {isLoginText ? 'Create an account' : 'Log in'}
      </button>
    </div>
  );
};

export default SignupBottom;
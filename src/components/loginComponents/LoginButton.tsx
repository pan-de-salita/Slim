const LoginButton = ({ onIsLoginFields }: { onIsLoginFields: boolean }) => {
  return (
    <button
      type='submit'
      className={`w-full h-[2.75rem] pb-[0.188rem] text-lg font-bold rounded-md text-white mb-[1.25rem] ${onIsLoginFields ? `bg-[#7db643] hover:bg-[#649135]` : `bg-[#45c0f1] hover:bg-[#3799c0]`} transition-all duration-100`}>
      {onIsLoginFields ? 'Log in via Email' : 'Sign Up'}
    </button>
  );
};

export default LoginButton;

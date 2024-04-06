import { useAuth } from "../../contexts/AuthContext";

const SignupBottom = () => {
  const { isLogin, toggleIsLogin } = useAuth();
  return (
    <div className='col-start-3 col-end-4 flex md:hidden lg:hidden flex-col justify-center items-center py-[20px]'>
      <span className='text-sm text-[#616061]'>
        {isLogin ? "Don't have an account yet?" : "Already have an account?"}
      </span>
      <button onClick={toggleIsLogin} className='text-sm text-[#1a69a6] font-bold hover:underline'>
        {isLogin ? 'Create an account' : 'Log in instead'}
      </button>
    </div>
  );
};

export default SignupBottom;

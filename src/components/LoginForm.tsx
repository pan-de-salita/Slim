import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { handleLogin, handleSignup } from '../utils/ApiCallPost';
import { LoginFail, LoginFormData, LoginSuccess, isLoginSuccess } from '../utils/types/apiCallTypes';
import { loginFields, signupFields } from '../utils/constants';
import LoginFormFields from './LoginFormFields';
import { Navigate, useNavigate } from 'react-router-dom';

const LoginForm = ({ isLoginFields }: { isLoginFields: boolean }) => {
  const [fields, setFields] = useState(loginFields);
  const { register, handleSubmit, reset } = useForm<LoginFormData>();
  const navigate = useNavigate();

  useEffect(() => {
    setFields(() => {
      return isLoginFields === true ? loginFields : signupFields;
    });
  }, [isLoginFields]);

  const submission = async (data: LoginFormData) => {
    if (isLoginFields) {
      const loginAttempt = await handleLogin(data) as Promise<LoginSuccess | LoginFail | Error>;

      if (isLoginSuccess(loginAttempt)) {
        navigate('/client');
      } else {
        console.log('fail')
      }
    } else {

    }
  }

  return (
    <form onSubmit={handleSubmit(submission)}
      className='w-[90%] md:w-[400px] lg:w-[400px] max-w-[400px] h-full flex flex-col gap-5'>
      <LoginFormFields formRegister={register} formFields={fields} />
      <button
        type='submit'
        className={`w-full h-[44px] pb-[3px] text-lg font-bold rounded-md text-white mb-[20px] ${isLoginFields ? `bg-[#7db643] hover:bg-[#649135]` : `bg-[#45c0f1] hover:bg-[#3799c0]`} transition-all duration-100`}>
        {isLoginFields ? 'Log in via Email' : 'Sign Up'}
      </button>
    </form >
  );
};

export default LoginForm;

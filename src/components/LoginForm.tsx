import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { handleLogin, handleSignup } from '../utils/ApiCallPost';
import { LoginFormData } from '../utils/types/loginFormData';
import { LoginSuccess, isLoginSuccess, LoginFail } from '../utils/types/loginAttemptTypes';
import { loginFields, signupFields } from '../utils/constants';
import LoginFormFields from './LoginFormFields';
import { useNavigate } from 'react-router-dom';
import { toastError, toastSuccess } from '../utils/toasts';
import { SignupResponse, isSignupResponse } from '../utils/types/signupAttemptTypes';
import hasErrors from '../utils/types/hasErrors';

const LoginForm = ({ isLoginFields }: { isLoginFields: boolean }) => {
  const [fields, setFields] = useState(loginFields);
  const { register, handleSubmit, reset } = useForm<LoginFormData>();
  const navigate = useNavigate();

  useEffect(() => {
    setFields(() => {
      return isLoginFields === true ? loginFields : signupFields;
    });
  }, [isLoginFields]);

  const handleSubmission = async (data: LoginFormData) => {
    try {
      const attempt = isLoginFields
        ? await handleLogin(data) as Promise<LoginSuccess | LoginFail | Error>
        : await handleSignup(data) as Promise<SignupResponse | Error>;

      if (isLoginFields) {
        if (isLoginSuccess(attempt)) {
          navigate('/client');
          toastSuccess(`Welcome back, ${attempt.data.uid}.`);
          reset();
        } else {
          toastError('Invalid login credentials.');
        }
      } else {
        if (isSignupResponse(attempt) && attempt.status === 'success') {
          toastSuccess("You've successfully created an account. Try logging in.");
          reset();
        } else if (hasErrors(attempt)) {
          toastError(`Error: ${attempt.errors.full_messages.join('. ')}.`);
        }
      }
    } catch (error) {
      console.error(error);
      toastError('An unexpected error occurred.');
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSubmission)}
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

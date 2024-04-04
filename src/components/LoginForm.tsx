import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { handleLogin, handleSignup } from '../utils/ApiCallPost';
import { LoginFormData } from '../utils/types/loginFormData';
import { LoginSuccess, LoginFail, isLoginSuccess, isLoginFail } from '../utils/types/loginAttemptTypes';
import { loginFields, signupFields } from '../utils/constants';
import LoginFormFields from './LoginFormFields';
import { toastError } from '../utils/toasts';
import { SignupResponse, isSignupResponse } from '../utils/types/signupResponse';
import { handleLoginAttempt, handleSignupAttempt } from '../utils/handleSubmissionHelpers';
import signupValidationSchema from '../utils/signupValidationSchema';

const LoginForm = ({ isLoginFields }: { isLoginFields: boolean }) => {
  const [fields, setFields] = useState(loginFields);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    // NOTE: form validation only occurs for signups.
    // presumably, a user with an account would have
    // knowledge of what to input to access their account.
    resolver: yupResolver(signupValidationSchema),
    mode: 'onBlur',
  });

  useEffect(() => {
    setFields(() => {
      return isLoginFields === true ? loginFields : signupFields;
    });
    reset();
  }, [isLoginFields]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      const attempt = isLoginFields
        ? await handleLogin(data) as Promise<LoginSuccess | LoginFail | Error>
        : await handleSignup(data) as Promise<SignupResponse | Error>;

      if (isLoginFields && (isLoginSuccess(attempt) || isLoginFail(attempt))) {
        handleLoginAttempt(attempt, navigate, reset);
      } else if (isSignupResponse(attempt)) {
        handleSignupAttempt(attempt, reset);
      }
    } catch (error) {
      toastError('An unexpected error occurred.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}
      className='w-[90%] md:w-[400px] lg:w-[400px] max-w-[400px] h-full flex flex-col gap-5'>
      {
        isLoginFields
          ? <LoginFormFields formRegister={register} formFields={fields} />
          : <LoginFormFields formRegister={register} formFields={fields} formErrors={errors} />
      }
      <button
        type='submit'
        className={`w-full h-[44px] pb-[3px] text-lg font-bold rounded-md text-white mb-[20px] ${isLoginFields ? `bg-[#7db643] hover:bg-[#649135]` : `bg-[#45c0f1] hover:bg-[#3799c0]`} transition-all duration-100`}>
        {isLoginFields ? 'Log in via Email' : 'Sign Up'}
      </button>
    </form >
  );
};

export default LoginForm;

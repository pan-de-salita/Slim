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
import LoginButton from './LoginButton';

const LoginForm = (
  { toggleIsLogin, isLoginFields }: { toggleIsLogin: () => void, isLoginFields: boolean }) => {
  const [fields, setFields] = useState(loginFields);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: !isLoginFields ? yupResolver(signupValidationSchema) : undefined,
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
        handleSignupAttempt(attempt, toggleIsLogin, reset);
      }
    } catch (error) {
      toastError('An unexpected error occurred. Try again.');
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
      <LoginButton onIsLoginFields={isLoginFields} />
    </form >
  );
};

export default LoginForm;

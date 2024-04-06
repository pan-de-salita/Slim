import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginFormData } from '../../types/loginFormData';
import { LoginSuccess, LoginFail, isLoginSuccess, isLoginFail } from '../../types/loginAttemptTypes';
import { LOGIN_FIELDS, SIGNUP_FIELDS } from '../../constants/formConstants';
import LoginFormFields from './LoginFormFields';
import { toastError } from '../../utils/toasts';
import { SignupResponse, isSignupResponse } from '../../types/signupResponse';
import { handleLoginAttempt, handleSignupAttempt } from '../../utils/handleSubmissionHelpers';
import signupValidationSchema from '../../utils/signupValidationSchema';
import LoginButton from './LoginButton';
import { handleLogin, handleSignup } from '../../adapters/fetch/apiCallPost';
import { useAuth } from '../../contexts/AuthContext';

const LoginForm = () => {
  const { isLogin, toggleIsLogin } = useAuth();
  const [fields, setFields] = useState(LOGIN_FIELDS);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: !isLogin ? yupResolver(signupValidationSchema) : undefined,
    mode: 'onBlur',
  });

  useEffect(() => {
    setFields(() => {
      return isLogin === true ? LOGIN_FIELDS : SIGNUP_FIELDS;
    });
    reset();
  }, [isLogin]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      const attempt = isLogin
        ? await handleLogin(data) as Promise<LoginSuccess | LoginFail | Error>
        : await handleSignup(data) as Promise<SignupResponse | Error>;

      if (isLogin && (isLoginSuccess(attempt) || isLoginFail(attempt))) {
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
      className='w-[90%] md:w-[400px] lg:w-[400px] max-w-[400px] h-full flex flex-col gap-5' >
      {
        isLogin
          ? <LoginFormFields formRegister={register} formFields={fields} />
          : <LoginFormFields formRegister={register} formFields={fields} formErrors={errors} />
      }
      <LoginButton onIsLoginFields={isLogin} />
    </form >
  );
};

export default LoginForm;

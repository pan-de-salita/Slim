import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginFormData } from '../../types/loginFormData';
import { LoginSuccess, LoginFail } from '../../types/loginAttemptTypes';
import LoginFormFields from './LoginFormFields';
import { toastError } from '../../utils/toasts';
import { SignupResponse, isSignupResponse } from '../../types/signupResponse';
import { handleLoginAttempt, handleSignupAttempt } from '../../utils/handleSubmissionHelpers';
import signupValidationSchema from '../../utils/signupValidationSchema';
import LoginButton from './LoginButton';
import { handleLogin, handleSignup } from '../../adapters/api/apiCallPost';
import { useAuth } from '../../contexts/AuthContext';

const LOGIN_FIELDS = ['email', 'password'];
const SIGNUP_FIELDS = ['email', 'password', 'password_confirmation'];

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
        ? await handleLogin(data)
        : await handleSignup(data);

      if (isLogin) {
        handleLoginAttempt(data.email, attempt as LoginSuccess | LoginFail | Error, navigate, reset);
      } else if (isSignupResponse(attempt)) {
        handleSignupAttempt(attempt as SignupResponse | Error, toggleIsLogin, reset);
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
          ? <LoginFormFields
            formRegister={register}
            formFields={fields} />
          : <LoginFormFields
            formRegister={register}
            formFields={fields}
            formErrors={errors} />
      }
      <LoginButton onIsLoginFields={isLogin} />
    </form >
  );
};

export default LoginForm;

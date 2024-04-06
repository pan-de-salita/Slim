import { LoginFormData } from '../../types/loginFormData';
import { LoginSuccess, LoginFail } from '../../types/loginAttemptTypes';
import { SubmitHandler } from 'react-hook-form';
import { LOGIN_URL_ENDPOINT, SIGNUP_URL_ENDPOINT } from '../../constants/apiConstants';
import { SignupResponse } from '../../types/signupResponse';
import { fetchRequestHeaders } from '../../utils/requestHeadersFunctions';

export const handleLogin: SubmitHandler<LoginFormData> = async (loginData: LoginFormData): Promise<LoginSuccess | LoginFail | Error> => {
      try {
            const response = await fetch(LOGIN_URL_ENDPOINT, {
                  method: 'POST',
                  body: JSON.stringify({ ...loginData }),
                  headers: {
                        'Content-Type': 'application/json',
                  },
            });
            fetchRequestHeaders(response);
            const data = await response.json();
            return data;
      } catch (error) {
            return error as Error;
      }
};

export const handleSignup: SubmitHandler<LoginFormData> = async (signupData: LoginFormData): Promise<SignupResponse | Error> => {
      try {
            const response = await fetch(SIGNUP_URL_ENDPOINT, {
                  method: 'POST',
                  body: JSON.stringify({ ...signupData }),
                  headers: {
                        'Content-Type': 'application/json',
                  },
            });
            const data = await response.json();
            return data;
      } catch (error) {
            return error as Error;
      }
};

import { LoginFormData } from '../utils/types/loginFormData';
import { LoginSuccess, LoginFail } from '../utils/types/loginAttemptTypes';
import { API } from './constants';
import { SubmitHandler } from 'react-hook-form';
import { SignupResponse } from './types/signupAttemptTypes';

export const handleLogin: SubmitHandler<LoginFormData> = async (loginData: LoginFormData): Promise<LoginSuccess | LoginFail | Error> => {
      try {
            const data = await fetch(`${API}/auth/sign_in`, {
                  method: 'POST',
                  body: JSON.stringify({ ...loginData }),
                  headers: {
                        'Content-Type': 'application/json',
                  },
            });
            const response = await data.json();
            return response;
      } catch (error) {
            return error as Error;
      }
};

export const handleSignup: SubmitHandler<LoginFormData> = async (signupData: LoginFormData): Promise<SignupResponse | Error> => {
      try {
            const data = await fetch(`${API}/auth/`, {
                  method: 'POST',
                  body: JSON.stringify({ ...signupData }),
                  headers: {
                        'Content-Type': 'application/json',
                  },
            });
            const response = await data.json();
            return response;
      } catch (error) {
            return error as Error;
      }
};


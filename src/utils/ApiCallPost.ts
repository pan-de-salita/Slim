import { LoginFormData } from './types/ApiCallTypes';
import { API } from './constants';
import { SubmitHandler } from 'react-hook-form';

export const handleLogin: SubmitHandler<LoginFormData> = async (loginData: LoginFormData) => {
      try {
            const data = await fetch(`${API}/auth/sign_in`, {
                  method: 'POST',
                  body: JSON.stringify({ ...loginData }),
                  headers: {
                        'Content-Type': 'application/json',
                  },
            });
            const response = await data.json();
            console.log(response);
      } catch (error) {
            console.log(error);
      }
};

export const handleSignup: SubmitHandler<LoginFormData> = async (signupData: LoginFormData) => {
      try {
            const data = await fetch(`${API}/auth/`, {
                  method: 'POST',
                  body: JSON.stringify({ ...signupData }),
                  headers: {
                        'Content-Type': 'application/json',
                  },
            });
            const response = await data.json();
            console.log(response);
      } catch (error) {
            console.log(error);
      }
};


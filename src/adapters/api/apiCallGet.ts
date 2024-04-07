import { LoginFormData } from '../../types/loginFormData';
import { SubmitHandler } from 'react-hook-form';
import { LIST_ALL_USERS_URL_ENDPOINT, SIGNUP_URL_ENDPOINT } from '../../constants/apiConstants';
import { SignupResponse } from '../../types/signupResponse';
import { REQUEST_HEADERS } from '../../utils/requestHeadersFunctions';

export const handleListAllUsers = async () => {
      try {
            if (REQUEST_HEADERS) {
                  const response = await fetch(LIST_ALL_USERS_URL_ENDPOINT, {
                        method: 'GET',
                        headers: {
                              'Content-Type': 'application/json',
                              ...REQUEST_HEADERS,
                        },
                  });

                  const data = await response.json();
                  return data;
            }
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

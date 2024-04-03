import { SubmitHandler } from 'react-hook-form';
import { LoginFormData } from './types/ApiCallTypes';

export const onLoginAttempt: SubmitHandler<LoginFormData> = async (
      { email, password }: { email: string, password: string }
) => {
      try {
            const data = await fetch('http://206.189.91.54/api/v1/auth/sign_in', {
                  method: 'POST',
                  body: JSON.stringify({
                        email: email,
                        password: password,
                  }),
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


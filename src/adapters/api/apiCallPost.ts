import { LoginFormData } from '../../types/loginFormData';
import { LoginSuccess, LoginFail } from '../../types/loginAttemptTypes';
import { SubmitHandler } from 'react-hook-form';
import { BASE_API_URL, LOGIN_URL_ENDPOINT, SEND_MESSAGE_URL_ENDPOINT, SIGNUP_URL_ENDPOINT } from '../../constants/apiConstants';
import { SignupResponse } from '../../types/signupResponse';
import { fetchRequestHeaders, getRequestHeaders } from '../../utils/requestHeadersFunctions';
import { storeInLocalStorage } from '../../utils/localStorageFunctions';
import { SendMessageRequestBody } from '../../types/apiRequestBodyTypes';

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
        storeInLocalStorage('id', data.data.id);
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

export const handleSendMessage = async (requestBody: SendMessageRequestBody) => {
    console.log('attempting to send message')
    try {
        const response = await fetch(SEND_MESSAGE_URL_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify({ ...requestBody }),
            headers: {
                'Content-Type': 'application/json',
                ...getRequestHeaders(),
            },
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        return error as Error;
    }
};

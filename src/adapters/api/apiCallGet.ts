import { LIST_ALL_CHANNELS_URL_ENDPOINT, LIST_ALL_USERS_URL_ENDPOINT } from '../../constants/apiConstants';
import { User } from '../../types/userType';
import { getRequestHeaders } from '../../utils/requestHeadersFunctions';

export const handleListAllUsers = async (): Promise<User[] | Error | undefined> => {
    try {
        if (getRequestHeaders()) {
            const response = await fetch(LIST_ALL_USERS_URL_ENDPOINT, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...getRequestHeaders(),
                },
            });

            const data = await response.json();
            console.log(data)
            return data;
        }
    } catch (error) {
        return error as Error;
    }
};

export const handleListAllChannels = async () => {
    try {
        if (getRequestHeaders()) {
            const response = await fetch(LIST_ALL_CHANNELS_URL_ENDPOINT, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...getRequestHeaders(),
                },
            });

            const data = await response.json();
            console.log(data)
            return data;
        }
    } catch (error) {
        return error as Error;
    }
};


import { BASE_API_URL, LIST_ALL_CHANNELS_URL_ENDPOINT, LIST_ALL_USERS_URL_ENDPOINT } from '../../constants/apiConstants';
import { RetrieveMessagesParams } from '../../types/apiRequestBodyTypes';
import { User } from '../../types/userType';
import { formatDate, formatTime, getMinutes } from '../../utils/dateAndTimeFunctions';
import { getFromLocalStorage } from '../../utils/localStorageFunctions';
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
            return data;
        }
    } catch (error) {
        return error as Error;
    }
};

export const handleRetrieveMessages = async (params: RetrieveMessagesParams | null) => {
    if (!params) return;
    console.log(params)

    try {
        const response = await fetch(`${BASE_API_URL}/messages?receiver_id=${params.id!}&receiver_class=${params.class}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...getRequestHeaders(),
            },
        });

        const data = await response.json();
        console.log(data)

        if (data.data) {
            return formatMessages(data.data);
        }

        console.log(data)

    } catch (error) {
        if (error instanceof Error) {
            console.log(error)
        }
    }
};

export const handleGetChannelDetails = async (params: number | null) => {
    if (!params) return;
    console.log(params)

    try {
        const response = await fetch(`${BASE_API_URL}/channels/${params}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...getRequestHeaders(),
            },
        });

        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        if (error instanceof Error) {
            console.log(error)
        }
    }
};

const formatMessages = (messages) => {
    const formattedMessages = messages.reduce((acc, cur) => {
        if (
            acc.length === 0
            || formatDate(new Date(cur.created_at)) !== acc[acc.length - 1].date
        ) {
            return [
                ...acc,
                {
                    date: formatDate(new Date(cur.created_at)),
                    messages: [
                        {
                            currentSender: cur.sender.uid,
                            time: formatTime(new Date(cur.created_at)),
                            text: cur.body,
                            isShowDetails: true,
                            lastIsShowDetails: formatTime(new Date(cur.created_at)),
                        },
                    ],
                },
            ];
        }

        return [
            ...acc.slice(0, acc.length - 1),
            {
                ...acc[acc.length - 1],
                messages: [
                    ...acc[acc.length - 1].messages,
                    {
                        currentSender: cur.sender.uid,
                        time: formatTime(new Date(cur.created_at)),
                        text: cur.body,
                        isShowDetails: Math.abs(getMinutes(acc[acc.length - 1].messages[acc[acc.length - 1].messages.length - 1].lastIsShowDetails) - getMinutes(formatTime(new Date(cur.created_at)))) < 1 ? cur.sender.uid !== acc[acc.length - 1].messages[acc[acc.length - 1].messages.length - 1].currentSender : Math.abs(getMinutes(acc[acc.length - 1].messages[acc[acc.length - 1].messages.length - 1].lastIsShowDetails) - getMinutes(formatTime(new Date(cur.created_at)))) >= 1 ? true : false,
                        lastIsShowDetails: Math.abs(getMinutes(acc[acc.length - 1].messages[acc[acc.length - 1].messages.length - 1].lastIsShowDetails) - getMinutes(formatTime(new Date(cur.created_at)))) >= 1 ? formatTime(new Date(cur.created_at)) : acc[acc.length - 1].messages[acc[acc.length - 1].messages.length - 1].lastIsShowDetails,
                    },
                ],
            },
        ];
    }, []);

    return formattedMessages;
};

import { useEffect, useState } from "react"
import { BASE_API_URL, CREATE_CHANNEL_URL_ENDPOINT, LIST_ALL_CHANNELS_URL_ENDPOINT, LIST_ALL_USERS_URL_ENDPOINT, SEND_MESSAGE_URL_ENDPOINT } from "../constants/apiConstants";
import { getRequestHeaders } from "../utils/requestHeadersFunctions";
import { AddMemberToChannelRequestBody, CreateChannelRequestBody, RetrieveMessagesParams, SendMessageRequestBody } from "../types/apiRequestBodyTypes";
import { RequestHeaders } from "../types/RequestHeaders";
import { CreateChannelData } from "../types/apiData";
import { getFromLocalStorage } from "../utils/localStorageFunctions";
import { formatDate, formatTime, getMinutes } from "../utils/dateAndTimeFunctions";
import { User } from "../types/userType";
import { Channel } from "../types/Channel";
import { ChatMessages } from "../types/ChatMessages";

// POST
export const useCreateChannel = (requestBody: CreateChannelRequestBody | null) => {
	const [data, setData] = useState<CreateChannelData | null>(null);
	const [error, setError] = useState<Error | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!requestBody) return;

		const createChannel = async () => {
			setIsLoading(true);
			try {
				const response = await fetch(CREATE_CHANNEL_URL_ENDPOINT, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						...getRequestHeaders(),
					},
					body: JSON.stringify(requestBody),
				});

				const data = await response.json();
				setData(data);
			} catch (error) {
				if (error instanceof Error) {
					setError(error);
				}
			} finally {
				setIsLoading(false);
			}
		};

		createChannel();
	}, [requestBody]);

	return { data, error, isLoading };
};

export const useSendMessage = (requestBody: SendMessageRequestBody | null) => {
	const [data, setData] = useState(null);
	const [error, setError] = useState<Error | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!requestBody) return;

		const sendMessage = async () => {
			setIsLoading(true);
			try {
				const response = await fetch(SEND_MESSAGE_URL_ENDPOINT, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						...getRequestHeaders(),
					},
					body: JSON.stringify(requestBody),
				});

				const data = await response.json();
				setData(data);
			} catch (error) {
				if (error instanceof Error) {
					setError(error);
				}
			} finally {
				setIsLoading(false);
			}
		};

		sendMessage();
	}, [requestBody]);

	return { data, error, isLoading };
};

export const useAddMemberToChannel = (requestBody: AddMemberToChannelRequestBody | null) => {
	const [data, setData] = useState(null);
	const [error, setError] = useState<Error | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!requestBody) return;

		const addMemberToChannel = async () => {
			setIsLoading(true);
			try {
				const response = await fetch(SEND_MESSAGE_URL_ENDPOINT, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						...getRequestHeaders(),
					},
					body: JSON.stringify(requestBody),
				});

				const data = await response.json();
				setData(data);
			} catch (error) {
				if (error instanceof Error) {
					setError(error);
				}
			} finally {
				setIsLoading(false);
			}
		};

		addMemberToChannel();
	}, [requestBody]);

	return { data, error, isLoading };
};

// GET
export const useListAllUsers = async (requestHeaders: RequestHeaders | null) => {
	const [error, setError] = useState<Error | null>(null);
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!requestHeaders) return;

		const listAllUsers = async () => {
			setIsLoading(true);

			try {
				const response = await fetch(LIST_ALL_USERS_URL_ENDPOINT, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						...requestHeaders,
					},
				});

				const data = await response.json();
				setData(data);
			} catch (error) {
				if (error instanceof Error) {
					setError(error);
				}
			} finally {
				setIsLoading(false);
			}
		};

		listAllUsers();
	}, [requestHeaders]);

	return { data, error, isLoading };
};

export const useListAllChannels = async (requestHeaders: RequestHeaders | null) => {
	const [error, setError] = useState<Error | null>(null);
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!requestHeaders) return;

		const listAllChannels = async () => {
			setIsLoading(true);

			try {
				const response = await fetch(LIST_ALL_CHANNELS_URL_ENDPOINT, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						...requestHeaders,
					},
				});

				const data = await response.json();
				setData(data);
			} catch (error) {
				if (error instanceof Error) {
					setError(error);
				}
			} finally {
				setIsLoading(false);
			}
		};

		listAllChannels();
	}, [requestHeaders]);

	return { data, error, isLoading };
};

export const useGetChannelDetails = async (requestHeaders: RequestHeaders | null, id: number) => {
	const [error, setError] = useState<Error | null>(null);
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!requestHeaders) return;

		const getChannelDetails = async () => {
			setIsLoading(true);

			try {
				const response = await fetch(`${LIST_ALL_CHANNELS_URL_ENDPOINT}/${id}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						...requestHeaders,
					},
				});

				const data = await response.json();
				setData(data);
			} catch (error) {
				if (error instanceof Error) {
					setError(error);
				}
			} finally {
				setIsLoading(false);
			}
		};

		getChannelDetails();
	}, [requestHeaders]);

	return { data, error, isLoading };
};

export const useRetrieveMessages = async (params: RetrieveMessagesParams | null) => {
	const [error, setError] = useState<Error | null>(null);
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!params) return;

		const retrieveMessages = async () => {
			setIsLoading(true);
			try {
				const response = await fetch(`${BASE_API_URL}/messages?receiver_id=${params.id}&receiver_class=${params.class}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						...getRequestHeaders(),
					},
				});

				const data = await response.json();

				if (data.data) {
					setData(
						data.data.reduce(
							(
								acc: ChatMessages[],
								cur: {
									body: string,
									created_at: string,
									id: number,
									receiver: User,
									sender: User,
								}
							): ChatMessages[] => {
								if (acc.length === 0 || formatDate(new Date(cur.created_at)) !== acc[acc.length - 1].date) {
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
												}
											]
										}
									]
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
												isShowDetails: Math.abs(getMinutes(acc[acc.length - 1].messages[acc[acc.length - 1].messages.length - 1].lastIsShowDetails) - getMinutes(formatTime(new Date(cur.created_at)))) >= 10,
												lastIsShowDetails: Math.abs(getMinutes(acc[acc.length - 1].messages[acc[acc.length - 1].messages.length - 1].lastIsShowDetails) - getMinutes(formatTime(new Date(cur.created_at)))) >= 10 ? formatTime(new Date(cur.created_at)) : acc[acc.length - 1].messages[acc[acc.length - 1].messages.length - 1].lastIsShowDetails,
											}
										]
									}
								]
							}, [])
					);
				}
			} catch (error) {
				if (error instanceof Error) {
					setError(error);
				}
			} finally {
				setIsLoading(false);
			}
		};

		retrieveMessages();
	}, [params]);

	return { data, error, isLoading };
};

// TODO: fix typing
export const useFetchAvailableUsers = (
	usersAndChannels: {
		users: {
			data: User[];
		};
		channels: {
			data: Channel[];
		};
		updateChannels: () => void;
	}): User[] => {
	const [availableUsers, setAvailableUsers] = useState<User[]>([]);

	useEffect(() => {
		const getAllChannelIds = async () => {
			try {
				const allChannelIds = usersAndChannels.channels.data.map((channel) => channel.id);
				const channelDataPromises = allChannelIds.map(async (channelId) => {
					const response = await fetch(`${LIST_ALL_CHANNELS_URL_ENDPOINT}/${channelId}`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							...getRequestHeaders(),
						},
					});

					if (!response.ok) {
						throw new Error('Failed to fetch channel data');
					}

					return response.json();
				});

				const channelData = await Promise.all(channelDataPromises);
				return channelData;
			} catch (error) {
				console.error('Failed to get all channel IDs:', error);
				return [];
			}
		};

		const fetchData = async () => {
			const allChannelInfo = await getAllChannelIds();
			const allAvailableUserIds = [...new Set(allChannelInfo.map(({ data }) => data.channel_members.map(({ user_id }: { user_id: number }) => user_id)).flat())];
			setAvailableUsers(usersAndChannels.users.data.reduce<User[]>((acc, cur): User[] => {
				if (allAvailableUserIds.includes(cur.id) && cur.uid !== getFromLocalStorage('user')) {
					return [...acc, cur];
				}
				return acc;
			}, []));
		};

		fetchData();
	}, [usersAndChannels]); // Depend on usersAndChannels to ensure the effect runs when it changes

	return availableUsers;
};

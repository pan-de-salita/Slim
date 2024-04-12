import { useState } from "react"
import { BASE_API_URL } from "../constants/apiConstants";
import { getRequestHeaders } from "../utils/requestHeadersFunctions";
import { getFromLocalStorage } from "../utils/localStorageFunctions";

export const useRetrievedUserMessages = async () => {

	try {
		const response = await fetch(`${BASE_API_URL}/messages?receiver_id=${getFromLocalStorage('id')}&receiver_class=User`, {
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
		return error as Error;
	}
}

export const useCreateChannel = async (requestBody: { name: string, user_ids: string[] }) => {
	try {
		const response = await fetch(`${BASE_API_URL}/channels`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				...getRequestHeaders(),
			},
			body: JSON.stringify(requestBody),
		});

		console.log(response);
		const data = await response.json();
		console.log(data);
		return data;
	} catch (error) {
		return error as Error;
	}
};

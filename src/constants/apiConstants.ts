export const BASE_API_URL = 'http://206.189.91.54/api/v1';
export const LOGIN_URL_ENDPOINT = `${BASE_API_URL}/auth/sign_in/`;
export const SIGNUP_URL_ENDPOINT = `${BASE_API_URL}/auth/`;
export const LIST_ALL_USERS_URL_ENDPOINT = `${BASE_API_URL}/users/`;

export const requestHeadersKeys = ['access-token', 'client', 'expiry', 'uid'];
import { getFromLocalStorage, storeInLocalStorage } from "./localStorageFunctions";
import { RequestHeaders } from "./types/RequestHeaders";

export const fetchRequestHeaders = (response: Response) => {
      const requestHeadersKeys = ['access-token', 'client', 'expiry', 'uid'];
      const requestHeaders = requestHeadersKeys.reduce((obj, key) => {
            return {
                  ...obj,
                  [key]: response.headers.get(key),
            };
      }, {});

      if (isValidRequestHeaders(requestHeaders as RequestHeaders)) {
            storeRequestHeadersInLocalStorage(requestHeaders as RequestHeaders);
      }
};

const isValidRequestHeaders = (requestHeaders: RequestHeaders) => {
      let result: boolean = true;

      for (const prop in requestHeaders) {
            result = requestHeaders[prop as keyof RequestHeaders] === null ? false : result;
      }

      return result;
}

const storeRequestHeadersInLocalStorage = (requestHeaders: RequestHeaders) => {
      storeInLocalStorage('requestHeaders', requestHeaders);
}

export const requestHeaders = (): RequestHeaders => {
      return getFromLocalStorage('requestHeaders');
}

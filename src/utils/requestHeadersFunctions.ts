import { requestHeadersKeys } from "../constants/apiConstants";
import { RequestHeaders } from "../types/RequestHeaders";
import { getFromLocalStorage, storeInLocalStorage } from "./localStorageFunctions";

export const fetchRequestHeaders = (response: Response) => {
      const requestHeaders = requestHeadersKeys.reduce((obj, key) => {
            return { ...obj, [key]: response.headers.get(key), };
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

export const getRequestHeaders = (): RequestHeaders => {
      return getFromLocalStorage('requestHeaders');
}

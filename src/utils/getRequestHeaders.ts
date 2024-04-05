interface RequestHeaders {
      'access-token': string,
      client: string,
      expiry: string,
      uid: string,
};

export const fetchRequestHeaders = (response: Response): RequestHeaders => {
      const requestHeadersKeys = ['access-token', 'client', 'expiry', 'uid'];
      const requestHeaders = requestHeadersKeys.reduce((obj, key) => {
            return {
                  ...obj,
                  [key]: response.headers.get(key),
            };
      }, {});

      return requestHeaders as RequestHeaders;
};

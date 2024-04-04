export type SignupResponse =
      | {
            data: {
                  allow_password_change: boolean,
                  created_at: string,
                  email: string,
                  id: number,
                  image: null,
                  name: null,
                  nickname: null,
                  provider: 'email',
                  uid: string,
                  updated_at: string,
            },
            status: 'success';
      }
      | {
            data: {
                  allow_password_change: boolean,
                  created_at: null,
                  email: string,
                  id: null,
                  image: null,
                  name: null,
                  nickname: null,
                  provider: 'email',
                  uid: string,
                  updated_at: null,
            },
            errors: {
                  full_messages: string[],
                  [key: string]: string[],
            }
            status: 'error';
      };

export const isSignupResponse = (obj: any): obj is SignupResponse => {
      return obj && obj.data !== undefined && obj.status !== undefined;
} 

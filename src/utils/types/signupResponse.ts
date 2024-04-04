interface SignupData {
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
};

export type SignupResponse =
      | {
            status: 'success',
            data: SignupData,
      }
      | {
            status: 'error';
            data: Omit<SignupData, 'created_at' | 'id' | 'updated_at'> & { created_at: null, id: null, updated_at: null },
            errors: {
                  full_messages: string[],
                  [key: string]: string[],
            },
      };

export const isSignupResponse = (obj: any): obj is SignupResponse => {
      return obj && obj.data !== undefined && obj.status !== undefined;
};

export const hasErrors = (obj: any): obj is { errors: { full_messages: string[] } } => {
      return obj && obj.errors && Array.isArray(obj.errors.full_messages);
};

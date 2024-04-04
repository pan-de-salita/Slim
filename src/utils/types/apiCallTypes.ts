export interface LoginFormData {
      email: string;
      password: string;
      password_confirmation?: string;
};

export interface LoginSuccess {
      data: {
            allow_password_change: boolean,
            email: string,
            id: number,
            image: null,
            name: null,
            nickname: null,
            provider: 'email',
            uid: string,
      }
};

export const isLoginSuccess = (obj: any): obj is LoginSuccess => {
      return obj && obj.data !== undefined;
};

export interface LoginFail {
      errors: string[],
      success: boolean,
};

export const isLoginFail = (obj: any): obj is LoginFail => {
      return obj && obj.errors !== undefined && obj.success !== undefined;
};

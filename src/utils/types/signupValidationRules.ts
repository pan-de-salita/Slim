export interface EmailValidationRules {
      required: true,
      pattern: {
            value: RegExp,
            message: string,
      },
};

export interface PasswordValidationRules extends EmailValidationRules {
      minLength: {
            value: string,
            message: string,
      },
};

import { NavigateFunction } from "react-router-dom";
import { LoginFail, LoginSuccess, isLoginSuccess } from "./types/loginAttemptTypes";
import { toastError, toastSuccess } from "./toasts";
import { UseFormReset } from "react-hook-form";
import { LoginFormData } from "./types/loginFormData";
import { SignupResponse, hasErrors } from "./types/signupResponse";

export const handleLoginAttempt = (
      attempt: LoginSuccess | LoginFail, navigate: NavigateFunction, reset: UseFormReset<LoginFormData>
) => {
      if (isLoginSuccess(attempt)) {
            navigate('/client');
            toastSuccess(`Welcome back, ${attempt.data.uid}!`);
            reset();
      } else {
            toastError('Invalid login credentials.');
      }
};

export const handleSignupAttempt = (
      attempt: SignupResponse, toggleIsLogin: () => void, reset: UseFormReset<LoginFormData>
) => {
      if (attempt.status === 'success') {
            toastSuccess("You've successfully created an account. Try logging in!");
            toggleIsLogin();
            reset();
      } else if (hasErrors(attempt)) {
            toastError(`Error: ${attempt.errors.full_messages.join('. ')}.`);
      }
};
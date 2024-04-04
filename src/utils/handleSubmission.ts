
const handleSubmission = async (data: LoginFormData) => {
      try {
            const attempt = isLoginFields
                  ? await handleLogin(data) as Promise<LoginSuccess | LoginFail | Error>
                  : await handleSignup(data) as Promise<SignupResponse | Error>;

            if (isLoginFields) {
                  if (isLoginSuccess(attempt)) {
                        navigate('/client');
                        toastSuccess(`Welcome back, ${attempt.data.uid}.`);
                        reset();
                  } else {
                        toastError('Invalid login credentials.');
                  }
            } else {
                  if (isSignupResponse(attempt) && attempt.status === 'success') {
                        toastSuccess("You've successfully created an account. Try logging in.");
                        reset();
                  } else if (hasErrors(attempt)) {
                        toastError(`Error: ${attempt.errors.full_messages.join('. ')}.`);
                  }
            }
      } catch (error) {
            console.error(error);
            toastError('An unexpected error occurred.');
      }
};

export default handleSubmission;

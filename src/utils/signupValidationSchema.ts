import * as Yup from 'yup';

const signupValidationSchema = Yup.object().shape({
      email: Yup.string()
            .required("Oops, you'll need an email to log in.")
            .email("Hm... Doesn't look like an email."),
      password: Yup.string()
            .required('Are you sure you want to go without a password?')
            .min(6, "Make this at least 6 characters long maybe?"),
});

export default signupValidationSchema;

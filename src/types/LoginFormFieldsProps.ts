import { FieldError, UseFormRegister } from "react-hook-form";
import { LoginFormData } from "./loginFormData";

export interface LoginFormFieldsProps {
      formRegister: UseFormRegister<LoginFormData>;
      formFields: string[];
      formErrors?: Record<string, FieldError | undefined>;
}

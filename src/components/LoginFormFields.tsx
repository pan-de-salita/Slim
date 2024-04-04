import capitalizeFirstLetter from '../utils/capitalizeFirstLetter';
import { LoginFormData } from '../utils/types/loginFormData';
import { AiFillInfoCircle } from "react-icons/ai";
import { LoginFormFieldsProps } from '../utils/types/loginFormFieldsProps';

const LoginFormFields = (props: LoginFormFieldsProps) => {
  return props.formFields.map((field): JSX.Element => {
    return (
      <div className='w-full relative' key={field}>
        <label className='flex justify-center items-center gap-4'>
          <input
            {...props.formRegister(field as keyof LoginFormData)}
            className='w-full h-[44px] border-2 border-solid border-[#bababa] p-[12px] placeholder-[#1d1c1d90] text-lg rounded-md'
            type={field.toLowerCase().includes('password') ? 'password' : 'text'}
            placeholder={field.split('_').map((word) => capitalizeFirstLetter(word)).join(' ')}
            required={true}
            autoComplete='off' />
        </label>
        {props.formErrors?.[field as keyof LoginFormData]
          && <div className='pl-1 flex items-center gap-1'>
            <AiFillInfoCircle />
            <p className='font-[400]'>{props.formErrors[field as keyof LoginFormData]?.message}</p>
          </div>}
      </div>
    );
  })
}

export default LoginFormFields;

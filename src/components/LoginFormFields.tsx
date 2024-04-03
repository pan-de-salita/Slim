import { UseFormRegister } from 'react-hook-form';
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter';
import { LoginFormData } from '../utils/types/ApiCallTypes';

const LoginFormFields = (
  { formRegister, formFields }: { formRegister: UseFormRegister<LoginFormData>, formFields: string[] }
) => {
  return formFields.map((field): JSX.Element => {
    return (
      <div className='w-full' key={field}>
        <label className='flex justify-center items-center gap-4'>
          <input
            {...formRegister(field as keyof LoginFormData)}
            className='w-full h-[44px] border-2 border-solid border-[#bababa] p-[12px] placeholder-[#1d1c1d90] text-lg rounded-md'
            type={field.toLowerCase().includes('password') ? 'password' : 'text'}
            placeholder={field.split('_').map((word) => capitalizeFirstLetter(word)).join(' ')}
            required={true}
            autoComplete='off' />
        </label>
      </div>
    );
  })
}

export default LoginFormFields;

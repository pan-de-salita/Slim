import { useForm } from 'react-hook-form';
import { onLoginAttempt } from '../utils/ApiCallPost';
import { LoginFormData } from '../utils/types/ApiCallTypes';

const LoginForm = () => {
  const { register, handleSubmit, reset } = useForm<LoginFormData>();

  return (
    <form onSubmit={handleSubmit(onLoginAttempt)}
      className='w-[90%] md:w-[400px] lg:w-[400px] max-w-[400px] h-full flex flex-col gap-5'>
      <div className='w-full'>
        <label className='flex justify-center items-center gap-4'>
          <input
            {...register('email')}
            className='w-full h-[44px] border-2 border-solid border-[#bababa] p-[12px] placeholder-[#1d1c1d90] text-lg rounded-md'
            type='text'
            placeholder='Email'
            required={true}
            autoComplete='off' />
        </label>
      </div>
      <div className='w-full'>
        <label className='flex justify-center items-center gap-4'>
          <input
            {...register('password')}
            className='w-full h-[44px] border-2 border-solid border-[#bababa] p-[12px] placeholder-[#1d1c1d90] text-lg rounded-md'
            type='password'
            placeholder='Password'
            required={true}
            autoComplete='off' />
        </label>
      </div>
      <button
        type='submit'
        className='w-full h-[44px] bg-[#7db643] pb-[3px] text-lg font-bold rounded-md text-white mb-[20px] hover:bg-[#5b2b5c] transition-all duration-100'
      >
        Sign In via Email
      </button>
    </form>
  );
};

export default LoginForm;

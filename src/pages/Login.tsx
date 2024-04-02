import LogoMax from '../assets/logo-max.svg';
import { TbAlertHexagon } from "react-icons/tb";
import { TbBrandGithub } from "react-icons/tb";
import { BiCodeCurly } from "react-icons/bi";
import { SiNeovim } from "react-icons/si";

import { useForm } from 'react-hook-form';

const Login = () => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  return (
    <div className='w-screen h-screen flex flex-col items-center justify-between'>
      <div className='w-full flex flex-col items-center'>
        {/* header */}
        <header className='w-full h-[126.133px] grid grid-cols-3 items-center pb-10 pt-10'>
          <div className='col-start-1 col-end-2 bg-red-500'></div>
          <div className='flex justify-center col-start-2 col-end-3'>
            <img className='h-[26px] ' src={LogoMax} alt='Slim logo with app name' />
          </div>

          {/* signup */}
          <div className='col-start-3 col-end-4 hidden md:flex lg:flex flex-col justify-end items-end pr-[40px]'>
            <span className='text-sm text-[#616061] '>Don't have an account yet?</span>
            <br />
            <a href="" className='text-sm text-[#1a69a6] font-bold'>Create an account</a>
          </div>
        </header>

        {/* main */}
        <main className='w-full max-w-[800px] flex flex-col justify-center items-center'>

          {/* hero */}
          <h1 className='text-[43px] md:text-[46px] lg:text-[46px] font-black mb-[10px] text-center text-[#1d1c1d]'>
            Slack, but with
            <span className='text-[#4a154b]'>&nbsp;Vim&nbsp;</span>
            motions
          </h1>
          <div className='mb-[32px] text-[#454245]'>
            <span className='font-bold'>Workspace:&nbsp;</span>
            <span>http://206.189.91.54/api/v1</span>
          </div>

          {/* signin form */}
          <form className='w-[90%] md:w-[400px] lg:w-[400px] h-full flex flex-col gap-5'>
            <div className='w-full'>
              <label className='flex justify-center items-center gap-4'>
                <input {...register('Email')} className='w-full h-[44px] border-2 border-solid border-[#bababa] p-[12px] placeholder-[#1d1c1d90] text-lg rounded-md' type='text' placeholder='Email' required={true} autoComplete='off' />
              </label>
            </div>
            <div className='w-full'>
              <label className='flex justify-center items-center gap-4'>
                <input {...register('Password')} className='w-full h-[44px] border-2 border-solid border-[#bababa] p-[12px] placeholder-[#1d1c1d90] text-lg rounded-md' type='text' placeholder='Password' required={true} autoComplete='off' />
              </label>
            </div>
            <button className='w-full h-[44px] bg-[#4a154b] pb-[3px] text-lg rounded-md text-white mb-[20px] hover:bg-[#5b2b5c]'>Sign In via Email</button>
          </form>

          {/* instructions */}
          <div className='w-[90%] md:w-[400px] lg:w-[400px] flex bg-[#f3f3f3] px-[24px] py-[12px] rounded-md'>
            <div className='w-[15px]'>
              <TbAlertHexagon color='#636263' />
            </div>
            <p className='text-[#636263] pl-[12px]'>To use this app, allow <span className='font-bold'>Insecure Content</span> in your browser's <span className='font-bold'>Settings</span>.</p>
          </div>

          {/* signup */}
          <div className='col-start-3 col-end-4 flex md:hidden lg:hidden flex-col justify-center items-center py-[20px]'>
            <span className='text-sm text-[#616061] '>Don't have an account yet?</span>
            <br />
            <a href="" className='text-sm text-[#1a69a6] font-bold'>Create an account</a>
          </div>
        </main>
      </div>

      {/* footer */}
      <footer className='invisible md:visible lg:visible w-full h-[90px] self-end flex items-center'>
        <ul className='w-full flex justify-center items-center gap-5 text-[#6f6f6f]'>
          <li className='flex items-center gap-1'>
            <div>
              <TbBrandGithub />
            </div>
            Github
          </li>
          <li className='flex items-center gap-1'>
            <div>
              <BiCodeCurly />
            </div>
            Code
          </li>
          <li className='flex items-center gap-1'>
            <div>
              <SiNeovim />
            </div>
            Neovim
          </li>
        </ul>
      </footer>

    </div>
  );
};

export default Login;

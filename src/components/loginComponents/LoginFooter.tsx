import { TbBrandGithub } from "react-icons/tb";
import { BiCodeCurly } from "react-icons/bi";
import { SiNeovim } from "react-icons/si";

const LoginFooter = () => {
  return (
    <footer className='invisible md:visible lg:visible w-full h-[90px] self-end flex items-center'>
      <ul className='w-full flex justify-center items-center gap-5 text-[#6f6f6f]'>
        <li>
          <a href="https://github.com/pan-de-salita" target='_blank' className='flex items-center gap-1 hover:text-[#1a69a6] hover:underline'>
            <div>
              <TbBrandGithub />
            </div>
            Github
          </a>
        </li>
        <li>
          <a href="https://github.com/pan-de-salita/Slim" target='_blank' className='flex items-center gap-1 hover:text-[#1a69a6] hover:underline'>
            <div>
              <BiCodeCurly />
            </div>
            Code
          </a>
        </li>
        <li>
          <a href="https://neovim.io/" target='_blank' className='flex items-center gap-1 hover:text-[#1a69a6] hover:underline' >
            <div>
              <SiNeovim />
            </div>
            Neovim
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default LoginFooter;

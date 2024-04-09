import SlimLogo from '../../assets/logo-modified.png';

const Logo = () => {
  return (
    <div className='flex justify-center items-center gap-2 col-start-2 col-end-3'>
      <img className='h-[26px] ' src={SlimLogo} alt='Slim logo' />
      <div className='text-3xl font-black'>
        <span className='text-[#45c0f1]'>sl</span>
        <span className='text-[#7db643]'>im</span>
      </div>
    </div>
  );
};

export default Logo;

import { ImInfo } from "react-icons/im";

const InsecureContentInstructions = () => {
  return (
    <div className='w-[90%] md:w-[400px] lg:w-[400px] max-w-[400px] flex items-start bg-[#f3f3f3] px-[24px] py-[12px] rounded-md'>
      <div className='w-[15px]'>
        <ImInfo color='#636263' />
      </div>
      <p className='text-[#636263] pl-[12px]'>To use the app, allow <span className='font-bold'>Insecure Content</span> in your browser's <span className='font-bold'>Settings</span>.</p>
    </div>
  );
};

export default InsecureContentInstructions;

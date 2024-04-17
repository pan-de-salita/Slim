import { ImInfo } from "react-icons/im";

const InsecureContentInstructions = () => {
  return (
    <div className='w-[90%] md:w-[25rem] lg:w-[25rem] max-w-[25rem] flex items-start bg-[#f3f3f3] px-[1.5rem] py-[1.5rem] rounded-md'>
      <div className='w-[0.398]'>
        <ImInfo color='#636263' />
      </div>
      <p className='text-[#636263] pl-[0.75rem]'>To use the app, allow <span className='font-bold'>Insecure Content</span> in your browser's <span className='font-bold'>Settings</span>.</p>
    </div>
  );
};

export default InsecureContentInstructions;

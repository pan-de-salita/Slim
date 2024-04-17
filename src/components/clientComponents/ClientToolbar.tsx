import { IoSearch } from "react-icons/io5";
import { MdHelpOutline } from "react-icons/md";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const ClientToolbar = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('requestHeaders');
        localStorage.removeItem('user');
        localStorage.removeItem('id');
        navigate('/');
    };

    return (
        <div className='w-full h-[2.5rem] grid grid-cols-7 items-center'>
            <div className='w-[1.75rem] h-[1.75rem] col-start-1 col-end-2 pl-[0.5rem]'></div>
            <div className='w-full h-full flex items-center gap-2 col-start-3 col-end-6'>
                <button className='w-full h-[70%] bg-white flex justify-between items-center p-2 rounded-md'>
                    <span className='text-sm text-[#262727] relative'>Search your workspace</span>
                    <IoSearch color='#525252' />
                </button>
                <button className='h-[1.75rem] w-[1.75rem] flex justify-center items-center rounded-md cursor-pointer hover:bg-[#649135]'>
                    <MdHelpOutline color='white' size={21} />
                </button>
            </div>
            <div className='flex justify-center items-center col-start-8 col-end-9 pr-[0.5rem]'>
                <button
                    onClick={logout}
                    className='h-[1.75rem] w-[1.75rem] flex justify-center items-center rounded-md cursor-pointer hover:bg-[#649135]'>
                    <RiLogoutCircleRLine color='white' size={21} />
                </button>
            </div>
        </div>
    );
};

export default ClientToolbar;

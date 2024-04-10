import { useContext } from "react";
import { SearchUsersContext } from "../../contexts/SearchUsersContext";
import { IoSearch } from "react-icons/io5";
import { MdHelpOutline } from "react-icons/md";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const ClientToolbar = () => {
    // const users = useContext(SearchUsersContext);
    // console.log(users)
    const navigate = useNavigate();

    return (
        <div className='w-full h-[40px] grid grid-cols-7 items-center'>
            <div className='w-[28px] h-[28px] col-start-1 col-end-2 pl-[8px]'></div>
            <div className='w-full h-full flex items-center gap-2 col-start-3 col-end-6'>
                <button className='w-full h-[70%] bg-white flex justify-between items-center p-2 rounded-md'>
                    <span className='text-sm text-[#262727] relative'>Search your workspace</span>
                    <IoSearch color='#525252' />
                </button>
                <button className='h-[28px] w-[28px] flex justify-center items-center rounded-md cursor-pointer hover:bg-[#649135]'>
                    <MdHelpOutline color='white' size={21} />
                </button>
            </div>
            <div className='flex justify-center items-center col-start-8 col-end-9 pr-[8px]'>
                <button
                    onClick={() => {
                        localStorage.removeItem('requestHeaders');
                        navigate('/');
                    }}
                    className='h-[28px] w-[28px] flex justify-center items-center rounded-md cursor-pointer hover:bg-[#649135]'>
                    <RiLogoutCircleRLine color='white' size={21} />
                </button>
            </div>
        </div>
    );
};

export default ClientToolbar;

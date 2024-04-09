import { useContext } from "react";
import { SearchUsersContext } from "../../contexts/SearchUsersContext";
import { IoSearch } from "react-icons/io5";
import { HiOutlineLogout } from "react-icons/hi";

const ClientToolbar = () => {
    // const users = useContext(SearchUsersContext);
    // console.log(users)

    return (
        <div className='w-full h-[40px] bg-[#E8E8E9] grid grid-cols-3 items-center'>
            <div className='col-start-1 col-end-2 w-0'></div>
            <button className='col-start-2 col-end-3 h-[70%] w-full bg-[#A4A4A7] flex justify-between items-center p-2 rounded-md'>
                <span className='text-sm text-[#262727] relative'>Search your workspace</span>
                <IoSearch color='#525252' />
            </button>
            <div className='flex justify-end items-center'>
                <button className='col-start-3 col-end-4 h-[28px] w-[28px] mr-[14px] rounded-md cursor-pointer hover:bg-[#A4A4A7]'>
                    <HiOutlineLogout color='#232123' size={21} />
                </button>
            </div>
        </div>
    );
};

export default ClientToolbar;

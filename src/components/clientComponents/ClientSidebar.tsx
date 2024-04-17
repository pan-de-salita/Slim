import { HiHome } from "react-icons/hi2";
import { LuMessagesSquare } from "react-icons/lu";
import { GrGroup } from "react-icons/gr";
import { IoMdAdd } from "react-icons/io";
import profilePicture from '../../assets/profilePicture.jpeg'

const sidebarLinks = ['Home', 'DMs', 'Channels'];
const sidebarIcons = [HiHome, LuMessagesSquare, GrGroup];

const ClientSidebar = ({ toggleOpenCreateChannelModal }: { toggleOpenCreateChannelModal: () => void }) => {
    return (
        <div className='w-[4.375rem] h-full py-[0.625rem] flex flex-col justify-between items-center'>
            <div className='flex flex-col items-center'>
                {sidebarLinks.map((link, idx) => {
                    const IconComponent = sidebarIcons[idx];
                    return (
                        <div key={String(IconComponent)} className='group w-[3.25rem] h-[4.25rem] flex flex-col justify-center items-center text-white cursor-pointer'>
                            <div className='w-[2.25rem] h-[2.25rem] flex justify-center items-center rounded-md group-hover:bg-[#649135]'>
                                <IconComponent size={20} className='transform group-hover:scale-125 transition-transform duration-300' />
                            </div>
                            <span className='text-xs font-[600]'>{link}</span>
                        </div>
                    );
                })}
            </div>
            <div className='flex flex-col items-center gap-4'>
                <button
                    onClick={toggleOpenCreateChannelModal}
                    className='w-[2.25rem] h-[2.25rem] flex justify-center items-center rounded-[50%] bg-[#649135] transform hover:scale-125 transition-transform duration-300'>
                    <IoMdAdd size={20} color='white' className='' />
                </button>
                <div className='relative cursor-pointer'>
                    <img className='h-[2.25rem] w-[2.25rem] rounded-md mb-2 shadow-2xl' src={profilePicture} alt='Placeholder for profile picture' />
                    <div className='absolute bg-[#0ef64d] left-7 bottom-1 h-[0.75rem] w-[0.75rem] rounded-sm shadow-2xl border-[0.125rem] border-solid border-gray-800'></div>
                </div>
            </div>
        </div>
    );
};

export default ClientSidebar;

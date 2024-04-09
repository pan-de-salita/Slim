import { HiHome } from "react-icons/hi2";
import { LuMessagesSquare } from "react-icons/lu";
import { GrGroup } from "react-icons/gr";
import { GrStatusInfoSmall } from "react-icons/gr";
import profilePicture from '../../assets/profilePicture.jpeg'

const sidebarLinks = ['Home', 'DMs', 'Channels'];
const sidebarIcons = [HiHome, LuMessagesSquare, GrGroup];

const ClientSidebar = () => {
    return (
        <div className='w-[70px] h-full py-[10px] flex flex-col justify-between items-center bg-[#E8E8E9]'>
            <div className='flex flex-col items-center'>
                {sidebarLinks.map((link, idx) => {
                    const IconComponent = sidebarIcons[idx];
                    return (
                        <div key={String(IconComponent)} className='group w-[52px] h-[68px] flex flex-col justify-center items-center text-[#232123] cursor-pointer'>
                            <div className='w-[36px] h-[36px] flex justify-center items-center rounded-md hover:bg-[#a4a4a7]'>
                                <IconComponent size={20} className='transform group-hover:scale-125 transition-transform duration-300' />
                            </div>
                            <span className='text-xs font-[500]'>{link}</span>
                        </div>
                    );
                })}
            </div>
            <div className='relative cursor-pointer'>
                <img className='h-[40px] w-[40px] rounded-md mb-2' src={profilePicture} alt='Placeholder for profile picture' />
                <GrStatusInfoSmall className='absolute bottom-1 left-8 right-0 h-[12px] w-[12px] rounded-xl' color='#08CE09' />
            </div>
        </div>
    );
};

export default ClientSidebar;

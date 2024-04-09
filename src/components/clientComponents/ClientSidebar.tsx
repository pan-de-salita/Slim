import { HiHome } from "react-icons/hi2";
import { LuMessagesSquare } from "react-icons/lu";
import { GrGroup } from "react-icons/gr";
import SlimLogo from '../../assets/logo.svg';
import { useState } from "react";

const sidebarLinks = ['Home', 'DMs', 'Channels'];
const sidebarIcons = [HiHome, LuMessagesSquare, GrGroup];

const ClientSidebar = () => {
    return (
        <div className='w-[70px] h-grow-10 pt-[10px] pb-[24px] flex flex-col justify-between items-center bg-[#E8E8E9]'>
            <div>
                {sidebarLinks.map((link, idx) => {
                    const IconComponent = sidebarIcons[idx];
                    return (
                        <div className='group w-[52px] h-[68px] flex flex-col justify-center items-center text-[#232123] cursor-pointer'>
                            <div className='w-[36px] h-[36px] flex justify-center items-center rounded-md hover:bg-[#a4a4a7]'>
                                <IconComponent size={20} className='transform group-hover:scale-110 transition-transform duration-500' />
                            </div>
                            <span className='text-xs font-[500]'>{link}</span>
                        </div>
                    );
                })}
            </div>
            <img className='h-[36px] cursor-pointer' src={SlimLogo} alt='Slim logo' />
        </div>
    );
};

export default ClientSidebar;

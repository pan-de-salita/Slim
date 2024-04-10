const HomeSidebar = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='w-full h-full bg-[#7db64330] rounded-tl-md rounded-bl-md flex flex-col justify-start items-center gap-3 pl-[8px] pr-[12px] overflow-y-auto scroll-smooth'>
            {children}
        </div>
    );
};

export default HomeSidebar;

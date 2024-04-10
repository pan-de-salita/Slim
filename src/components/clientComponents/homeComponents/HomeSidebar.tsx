const HomeSidebar = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='w-full h-full bg-[#f3f3f3] rounded-tl-md rounded-bl-md flex flex-col justify-start items-center gap-3 pl-[8px] pr-[12px] overflow-auto no-scrollbar scroll-smooth'>
            {children}
        </div>
    );
};

export default HomeSidebar;

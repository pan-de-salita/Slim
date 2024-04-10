const HomeSidebarHeader = () => {
    return (
        <div className='w-full h-[49px] flex justify-between items-center pt-10 pb-7' >
            <div className='w-full flex flex-col'>
                <span className='truncate px-[8px] text-[#474748]'>Workspace:</span>
                <h1 className='truncate px-[8px] pb-[3px] text-xl font-bold'>http://206.189.91.54/api/v1</h1>
            </div>
        </div>
    );
};

export default HomeSidebarHeader;

import { User } from "../../../types/userType";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { IoMdArrowDropright } from "react-icons/io";

const HomeSidebarList = (
    {
        listType,
        list,
        isExpandList,
        handleExpandList,
    }: {
        listType: string,
        list: User[],
        isExpandList: boolean,
        handleExpandList: () => void,
    }
) => {
    return (
        <div className='w-full flex flex-col text-[1rem] text-[#474748] font-[400]'>
            <button
                onClick={handleExpandList}
                className='w-fit flex justify-start items-center gap-1 hover:bg-[#d8d8da] px-0 py-1 pr-1 rounded-md outline-0'
            >
                <div className='w-[26px] h-[26px] flex justify-center items-center'>
                    <IoMdArrowDropright size={20} className={`${isExpandList ? `transform rotate-90` : `transform rotate-0`} transition-transform duration-200 ease-in-out`} />
                </div>
                <h3 className='pr-2'>{listType === 'channels' ? 'Channels' : 'DMs'}</h3>
            </button>
            <div className={isExpandList === true ? `block` : `hidden`}>
                {list.slice(0, 5).map(({ uid }: { uid: string }) => {
                    return (
                        <button
                            key={uid}
                            className='w-auto md:w-auto lg:w-full h-[28px] flex justify-between md:justify-start lg:justify-start items-center gap-2 hover:bg-[#d8d8da] rounded-md outline-0'
                        >
                            <div className='w-[26px] h-[26px] flex justify-center items-center'>
                                <BiSolidMessageSquareDetail color={listType === 'channels' ? '#7db643' : '#45c0f1'} />
                            </div>
                            <span className='truncate'>{uid}</span>
                            <span className='text-[#8f8d92]'>channel</span>
                        </button>
                    );
                })}
            </div>
        </div >
    );
};

export default HomeSidebarList;

import { User } from "../../../types/userType";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { IoMdArrowDropright } from "react-icons/io";
import { Channel } from "../../../types/Channel";

const HomeSidebarList = (
    {
        listType,
        list,
        isExpandList,
        handleExpandList,
        toggleChangeRecipients,
    }: {
        listType: 'Channel' | 'User',
        list: User[] | Channel[],
        isExpandList: boolean,
        handleExpandList: () => void,
        toggleChangeRecipients: (newRecipients: string) => void;
    }
) => {
    return (
        <div className='w-full flex flex-col text-[1rem] text-[#474748] font-[400]'>
            <div className='flex justify-between items-center'>
                <button
                    onClick={handleExpandList}
                    className='w-fit flex justify-start items-center gap-1 hover:bg-[#d8d8da] py-1 pr-1 rounded-md outline-0'
                >
                    <div className='w-[26px] h-[26px] flex justify-center items-center'>
                        <IoMdArrowDropright size={20} className={`${isExpandList ? `transform rotate-90` : `transform rotate-0`} transition-transform duration-200 ease-in-out`} />
                    </div>
                    <h3 className='pr-2'>{listType === 'Channel' ? 'Channels' : 'Direct messages'}</h3>
                </button>
            </div>
            <div className={isExpandList === true ? `block` : `hidden`}>
                {/* TODO: switch user with appropriate list */}
                {list.map((item) => {
                    return (
                        <button
                            key={item.id}
                            onClick={() => {
                                toggleChangeRecipients(item.uid)
                            }}
                            className='w-auto md:w-auto lg:w-full h-[28px] flex justify-between md:justify-start lg:justify-start items-center gap-2 hover:bg-[#d8d8da] rounded-md outline-0'
                        >
                            <div className='w-[26px] h-[26px] flex justify-center items-center'>
                                {
                                    listType === 'Channel'
                                        ? <BiSolidMessageSquareDetail color='#7db643' />
                                        : <div className={`my-2 h-[20px] w-[20px] flex justify-center items-center ${item.uid && item.uid.length % 2 === 0 ? 'bg-green-800' : item.uid && item.uid.length % 3 === 0 ? 'bg-red-800' : 'bg-blue-800'} rounded-md w-[24px] h-[24px]`}>
                                            <span className='w-full h-auto text-xs leading-tight font-bold text-white text-center'>{item.uid ? item.uid[0].toUpperCase() : ''}</span>
                                        </div>

                                }
                            </div>
                            <span className='truncate'>{listType === 'Channel' ? item.name : item.uid}</span>
                            <span className='text-[#8f8d92]'>{listType === 'Channel' ? 'channel' : 'guest'}</span>
                        </button>
                    );
                })}
            </div>
        </div >
    );
};

export default HomeSidebarList;

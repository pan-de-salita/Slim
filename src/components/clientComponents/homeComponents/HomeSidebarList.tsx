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
                    <div className='w-[1.625rem] h-[1.625rem] flex justify-center items-center'>
                        <IoMdArrowDropright size={20} className={`${isExpandList ? `transform rotate-90` : `transform rotate-0`} transition-transform duration-200 ease-in-out`} />
                    </div>
                    <h3 className='pr-2'>{listType === 'Channel' ? 'Channels' : 'Direct messages'}</h3>
                </button>
            </div>
            <div className={isExpandList === true ? `block` : `hidden`}>
                {list.map((item) => {
                    return (
                        <button
                            key={item.id}
                            onClick={() => {
                                console.log(item)
                                if (listType === 'User') {
                                    toggleChangeRecipients(item.uid);
                                } else {
                                    toggleChangeRecipients(item.id);
                                }
                            }}
                            className='w-auto md:w-auto lg:w-full h-[1.75rem] flex justify-between md:justify-start lg:justify-start items-center gap-2 hover:bg-[#d8d8da] rounded-md outline-0'
                        >
                            <div className='w-[1.625rem] h-[1.625rem] flex justify-center items-center'>
                                {
                                    listType === 'Channel'
                                        ? <div className={`my-2 h-[1.25rem] w-[1.25rem] flex justify-center items-center bg-blue-800 rounded-md`}>
                                            <span className='w-full h-auto text-xs leading-tight font-bold text-white text-center'>{item.uid ? item.uid[0].toUpperCase() : item.name[0].toUpperCase()}</span>
                                        </div>

                                        : <div className={`my-2 h-[1.25rem] w-[1.25rem] flex justify-center items-center bg-green-800 rounded-md`}>
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

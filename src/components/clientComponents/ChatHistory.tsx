import { ChatMessages } from "../../types/ChatMessages";
import { formatDate } from "../../utils/dateAndTimeFunctions";
import { getFromLocalStorage } from "../../utils/localStorageFunctions";
import profilePicture from '../../assets/profilePicture.jpeg'
import { useEffect } from "react";

interface ChatHistoryProps {
    messages?: ChatMessages[],
    messagesEndRef: React.RefObject<HTMLDivElement>,
};

const ChatHistory = (
    { messages, messagesEndRef }: ChatHistoryProps
) => {
    useEffect(() => {

    })
    return (
        <>
            {
                messages.map((item: ChatMessages) => {
                    return (
                        <div key={item.date} className='w-full py-[0.5rem] '>
                            {
                                item.date
                                    ? <div className='w-full flex items-center py-1'>
                                        <div className='flex-grow h-[1px] bg-[#e3e3e2]' />
                                        <span className='z-1 py-1 px-4 text-sm font-bold border-[1px] border-solid border-[#e3e3e2] rounded-3xl'>{item.date === formatDate(new Date()) ? 'Today' : item.date}</span>
                                        <div className='flex-grow h-[1px] bg-[#e3e3e2]' />
                                    </div>
                                    : <div></div>
                            }
                            <div>
                                {item.messages.map(({ time, text, isShowDetails }, idx) => {
                                    return (
                                        <div
                                            key={text + time + idx}
                                            className={`group hover:bg-[#d8d8da50] px-[20px] flex ${isShowDetails ? 'items-start' : 'items-center'} gap-2 py-[0.1rem]`}
                                        >
                                            {
                                                isShowDetails
                                                    ? <img className='my-2 h-[36px] w-[36px] rounded-md' src={profilePicture} alt='Placeholder for profile picture' />
                                                    : <div className='h-[36px] w-[36px] flex justify-end items-center'>
                                                        <span className='invisible group-hover:visible text-[0.7rem] text-gray-500 pr-2'>{time.slice(0, 5)}</span>
                                                    </div>
                                            }
                                            <div className={`flex flex-col ${isShowDetails ? 'justify-start' : 'justify-center'} min-w-0`}>
                                                {
                                                    isShowDetails
                                                        ? <div className='flex items-center gap-2'>
                                                            <span className='text-md font-bold h-content'>{getFromLocalStorage('user')}</span>
                                                            <span className='text-xs pt-1 text-gray-600'>{time}</span>
                                                        </div>
                                                        : <div></div>
                                                }
                                                <p className='w-full break-words text-md'>{text}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })
            }
            < div ref={messagesEndRef} className='h-0' />
        </>
    );
};

export default ChatHistory;

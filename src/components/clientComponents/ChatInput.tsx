import { useForm } from "react-hook-form";
import { formatDate, formatTime, getMinutes } from "../../utils/dateAndTimeFunctions";
import { useState } from "react";
import { ChatMessages } from "../../types/ChatMessages";
import { IoSend } from "react-icons/io5";

type FormValue = {
    message: string,
};

const ChatInput = (
    { lastIsShowDetails, handleMessages }: { lastIsShowDetails: string, handleMessages: React.Dispatch<React.SetStateAction<ChatMessages[]>> }
) => {
    const [currentIsShowDetailsTime, setCurrentIsShowDetailsTime] = useState(lastIsShowDetails);
    const [textAreaContent, setTextAreaContent] = useState('');
    const {
        register,
        handleSubmit,
        reset,
        setValue,
    } = useForm<FormValue>();

    const messageSlimbot = ({ message }: { message: string }) => {
        const newDate = formatDate(new Date());
        const newTime = formatTime(new Date());
        const isMoreThanTenMinutes = Math.abs(getMinutes(currentIsShowDetailsTime) - getMinutes(newTime)) >= 10;

        if (isMoreThanTenMinutes) {
            setCurrentIsShowDetailsTime(newTime);
        }

        handleMessages((prev): ChatMessages[] => {
            if (prev[prev.length - 1].date !== formatDate(new Date())) {
                return [
                    ...prev,
                    {
                        date: newDate,
                        messages: [
                            {
                                time: newTime,
                                text: message,
                                isShowDetails: true
                            }
                        ],
                    },
                ];
            }

            return [
                ...prev.slice(0, prev.length - 1),
                {
                    ...prev[prev.length - 1],
                    messages: [
                        ...prev[prev.length - 1].messages,
                        {
                            time: newTime,
                            text: message,
                            isShowDetails: !isMoreThanTenMinutes ? false : true,
                        },
                    ],
                },
            ];
        });

        reset();
        const textarea = document.querySelector('textarea')!;
        textarea.style.height = 'auto';
        setTextAreaContent('');
    };

    const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && textAreaContent.trim() !== '') {
            e.preventDefault();
            messageSlimbot({ message: e.currentTarget.value });
            setValue('message', '');
        }
    };

    return (
        <div className='px-[20px] w-full h-auto mb-[1.6rem]'>
            <form
                onSubmit={handleSubmit(messageSlimbot)}
                className='h-full flex flex-col justify-between items-center rounded-lg border-[1px] border-solid border-[#e3e3e2] focus-within:border-[#bbbbba]'>
                <textarea
                    {...register('message')}
                    onChange={(e) => {
                        setTextAreaContent(e.currentTarget.value);
                        e.currentTarget.style.height = 'auto';
                        const maxHeight = window.innerHeight / 4;
                        if (e.currentTarget.scrollHeight <= maxHeight) {
                            e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
                        } else {
                            e.currentTarget.style.height = maxHeight + 'px';
                        }
                    }}
                    onKeyDown={(e) => handleEnter(e)}
                    className='w-full p-2 resize-none outline-none placeholder-[#1d1c1d90] no-scrollbar rounded-lg' placeholder='Message Slimbot' spellCheck={false} rows={1}>
                </textarea>
                <div className={`w-full flex justify-end items-center gap-2 ${textAreaContent.trim() === '' ? 'bg-gray-100' : 'bg-[#007b5b20]'} rounded-bl-lg rounded-br-lg`}>
                    {
                        textAreaContent.trim() === ''
                            ? <div></div>
                            : <span className='text-xs text-gray-700'>Hit <span className='font-bold'>Enter</span> to send message</span>
                    }
                    <button
                        type='submit'
                        className={`w-[28px] h-[28px] flex justify-center items-center rounded-br-md outline-none ${textAreaContent.trim() === '' ? 'bg-gray-100' : 'bg-[#007b5b]'}`}
                        disabled={textAreaContent.trim() === '' ? true : false}>
                        <IoSend color={textAreaContent.trim() === '' ? 'gray' : 'white'} />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChatInput;

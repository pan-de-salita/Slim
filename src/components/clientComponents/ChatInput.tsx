import { useForm } from "react-hook-form";
import { formatDate, formatTime, getMinutes } from "../../utils/dateAndTimeFunctions";
import { useState } from "react";
import { ChatMessages } from "../../types/ChatMessages";
import { IoSend } from "react-icons/io5";
import { getFromLocalStorage } from "../../utils/localStorageFunctions";
import { User } from "../../types/userType";
import { handleSendMessage } from "../../adapters/api/apiCallPost";

type FormValue = {
    message: string,
};

interface ChatInputProps {
    lastIsShowDetails: string,
    handleMessages?: React.Dispatch<React.SetStateAction<ChatMessages[]>>,
    recipientType?: 'string',
    recipient?: User,
};

const ChatInput = ({ lastIsShowDetails, handleMessages, recipient, recipientType }: ChatInputProps) => {
    const [currentIsShowDetailsTime, setCurrentIsShowDetailsTime] = useState(lastIsShowDetails);
    const [textAreaContent, setTextAreaContent] = useState('');
    const {
        register,
        handleSubmit,
        reset,
        setValue,
    } = useForm<FormValue>();

    const messageSlimbot = ({ message }: { message: string }) => {
        const currentUser = getFromLocalStorage('user');
        const newDate = formatDate(new Date());
        const newTime = formatTime(new Date());
        const isMoreThanTenMinutes = lastIsShowDetails ? Math.abs(getMinutes(currentIsShowDetailsTime) - getMinutes(newTime)) >= 10 : true;

        if (isMoreThanTenMinutes) {
            setCurrentIsShowDetailsTime(newTime);
        }

        handleMessages((prev) => {
            if (prev.length >= 1) {
                if (prev[prev.length - 1].date !== formatDate(new Date())) {
                    return [
                        ...prev,
                        {
                            date: newDate,
                            messages: [
                                {
                                    currentSender: currentUser,
                                    time: newTime,
                                    text: message,
                                    isShowDetails: true,
                                    lastIsShowDetails: newDate,
                                }
                            ],
                        },
                    ];
                } else {
                    return [
                        ...prev.slice(0, prev.length - 1),
                        {
                            ...prev[prev.length - 1],
                            messages: [
                                ...prev[prev.length - 1].messages,
                                {
                                    currentSender: currentUser,
                                    time: newTime,
                                    text: message,
                                    isShowDetails: !isMoreThanTenMinutes ? false : true,
                                    lastIsShowDetails: !isMoreThanTenMinutes ? newTime : getMinutes(currentIsShowDetailsTime),
                                },
                            ],
                        },
                    ];
                }
            }

            return [
                {
                    date: newDate,
                    messages: [
                        {
                            currentSender: currentUser,
                            time: newTime,
                            text: message,
                            isShowDetails: true,
                            lastIsShowDetails: newTime,
                        },
                    ],
                },
            ]
        });

        console.log(recipient)
        console.log('sent to slimbot')
        reset();
        const textarea = document.querySelector('textarea')!;
        textarea.style.height = 'auto';
        setTextAreaContent('');
    };

    const messagePerson = ({ message }: { message: string }) => {
        handleSendMessage({
            receiver_id: recipient!.id,
            receiver_class: recipientType!,
            body: message,
        });

        console.log(`sent to ${recipient}`)
        reset();
        const textarea = document.querySelector('textarea')!;
        textarea.style.height = 'auto';
        setTextAreaContent('');

    };

    const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && textAreaContent.trim() !== '') {
            e.preventDefault();
            if (recipient) {
                messagePerson({ message: e.currentTarget.value });
            } else {
                messageSlimbot({ message: e.currentTarget.value });
            }
            setValue('message', '');
        }
    };

    return (
        <div className='bg-transparent px-[20px] w-full h-auto mb-[1.6rem]'>
            <form
                onSubmit={handleSubmit(recipient ? messagePerson : messageSlimbot)}
                className='h-full flex flex-col justify-between items-center rounded-md border-[1px] border-solid border-[#e3e3e2] focus-within:border-[#bbbbba]'>
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
                    className='w-full p-2 resize-none outline-none placeholder-[#1d1c1d90] no-scrollbar rounded-tl-md rounded-tr-md' placeholder='Message Slimbot' spellCheck={false} rows={1}>
                </textarea>
                <div className={`p-1 w-full flex justify-end items-center gap-2 bg-white rounded-bl-md rounded-br-md`}>
                    {
                        textAreaContent.trim() === ''
                            ? <div></div>
                            : <span className='text-xs text-gray-700'>Hit <span className='font-bold'>Enter</span> to send message</span>
                    }
                    <button
                        type='submit'
                        className={`w-[28px] h-[28px] flex justify-center items-center rounded-md outline-none ${textAreaContent.trim() === '' ? 'bg-[#F9F9F8]' : 'bg-[#007b5b]'}`}
                        disabled={textAreaContent.trim() === '' ? true : false}>
                        <IoSend color={textAreaContent.trim() === '' ? 'gray' : 'white'} />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChatInput;

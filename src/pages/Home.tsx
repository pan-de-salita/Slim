import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { SearchUsersContext } from "../contexts/SearchUsersContext";
import HomeSidebar from "../components/clientComponents/homeComponents/HomeSidebar";
import HomeSidebarHeader from "../components/clientComponents/homeComponents/homeSidebarHeader";
import HomeSidebarList from "../components/clientComponents/homeComponents/HomeSidebarList";
import { ExpandListValue } from "../types/ExpandListValue";
import slimBot from '../assets/slim-bot.png';
import { IoSend } from "react-icons/io5";
import profilePicture from '../assets/profilePicture.jpeg'
import { formatDate, formatTime, getMinutes } from "../utils/dateAndTimeFunctions";
import useLocalStorage from "../hooks/useLocalStorage";
import { defaultSlimbotChatHistory } from "../constants/defaultSlimbotChatHistory";

type FormValue = {
  message: string,
};

interface ChatMessages {
  date: string,
  messages: { time: string, text: string, isShowDetails: boolean }[],
};

const Home = () => {
  // TODO: get appropriate users per list
  const users = useContext(SearchUsersContext);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [slimbotChatHistory, setSlimbotChatHistory] = useLocalStorage('slimbotChatHistory', defaultSlimbotChatHistory);
  const [textAreaContent, setTextAreaContent] = useState('');
  const [currentTime, setCurrentTime] = useState(formatTime(new Date()));
  const [expandList, setExpandList] = useState({
    channels: true,
    dms: true,
  });
  const [messagesToSlimbot, setMessagesToSlimbot] = useState<ChatMessages[]>(slimbotChatHistory);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
  } = useForm<FormValue>();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messagesToSlimbot]);

  const toggleExpand = (listType: keyof ExpandListValue) => {
    setExpandList((prev) => ({
      ...prev,
      [listType]: !prev[listType],
    }));
  };

  const messageSlimbot = ({ message }: { message: string }) => {
    const newDate = formatDate(new Date());
    const newTime = formatTime(new Date());
    const isMoreThanTenMinutes = Math.abs(getMinutes(currentTime) - getMinutes(newTime)) >= 10;

    if (isMoreThanTenMinutes) {
      setCurrentTime(newTime);
    }

    setMessagesToSlimbot((prev): ChatMessages[] => {
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
    textarea.style.height = 'auto'; // Reset to auto to allow for dynamic resizing based on content
    setTextAreaContent('');
  };

  useEffect(() => {
    setSlimbotChatHistory(messagesToSlimbot);
  }, [messagesToSlimbot]);

  const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && textAreaContent.trim() !== '') {
      e.preventDefault();
      messageSlimbot({ message: e.currentTarget.value });
      setValue('message', '');
    }
  };

  return (
    <div className='w-full h-full grid grid-cols-[26%_auto] bg-white rounded-md shadow-2xl mr-1'>
      <HomeSidebar>
        <HomeSidebarHeader />
        <HomeSidebarList
          listType={'channels'}
          list={users}
          isExpandList={expandList.channels}
          handleExpandList={() => toggleExpand('channels')} />
        <HomeSidebarList
          listType={'dms'}
          list={users}
          isExpandList={expandList.dms}
          handleExpandList={() => toggleExpand('dms')} />
      </HomeSidebar>

      {/* slackbot */}
      <div className='w-full h-full flex flex-col shadow-xl rounded-tr-md rounded-br-md overflow-hidden'>
        {/* header */}
        <div className='pl-[20px] pr-[12px] py-[3px] h-[49px] flex justify-between'>
          <div className='flex items-center gap-2'>
            <img className='bg-purple-900 rounded-md w-[24px] h-[24px]' src={slimBot} alt='SlimBot profile picture' />
            <span className='text-xl font-black text-[#1d1c1d]'>Slimbot</span>
          </div>
        </div>
        <div className='w-full border-b-[1px] border-solid border-[#e3e3e2] b-t-0 b-l-0 b-r-0'></div>
        {/* chatview */}
        <div className={`mb-[1rem] w-full flex-grow flex flex-col items-center overflow-y-auto`}>
          <div className='h-[50rem]' />
          <div className='px-[20px] w-full pt-5'>
            <h2 className='text-3xl font-black pb-[1rem]'>Hi, Slimbot here!</h2>
            <div className='flex items-start gap-8'>
              <img className='mt-2 bg-purple-900 rounded-md w-[48px] h-[48px]' src={slimBot} alt='SlimBot profile picture' />
              <div className='flex flex-col justify-start text-lg font-md'>
                <p className='pb-[1rem]'>You’re here! Hello!</p>
                <p className='pb-[1rem]'>I am not a human. Just a bot. But I’m programmed to 'feel' happy you're here!</p>
                <p className='pb-[1rem]'>Go ahead and send me a message. I will get back to you as soon as I learn how.</p>
              </div>
            </div>
          </div>
          {messagesToSlimbot.map((item: ChatMessages) => {
            return (
              <div key={item.date} className='w-full pt-[0.5rem] '>
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
                        className={`group hover:bg-[#d8d8da50] px-[20px] flex ${isShowDetails ? 'items-start' : 'items-center'} gap-2 py-[0.05rem]`}
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
                                <span className='text-md font-bold h-content'>you</span>
                                <span className='text-xs pt-1'>{time}</span>
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
          })}
          <div ref={messagesEndRef} className='h-0' />
        </div>
        {/* input */}
        <div className='px-[20px] w-full h-auto mb-[1.6rem]'>
          <form
            onSubmit={handleSubmit(messageSlimbot)}
            className='h-full flex flex-col justify-between items-center rounded-lg border-[1px] border-solid border-[#e3e3e2] focus-within:border-[#bbbbba]'>
            <textarea
              {...register('message')}
              onChange={(e) => {
                setTextAreaContent(e.currentTarget.value);
                e.currentTarget.style.height = 'auto';
                const maxHeight = window.innerHeight / 4; // Half the screen height
                if (e.currentTarget.scrollHeight <= maxHeight) {
                  e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
                } else {
                  e.currentTarget.style.height = maxHeight + 'px';
                }
              }}
              onKeyDown={(e) => handleEnter(e)}
              className='w-full p-2 resize-none outline-none placeholder-[#1d1c1d90] no-scrollbar rounded-lg' placeholder='Message Slimbot' spellCheck={false} rows={1}>
            </textarea>
            <div className={`w-full flex justify-end items-center gap-2 ${textAreaContent.trim() === '' ? 'bg-gray-100' : 'bg-[#007b5b20]'} rounded-bl-md rounded-br-md`}>
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
      </div>
    </div >
  );
};

export default Home;

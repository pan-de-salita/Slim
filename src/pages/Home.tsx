import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { SearchUsersContext } from "../contexts/SearchUsersContext";
import HomeSidebar from "../components/clientComponents/homeComponents/HomeSidebar";
import HomeSidebarHeader from "../components/clientComponents/homeComponents/homeSidebarHeader";
import HomeSidebarList from "../components/clientComponents/homeComponents/HomeSidebarList";
import { ExpandListValue } from "../types/ExpandListValue";
import slimBot from '../assets/slim-bot.png';
import { IoSend } from "react-icons/io5";

type FormValue = {
  message: string,
};

const Home = () => {
  // TODO: get appropriate users per list
  const users = useContext(SearchUsersContext);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [expandList, setExpandList] = useState({
    channels: true,
    dms: true,
  });
  const [messagesToSlimbot, setMessagesToSlimbot] = useState({
    date: new Date(),
    messages: [],
  })
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FormValue>();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messagesToSlimbot.messages]);

  const toggleExpand = (listType: keyof ExpandListValue) => {
    setExpandList((prev) => ({
      ...prev,
      [listType]: !prev[listType],
    }));
  };

  const sendMessageToSlimbot = ({ message }: { message: string }) => {
    setMessagesToSlimbot((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
    reset();
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
        <div className={`px-[20px] mb-[1rem] w-full h-[80%] flex flex-col items-center overflow-y-auto`}>
          <div className='h-[50rem]' />
          <div className='w-full pt-5'>
            <h2 className='text-3xl font-black pb-[1rem]'>Hi, Slimbot here!</h2>
            <div className='flex items-start gap-8'>
              <img className='bg-purple-900 rounded-md w-[48px] h-[48px]' src={slimBot} alt='SlimBot profile picture' />
              <div className='flex flex-col justify-start text-lg font-md'>
                <p className='pb-[1rem]'>You’re here! Hello!</p>
                <p className='pb-[1rem]'>I am not a human. Just a bot. But I’m programmed to 'feel' happy you're here!</p>
                <p className='pb-[1rem]'>Feel free to send me messages! I will get back to you as soon as I learn how.</p>
              </div>
            </div>
          </div>
          {messagesToSlimbot.messages.map((message) => {
            return <div>{message}</div>
          })}
          <div ref={messagesEndRef} className='h-0' />
        </div>
        {/* input */}
        <div className='px-[20px] w-full h-[8rem]  pb-[1.6rem]'>
          <form
            onSubmit={handleSubmit(sendMessageToSlimbot)}
            className='relative h-full flex flex-col items-center rounded-md border-[1px] border-solid border-[#e3e3e2] focus-within:border-[#bbbbba]'>
            <textarea
              {...register('message')}
              className='w-full h-full p-2 resize-none outline-none placeholder-[#1d1c1d90] no-scrollbar rounded-md' placeholder='Message Slimbot' spellCheck={false}>
            </textarea>
            <button type='submit' className='absolute right-1 bottom-1 w-[28px] h-[28px] flex justify-center items-center bg-[#7db643] rounded-md'>
              <IoSend />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;

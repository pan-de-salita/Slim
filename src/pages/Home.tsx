import { useContext, useEffect, useRef, useState } from "react";
import { SearchUsersContext } from "../contexts/SearchUsersContext";
import HomeSidebar from "../components/clientComponents/homeComponents/HomeSidebar";
import HomeSidebarHeader from "../components/clientComponents/homeComponents/homeSidebarHeader";
import HomeSidebarList from "../components/clientComponents/homeComponents/HomeSidebarList";
import { ExpandListValue } from "../types/ExpandListValue";
import useLocalStorage from "../hooks/useLocalStorage";
import { defaultSlimbotChatHistory } from "../constants/defaultSlimbotChatHistory";
import ChatView from "../components/clientComponents/ChatView";
import ChatHeader from "../components/clientComponents/ChatHeader";
import SlimbotIntro from "../components/clientComponents/homeComponents/SlimbotIntro";
import ChatHistory from "../components/clientComponents/ChatHistory";
import ChatInput from "../components/clientComponents/ChatInput";

interface ChatMessages {
  date: string,
  messages: { time: string, text: string, isShowDetails: boolean }[],
};

const Home = () => {
  // TODO: get appropriate users per list
  const users = useContext(SearchUsersContext);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [slimbotChatHistory, setSlimbotChatHistory] = useLocalStorage('slimbotChatHistory', defaultSlimbotChatHistory);
  const [messagesToSlimbot, setMessagesToSlimbot] = useState<ChatMessages[]>(slimbotChatHistory);
  const [expandList, setExpandList] = useState({
    channels: true,
    dms: true,
  });
  const toggleExpand = (listType: keyof ExpandListValue) => {
    setExpandList((prev) => ({
      ...prev,
      [listType]: !prev[listType],
    }));
  };

  useEffect(() => {
    setSlimbotChatHistory(messagesToSlimbot);
  }, [messagesToSlimbot]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messagesToSlimbot]);

  const getLastIsShowDetails = (): string => {
    let lastIsShowDetailsTime = '';

    for (const message of messagesToSlimbot[messagesToSlimbot.length - 1].messages) {
      if (message.isShowDetails === true) {
        lastIsShowDetailsTime = message.time;
        break;
      }
    }

    return lastIsShowDetailsTime;
  }

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
      <ChatView>
        <ChatHeader recipientName={'Slimbot'} />
        <div className={`w-full flex-grow flex flex-col items-center overflow-y-auto scroll-smooth`}>
          <div className='h-[50rem]' />
          <SlimbotIntro />
          <ChatHistory messages={messagesToSlimbot} messagesEndRef={messagesEndRef} />
        </div>
        <ChatInput
          lastIsShowDetails={getLastIsShowDetails()}
          handleMessages={setMessagesToSlimbot} />
      </ChatView >
    </div >
  );
};

export default Home;

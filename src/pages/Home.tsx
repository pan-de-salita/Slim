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
import { useFetchAvailableUsers } from "../hooks/apiHooks";

interface ChatMessages {
  date: string,
  messages: { time: string, text: string, isShowDetails: boolean }[],
};

const Home = () => {
  const usersAndChannels = useContext(SearchUsersContext);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const availableUsers = useFetchAvailableUsers(usersAndChannels);
  const [slimbotChatHistory, setSlimbotChatHistory] = useLocalStorage('slimbotChatHistory', defaultSlimbotChatHistory);

  const [messagesToSlimbot, setMessagesToSlimbot] = useState<ChatMessages[]>(slimbotChatHistory);
  const [expandList, setExpandList] = useState({ channels: true, dms: true, });
  const [isTalkingToSlimbot, setIsTalkingToSlimbot] = useState(true);
  const [recipients, setRecipients] = useState('Slimbot');

  const toggleExpand = (listType: keyof ExpandListValue) => {
    setExpandList((prev) => ({
      ...prev,
      [listType]: !prev[listType],
    }));
  };

  const getLastIsShowDetails = (): string => {
    let lastIsShowDetailsTime = '';

    for (const message of messagesToSlimbot[messagesToSlimbot.length - 1].messages) {
      if (message.isShowDetails === true) {
        lastIsShowDetailsTime = message.time;
      }
    }

    return lastIsShowDetailsTime;
  };

  const talkToSomeoneElse = () => {
    setIsTalkingToSlimbot(false);
  };

  const changeRecipients = (newRecipients: string) => {
    setRecipients(newRecipients);
  };

  useEffect(() => {
    setSlimbotChatHistory(messagesToSlimbot);

    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messagesToSlimbot]);

  return (
    <div className='w-full h-full grid grid-cols-[25%_auto] bg-white rounded-md shadow-2xl mr-1'>
      <HomeSidebar>
        <HomeSidebarHeader />
        <HomeSidebarList
          listType={'Channel'}
          list={usersAndChannels.channels.data || []}
          isExpandList={expandList.channels}
          handleExpandList={() => toggleExpand('Channel')}
          toggleChangeRecipients={changeRecipients}
        />
        <HomeSidebarList
          listType={'User'}
          list={availableUsers || []}
          isExpandList={expandList.dms}
          handleExpandList={() => toggleExpand('User')}
          toggleChangeRecipients={changeRecipients}
        />
      </HomeSidebar>
      <ChatView>
        <ChatHeader recipientName={recipients} />
        <div className={`w-full flex-grow flex flex-col items-center overflow-y-auto scroll-smooth`}>
          <div className='h-[50rem]' />
          {recipients === 'Slimbot' ? <SlimbotIntro /> : null}
          {recipients === 'Slimbot'
            ? <ChatHistory messages={messagesToSlimbot} messagesEndRef={messagesEndRef} />
            : <ChatHistory messagesEndRef={messagesEndRef} />
          }
        </div>
        <ChatInput
          lastIsShowDetails={getLastIsShowDetails()}
          handleMessages={setMessagesToSlimbot} />
      </ChatView >
    </div >
  );
};

export default Home;

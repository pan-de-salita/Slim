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
  const availableUsers = useFetchAvailableUsers(usersAndChannels);
  const [slimbotChatHistory, setSlimbotChatHistory] = useLocalStorage('slimbotChatHistory', defaultSlimbotChatHistory);
  const [messagesToSlimbot, setMessagesToSlimbot] = useState<ChatMessages[]>(slimbotChatHistory);
  const [expandList, setExpandList] = useState({ Channel: true, User: true, });
  const [recipientsUid, setRecipientsUid] = useState('Slimbot');
  const [recipientsType, setRecipientsType] = useState('Slimbot');

  const toggleExpand = (listType: keyof ExpandListValue) => {
    setExpandList((prev) => ({
      ...prev,
      [listType]: !prev[listType],
    }));
  };

  const getLastIsShowDetails = (): string => {
    let lastIsShowDetailsTime = '';

    if (messagesToSlimbot.length >= 1) {
      for (const message of messagesToSlimbot[messagesToSlimbot.length - 1].messages) {
        if (message.isShowDetails === true) {
          lastIsShowDetailsTime = message.time;
        }
      }
    }

    return lastIsShowDetailsTime;
  };

  const changeRecipients = (newRecipients: string) => {
    console.log(typeof newRecipients)
    setRecipientsUid(newRecipients);
    setRecipientsType(typeof newRecipients === 'string' ? 'User' : 'Channel');
  };

  useEffect(() => {
    console.log(usersAndChannels.channels.data)
    setSlimbotChatHistory(messagesToSlimbot);

  }, [messagesToSlimbot]);

  return (
    <div className='w-full h-full grid grid-cols-[25%_auto] bg-white rounded-md shadow-2xl mr-1'>
      <HomeSidebar>
        <HomeSidebarHeader />
        <HomeSidebarList
          listType={'Channel'}
          list={usersAndChannels.channels.data || []}
          isExpandList={expandList.Channel}
          handleExpandList={() => toggleExpand('Channel')}
          toggleChangeRecipients={changeRecipients}
        />
        <HomeSidebarList
          listType={'User'}
          list={availableUsers || []}
          isExpandList={expandList.User}
          handleExpandList={() => toggleExpand('User')}
          toggleChangeRecipients={changeRecipients}
        />
      </HomeSidebar>
      <ChatView>
        <ChatHeader
          recipientType={recipientsType}
          recipientName={typeof recipientsUid === 'string' ? recipientsUid : usersAndChannels.channels.data.filter((channel) => channel.id === recipientsUid)[0]}
          availableUsers={usersAndChannels.users.data}
        />
        <div className={`w-full flex-grow flex flex-col items-center overflow-y-auto scroll-smooth`}>
          <div className='h-[50rem]' />
          <SlimbotIntro recipient={typeof recipientsUid === 'string' ? recipientsUid : usersAndChannels.channels.data.filter((channel) => channel.id === recipientsUid)[0].name} />
          {recipientsUid === 'Slimbot'
            ? <ChatHistory messages={messagesToSlimbot} />
            : <ChatHistory
              recipient={recipientsType === 'User'
                ? availableUsers.filter((user) => user.uid === recipientsUid)[0]
                : usersAndChannels.channels.data.filter((channel) => channel.id === recipientsUid)[0]}
            />
          }
        </div>
        {
          recipientsUid === 'Slimbot'
            ? <ChatInput
              lastIsShowDetails={getLastIsShowDetails()}
              handleMessages={setMessagesToSlimbot}
            />
            : <ChatInput
              recipientType={recipientsType}
              recipient={
                typeof recipientsUid === 'string'
                  ? availableUsers.filter((user) => user.uid === recipientsUid)[0]
                  : usersAndChannels.channels.data.filter((channel) => channel.id === recipientsUid)[0]
              }
              lastIsShowDetails={getLastIsShowDetails()}
            />
        }
      </ChatView >
    </div >
  );
};

export default Home;

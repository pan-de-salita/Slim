import { useContext, useState } from "react";
import { SearchUsersContext } from "../contexts/SearchUsersContext";
import HomeSidebar from "../components/clientComponents/homeComponents/HomeSidebar";
import HomeSidebarHeader from "../components/clientComponents/homeComponents/homeSidebarHeader";
import HomeSidebarList from "../components/clientComponents/homeComponents/HomeSidebarList";
import { ExpandListValue } from "../types/ExpandListValue";

const Home = () => {
  // TODO: get appropriate users per list
  const users = useContext(SearchUsersContext);
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
      <div className='z-1 shadow-xl rounded-tr-md rounded-br-md'>

      </div>
    </div >
  );
};

export default Home;

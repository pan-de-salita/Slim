import { useContext, useState } from "react";
import { SearchUsersContext } from "../contexts/SearchUsersContext";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { IoMdArrowDropright } from "react-icons/io";

const Home = () => {
  const users = useContext(SearchUsersContext);
  const [expandList, setExpandList] = useState({
    channels: true,
    dms: true,
  });

  return (
    <div className='w-full h-full grid grid-cols-[26%_auto] bg-white rounded-md shadow-2xl mr-1'>
      {/* sidebar */}
      <div className='w-full h-full bg-[#f3f3f3] rounded-tl-md rounded-bl-md flex flex-col justify-start items-center gap-3 pl-[8px] pr-[12px] overflow-auto no-scrollbar scroll-smooth'>

        {/* header */}
        <div className='w-full h-[49px] flex justify-between items-center pt-10 pb-7'>
          <div className='w-full flex flex-col'>
            <span className='truncate px-[8px] text-[#474748]'>Workspace:</span>
            <h1 className='truncate px-[8px] pb-[3px] text-xl font-bold'>http://206.189.91.54/api/v1</h1>
          </div>
        </div>

        {/* channels */}
        <div className='w-full flex flex-col text-[1rem] text-[#474748] font-[400]'>
          <button
            onClick={() => setExpandList(({ channels }) => {
              return { ...expandList, channels: !channels };
            })}
            className='w-fit flex justify-start items-center gap-1 hover:bg-[#d8d8da] px-0 py-1 pr-1 rounded-md outline-0'>
            <div className='w-[26px] h-[26px] flex justify-center items-center'>
              <IoMdArrowDropright size={20} className={`${expandList.channels ? `transform rotate-90` : `transform rotate-0`} transition-transform duration-200 ease-in-out`} />
            </div>
            <h3 className='pr-2'>Channels</h3>
          </button>
          <div className={expandList.channels === true ? `block` : `hidden`}>
            {users.slice(0, 5).map(({ uid }: { uid: string }) => {
              return (
                <button key={uid} className='w-auto md:w-auto lg:w-full h-[28px] flex justify-between md:justify-start lg:justify-start items-center gap-2 hover:bg-[#d8d8da] rounded-md outline-0'>
                  <div className='w-[26px] h-[26px] flex justify-center items-center'>
                    <BiSolidMessageSquareDetail color='#7db643' />
                  </div>
                  <span className='truncate'>{uid}</span>
                  <span className='text-[#8f8d92]'>channel</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* DMs */}
        <div className='w-full  flex flex-col text-[1rem] text-[#474748] font-[400]'>
          <button
            onClick={() => setExpandList(({ dms }) => {
              return { ...expandList, dms: !dms };
            })}
            className='w-fit flex justify-start items-center gap-1 hover:bg-[#d8d8da] px-0 py-1 pr-1 rounded-md outline-0'
          >
            <div className='w-[26px] h-[26px] flex justify-center items-center'>
              <IoMdArrowDropright size={20} className={`${expandList.dms ? `transform rotate-90` : `transform rotate-0`} transition-transform duration-200 ease-in-out`} />
            </div>
            <h3 className='pr-2'>Direct Messages</h3>
          </button>
          <div className={expandList.dms === true ? `block` : `hidden`}>
            {users.slice(0, 155).map(({ uid }: { uid: string }) => {
              return (
                <button key={uid} className='w-auto md:w-auto lg:w-full h-[28px] flex justify-between md:justify-start lg:justify-start items-center gap-2 hover:bg-[#d8d8da] rounded-md outline-0'>
                  <div className='w-[26px] h-[26px] flex justify-center items-center'>
                    <BiSolidMessageSquareDetail color='#45c0f1' />
                  </div>
                  <span className='truncate'>{uid}</span>
                  <span className='text-[#8f8d92]'>guest</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* slackbot */}
      <div className='z-1 shadow-xl rounded-tr-md rounded-br-md'>

      </div>
    </div >
  )
}

export default Home;

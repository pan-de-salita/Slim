import { User } from "../../../types/userType";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { IoMdArrowDropright } from "react-icons/io";

const HomeSidebarChannels = ({
  channels,
  isExpandChannels,
  handleExpandChannels,
}: {
  channels: User[];
  isExpandChannels: boolean;
  handleExpandChannels: () => void;
}) => {
  return (
    <div className="flex w-full flex-col text-[1rem] font-[400] text-[#474748]">
      <button
        onClick={handleExpandChannels}
        className="flex w-fit items-center justify-start gap-1 rounded-md px-0 py-1 pr-1 outline-0 hover:bg-[#d8d8da]"
      >
        <div className="flex h-[1.625rem] w-[1.625rem] items-center justify-center">
          <IoMdArrowDropright
            size={20}
            className={`${isExpandChannels ? `rotate-90 transform` : `rotate-0 transform`} transition-transform duration-200 ease-in-out`}
          />
        </div>
        <h3 className="pr-2">Channels</h3>
      </button>
      <div className={isExpandChannels === true ? `block` : `hidden`}>
        {channels.slice(0, 5).map(({ uid }: { uid: string }) => {
          return (
            <button
              key={uid}
              className="flex h-[1.75rem] w-auto items-center justify-between gap-2 rounded-md outline-0 hover:bg-[#d8d8da] md:w-auto md:justify-start lg:w-full lg:justify-start"
            >
              <div className="flex h-[1.625rem] w-[1.625rem] items-center justify-center">
                <BiSolidMessageSquareDetail color="#7db643" />
              </div>
              <span className="truncate">{uid}</span>
              <span className="text-[#8f8d92]">channel</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default HomeSidebarChannels;

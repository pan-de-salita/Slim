import { Outlet } from "react-router-dom";
import ClientSidebar from "../components/clientComponents/ClientSidebar";
import ClientToolbar from "../components/clientComponents/ClientToolbar";
import ModalContainer from "../components/clientComponents/ModalContainer";
import { useState } from "react";

const Client = () => {
  const [isOpenCreateChannelModal, setIsOpenCreateChannelModal] = useState(false);

  const handleCreateChannelModal = () => {
    setIsOpenCreateChannelModal((prev) => !prev);
  };

  return (
    <>
      <div className='relative w-screen h-screen flex flex-col items-around bg-[#7db643]'>
        <ClientToolbar />
        <div className='h-[95.6%] mb-1 mr-1 flex justify-between'>
          <ClientSidebar toggleOpenCreateChannelModal={handleCreateChannelModal} />
          <Outlet />
        </div>
      </div>
      <ModalContainer
        isCreateChannel={isOpenCreateChannelModal}
        toggleCloseCreateChannelModal={handleCreateChannelModal}
      />
    </>
  );
};

export default Client;

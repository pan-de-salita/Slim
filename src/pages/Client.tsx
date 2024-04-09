import { Outlet } from "react-router-dom";
import ClientSidebar from "../components/clientComponents/ClientSidebar";
import ClientToolbar from "../components/clientComponents/ClientToolbar";

const Client = () => {
  return (
    <div className='w-screen h-screen flex flex-col bg-[#E8E8E9]'>
      <ClientToolbar />
      <div className='h-full max-h-[95.7%] flex justify-between'>
        <ClientSidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default Client;

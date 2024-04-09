import ClientSidebar from "../components/clientComponents/ClientSidebar";
import ClientToolbar from "../components/clientComponents/ClientToolbar";

const Client = () => {
  return (
    <div className='w-screen h-screen flex flex-col'>
      <ClientToolbar />
      <div className='h-full flex justify-between'>
        <ClientSidebar />
      </div>
    </div>
  );
};

export default Client;

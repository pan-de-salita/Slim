const ChatView = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='w-full h-full flex flex-col shadow-xl rounded-tr-md rounded-br-md overflow-hidden'>
            {children}
        </div>
    );
};

export default ChatView;

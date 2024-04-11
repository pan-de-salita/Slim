import slimBot from '../../assets/slim-bot.png';

const ChatHeader = ({ recipientName }: { recipientName: string }) => {
    return (
        <>
            <div className='pl-[20px] pr-[12px] py-[3px] h-[49px] flex justify-between'>
                <div className='flex items-center gap-2'>
                    {
                        recipientName === 'Slimbot'
                            ? <img className='bg-purple-900 rounded-md w-[24px] h-[24px]' src={slimBot} alt='SlimBot profile picture' />
                            : <div className='flex justify-center items-center bg-purple-900 rounded-md w-[24px] h-[24px]'>
                                <span className='w-full h-full text-md text-white text-center'>{recipientName[0]}</span>
                            </div>
                    }
                    <span className='text-xl font-black text-[#1d1c1d]'>{recipientName}</span>
                </div>
            </div >
            <div className='w-full border-b-[1px] border-solid border-[#e3e3e2] b-t-0 b-l-0 b-r-0'></div>
        </>
    );
};

export default ChatHeader;

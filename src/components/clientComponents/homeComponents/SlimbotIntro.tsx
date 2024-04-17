import slimBot from '../../../assets/slim-bot.png';

const SlimbotIntro = ({ recipient }: { recipient: string }) => {
    return (
        <div className='px-[1.25rem] w-full pt-5'>
            {
                recipient === 'Slimbot'
                    ? <h2 className='text-3xl font-black pb-[1rem]'>Hi, Slimbot here!</h2>
                    : <h2 className='text-3xl font-black pb-[1rem]'>{recipient}</h2>
            }
            <div className='flex items-start gap-8'>
                {
                    recipient === "Slimbot"
                        ? <img className='mt-2 bg-purple-900 rounded-md w-[3rem] h-[3rem]' src={slimBot} alt='SlimBot profile picture' />
                        : <div className={`my-2 h-[3rem] w-[3rem] flex justify-center items-center ${recipient && recipient.length % 2 === 0 ? 'bg-green-800' : recipient && recipient.length % 3 === 0 ? 'bg-red-800' : 'bg-blue-800'} rounded-md w-[3rem] h-[3rem]`}>
                            <span className='w-[3rem] h-auto text-xl leading-tight font-bold text-white text-center'>{recipient ? recipient[0].toUpperCase() : ''}</span>
                        </div>
                }
                {
                    recipient === 'Slimbot'
                        ? <div className='flex flex-col justify-start text-lg font-md'>
                            <p className='pb-[1rem]'>Beep boop! Hello!</p>
                            <p className='pb-[1rem]'>If it is your first time here, open a channel with the people you want to message. After, you can speak with the channel members individually or in a group.</p>
                            <p className='pb-[1rem]'>Got questions? Send me a message and I will get back to you as soon as I learn how.</p>
                        </div>
                        : <div className='flex flex-col justify-start text-lg font-md'>
                            <p className='pb-[1rem]'>You added {recipient}!</p>
                            <p className='pb-[1rem]'>This is a private conversation. Say hello!</p>
                        </div>
                }
            </div>
        </div>
    );
};

export default SlimbotIntro;

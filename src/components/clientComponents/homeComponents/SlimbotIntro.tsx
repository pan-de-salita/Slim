import slimBot from '../../../assets/slim-bot.png';

const SlimbotIntro = () => {
    return (
        <div className='px-[20px] w-full pt-5'>
            <h2 className='text-3xl font-black pb-[1rem]'>Hi, Slimbot here!</h2>
            <div className='flex items-start gap-8'>
                <img className='mt-2 bg-purple-900 rounded-md w-[48px] h-[48px]' src={slimBot} alt='SlimBot profile picture' />
                <div className='flex flex-col justify-start text-lg font-md'>
                    <p className='pb-[1rem]'>Beep boop! Hello!</p>
                    <p className='pb-[1rem]'>If it is your first time here, open a channel with the people you want to message. After, you can speak with the channel members individually or in a group.</p>
                    <p className='pb-[1rem]'>Got questions? Send me a message and I will get back to you as soon as I learn how.</p>
                </div>
            </div>
        </div>
    );
};

export default SlimbotIntro;

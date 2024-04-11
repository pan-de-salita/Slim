import slimBot from '../../../assets/slim-bot.png';

const SlimbotIntro = () => {
    return (
        <div className='px-[20px] w-full pt-5'>
            <h2 className='text-3xl font-black pb-[1rem]'>Hi, Slimbot here!</h2>
            <div className='flex items-start gap-8'>
                <img className='mt-2 bg-purple-900 rounded-md w-[48px] h-[48px]' src={slimBot} alt='SlimBot profile picture' />
                <div className='flex flex-col justify-start text-lg font-md'>
                    <p className='pb-[1rem]'>You’re here! Hello!</p>
                    <p className='pb-[1rem]'>I am not a human. Just a bot. But I’m programmed to 'feel' happy you're here!</p>
                    <p className='pb-[1rem]'>Go ahead and send me a message. I will get back to you as soon as I learn how.</p>
                </div>
            </div>
        </div>
    );
};

export default SlimbotIntro;

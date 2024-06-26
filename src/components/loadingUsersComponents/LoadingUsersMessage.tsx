import { useState, useEffect } from 'react';

const LoadingUsersMessage = () => {
    const [dots, setDots] = useState('.');

    useEffect(() => {
        let intervalId;
        let count = 0;

        const updateDots = () => {
            count = (count + 1) % 3;
            switch (count) {
                case 0:
                    setDots('.');
                    break;
                case 1:
                    setDots('..');
                    break;
                case 2:
                    setDots('...');
                    break;
                default:
                    setDots('.');
            }
        };

        intervalId = setInterval(updateDots, 400);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className='flex justify-center'>
            <div>
                <span className='text-[2.188rem] md:text-[2.375rem] lg:text-[2.375rem] font-black mb-[0.625rem] text-center text-[#1d1c1d] pt-4'>
                    Loading your workspace
                </span>
            </div>
            <div className='w-[3rem]'>
                <span className='text-[2.188rem] md:text-[2.375rem] lg:text-[2.375rem] font-black mb-[0.625rem] text-center text-[#1d1c1d] pt-4'>{dots}</span>
            </div>
        </div>
    );
};

export default LoadingUsersMessage;

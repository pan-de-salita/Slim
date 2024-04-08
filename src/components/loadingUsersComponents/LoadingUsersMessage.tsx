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
        <div>
            <h1 className='text-[35px] md:text-[38px] lg:text-[38px] font-black mb-[10px] text-center text-[#1d1c1d] pt-4'>
                {'Loading your workspace' + dots}
            </h1>
        </div>
    );
};

export default LoadingUsersMessage;

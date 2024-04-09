import { useState, useEffect } from 'react';

const LoadingUsersMessage = () => {
    return (
        <div>
            <h1 className='text-[35px] md:text-[38px] lg:text-[38px] font-black mb-[10px] text-center text-[#1d1c1d] pt-4'>
                Loading your workspace
            </h1>
        </div>
    );
};

export default LoadingUsersMessage;

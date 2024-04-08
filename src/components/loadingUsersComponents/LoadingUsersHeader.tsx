import React from 'react';

const LoadingUsersHeader = (
      { children }: { children: React.ReactNode }
) => {
      return (
            <header className='w-full h-[126.133px] flex justify-center items-center  pb-10 pt-10'>
                  {children}
            </header>
      );
};

export default LoadingUsersHeader;

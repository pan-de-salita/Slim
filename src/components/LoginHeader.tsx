import React from 'react';

const LoginHeader = (
  { children }: { children: React.ReactNode }
) => {
  return (
    <header className='w-full h-[126.133px] grid grid-cols-3 items-center pb-10 pt-10'>
      <div className='col-start-1 col-end-2'></div>
      {children}
    </header>
  );
};

export default LoginHeader;

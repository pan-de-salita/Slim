const LoginMain = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='w-full max-w-[50rem] flex flex-col justify-center items-center' >
      {children}
    </main >
  );
};

export default LoginMain;

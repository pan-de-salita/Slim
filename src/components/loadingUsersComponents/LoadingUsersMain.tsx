const LoadingUsersMain = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className='w-full max-w-[800px] flex flex-col justify-center items-center' >
            {children}
        </main >
    );
};

export default LoadingUsersMain;

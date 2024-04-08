import { Oval } from "react-loader-spinner"

const LoadingUsersSpinner = () => {
    return (
        <Oval
            visible={true}
            height="70"
            width="70"
            color="#7db643"
            ariaLabel="oval-loading"
            wrapperStyle={{ paddingTop: '8rem' }}
            wrapperClass=''
        />
    );
};

export default LoadingUsersSpinner;

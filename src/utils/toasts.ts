import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export function toastSuccess(msg: string) {
      return toast.success(msg, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            style: {
                  background: '#7db643',
                  color: 'white',
            },
      });
}

export function toastError(msg: string) {
      return toast.error(msg, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            style: {
                  background: '#17171B',
                  color: 'white',
            },
      });

}

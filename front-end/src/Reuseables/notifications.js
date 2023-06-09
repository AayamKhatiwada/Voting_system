import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const SuccessNoty = (message) => {
    return toast.success(message,{
        autoClose: 3000,
    })
}

export const ErrorNoty = (message) => {
    return toast.error(message,{
        autoClose: 3000,
    })
}
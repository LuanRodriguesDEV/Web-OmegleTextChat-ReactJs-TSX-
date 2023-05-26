import { toast,ToastPromiseParams } from "react-toastify"
import './toasty.css';
const style :object = {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light"
}

export const Notification = {
    success: function(message: string){
        toast.success(message,style)
    },
    info: function(message: string){
        toast.info(message,style)
    },
    warn: function(message: string){
        toast.warn(message,style)
    },
    error: function(message: string){
        toast.error(message,style)
    }
}
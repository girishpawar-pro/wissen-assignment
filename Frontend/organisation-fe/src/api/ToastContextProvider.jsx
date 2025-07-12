import { createContext, useState } from "react";

export const initialToastContext = {
    show: false, 
    details: {
        severity: "",
        heading: "",
        message: ""
    },
    popToast: () => {}
}

export const ToastContext = createContext(initialToastContext);

const ToastContextProvider = ({children}) =>{

    const [toast, setToast] = useState({
         show: false, 
         details: {
            severity: "",
            heading: "",
            message: ""
        }
    });

    const handlePopToast = (toastObj) => {
        setToast(toastObj);
    }

    const toastCtxValue = {
        show: toast.show, 
        details: {
            severity: toast.details.severity,
            heading: toast.details.heading,
            message: toast.details.message
        },
        popToast: handlePopToast
    }

    return<ToastContext value={toastCtxValue}>{children}</ToastContext>
}

export default ToastContextProvider;
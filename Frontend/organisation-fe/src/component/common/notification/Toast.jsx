import React, { useContext } from 'react'
import "./toast.css";
import { ToastContext } from '../../../api/ToastContextProvider';

export const Toast = () => {
  const {show, details} = useContext(ToastContext);
  return (
    <div className={`toast-notification`}>
        {show && <div className={`toast-container ${details.severity}`}>
            <div className='toast-head'>
                <div className='toast-heading'>{details.heading}</div>
            </div>
            <div className='toast-body'>
                <div className='toast-message' style={{color: "black"}}>{details.message}</div>
            </div>
        </div>}
    </div>
  )
}

export default Toast;
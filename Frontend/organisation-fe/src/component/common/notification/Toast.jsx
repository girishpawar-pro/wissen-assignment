import React from 'react'
import "./toast.css";

export const Toast = ({heading, message, severity}) => {
  return (
    <div className={`toast-notification`}>
        <div className={`toast-container ${severity}`}>
            <div className='toast-head'>
                <div className='toast-heading'>{heading}</div>
            </div>
            <div className='toast-body'>
                <div className='toast-message' style={{color: "black"}}>{message}</div>
            </div>
        </div>
    </div>
  )
}

export default Toast;
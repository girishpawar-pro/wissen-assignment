import React from 'react'

export const Button = ({buttonLabel, clickHandler, inlineStyle}) => {
    
    return (
    <div>
        <button 
            onClick={clickHandler}
            style={inlineStyle}
        >
        {buttonLabel}
        </button>
    </div>
    )
}

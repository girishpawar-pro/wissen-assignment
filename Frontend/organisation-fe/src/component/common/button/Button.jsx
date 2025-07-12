import React from 'react'

export const Button = ({buttonLabel, clickHandler, inlineStyle, isDisabled}) => {
    
    return (
    <div>
        <button 
            onClick={clickHandler}
            style={inlineStyle}
            disabled={isDisabled}
        >
        {buttonLabel}
        </button>
    </div>
    )
}

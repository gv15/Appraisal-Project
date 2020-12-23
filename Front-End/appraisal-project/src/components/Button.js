import React from 'react';
const Button = (props)=>{
    return (
        <div>
            <button className={props.buttonClass} onClick={props.onClick}>{props.buttonFor}</button>
        </div>
    )
}
export default Button;
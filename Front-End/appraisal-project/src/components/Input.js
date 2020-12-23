import React from 'react';
const Input = props => {
   
  
    return (<div>
        <label>{props.labelFor}</label>
        <input id={props.id} type={props.inputType} className={props.inputClass} onChange = {props.onTyping} />
    </div>)
}
export default Input;
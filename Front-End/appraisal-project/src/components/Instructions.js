import React from 'react';
import { message } from "../utils/constants";
import Header from "./header";
import axios from 'axios';
import Button from "./Button";
const Instruction = (props) => {
    return (
        <div>
            <Header title="Instructions" titleClass="alert-info text-center" />
            <h4 className='text-left text-danger text-center'>Welcome {props.name}</h4>
            <p>{message}</p>
            <Button buttonFor="Start" buttonClass="btn btn-warning" onClick={() => {
                
                props.history.push("/dashboard");
            }} />
        </div>
    )
}

export default Instruction;
import React, { useState } from 'react';
import Header from "./header";
import Input from "./Input";
import Button from "./Button";
import {checkIfSomethingMissing, validateEmail} from "../utils/util";
import {constants} from "../utils/constants";
import axios from 'axios';

const Register = (props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    function returnSetState(id){
        let func;
        switch(id){
            case "name":func = setName; break;
            case "email" : func = setEmail; break;
            case "password" : func = setPassword; break;
            case "confirm" : func = setConfirm; break;
        }
        return func;
    }
    function captureInputField(event) {
        returnSetState(event.target.id)(event.target.value);
        console.log(name, email, password, confirm);
    }
    function registerData(){
        console.log(name, email, password, confirm)
        let check = checkIfSomethingMissing({
            name, email, password, confirm
        });
        let isEveryThingOk = true;
        if(check.length==0){
            if(!validateEmail(email)){
                alert("Enter Valid Email");
                isEveryThingOk = false;
             }
             if(password != confirm){
                 alert("Password and Confirm Password do not match");
                 isEveryThingOk = false;
             }
             

        }
        else{
            let message = ''
            for(let i=0; i<check.length; i++){
                message += check[i];
                if(i!=check.length-1){
                    message+=",";
                }
            }
            alert(message);
            isEveryThingOk = false;
        }
        if(!isEveryThingOk)
        {
            return;
        }
        let url = constants.serverBaseUrl + constants.register;
        axios.post(url, {
            name,email, password
        }).then(
            response=>{
                alert(response.data.message);
                if(response.data.isRegSuccess){
                    props.history.push('/');
                }
            }
        ).catch(
            err=>{
                alert(err.response.data.message);
            }
            );
    }


    return (
        <div>
            <Header title="Register" titleClass="alert-secondary text-center"
                onTyping={captureInputField} />
            <Input labelFor="Name" id="name" inputType="text" inputClass="form-control"
                onTyping={captureInputField} />
            <Input labelFor="Email" id="email" inputType="text" inputClass="form-control"
                onTyping={captureInputField} />
            <Input labelFor="Password" id="password" inputType="password" inputClass="form-control"
                onTyping={captureInputField} />
            <Input labelFor="Confirm Password" id="confirm" inputType="password" inputClass="form-control"
                onTyping={captureInputField} />
            <br />
            <Button buttonFor="Register" buttonClass="btn btn-warning" onClick={registerData} />
        </div>
    )
}

export default Register;
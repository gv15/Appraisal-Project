import React, {useState} from 'react';
import Input from './Input';
import Header from "./header";
import Button from "./Button";
import { validateEmail } from "../utils/util";
import axios from 'axios';
import {constants} from "../utils/constants";
import { Link } from 'react-router-dom';

const Login = (props)=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    

    function captureChildState(event){
        if(event.target.type == "text"){
            setEmail(event.target.value);
        }
        if(event.target.type == "password"){
            setPassword(event.target.value);
        }
        
    }
    function submitForm(event){
        event.target.className = "btn btn-success";
        if(email == '' || password ==''){
            alert("email or password missing")
            event.target.className = "btn btn-primary";
            return;
        }
        if(!validateEmail(email)){
            alert("Invalid Email!! Please Enter Valid Email");
            event.target.className = "btn btn-primary";
            return;

        }
        //Axios Call
        axios.post(
            `${constants.serverBaseUrl}${constants.login}`,
            {
            email, password
        }
        ).then((response)=>{
            if(response.status==200){
                console.log(response.data);
                props.action(response.data.name);
                sessionStorage.token = response.data.webToken;
                props.history.push("/instruction");
            }
        }).catch((err)=>{
            if(err.response){
            
            if(!err.response.data.isRegistered){
                props.history.push('/register');
                alert("Not Registered Register First!!!");
                return;
            }
            alert(err.response.data.message);
            return;
            }
            alert("Some error has occured at backend");
            console.log(err);
        })
       
    }
    return(
        <div>
            <Header title="Login" titleClass="text-center alert-primary" />
            <Input labelFor="Email" inputType="text" inputClass="form-control" onTyping = {captureChildState} />
            <Input labelFor="Password" inputType="password" inputClass = "form-control" onTyping = {captureChildState} />
            <br />
            <Button buttonFor = "Login" buttonClass="btn btn-primary" onClick = {submitForm} />
            <span><Link to="/Register">New User?Register Here</Link></span>
        </div>
    )
}
export default Login;
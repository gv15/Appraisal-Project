import React from 'react';
import Header from '../components/header';
import Login from '../components/Login';
import Register from "../components/Register";
import Dashboard from '../components/QuestionDashboard';
import Coding from '../components/Coding';
import Instruction from "../components/Instructions";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import {constants} from "../utils/constants";


export default class Appraisal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            name: '',
            time:null,
            testStarted:false
        };
        this.changeAuth = this.changeAuth.bind(this);
        this.toggleAuth = this.toggleAuth.bind(this);
        this.startTest = this.startTest.bind(this);
    }
    
     checkToken(token){

        const url = constants.serverBaseUrl+constants.port+constants.tokenValidation;
        return axios.post(url, {token})
        
    }
    startTest(){
        
        this.setState({
            ...this.state,
            testStarted:true
        })
    }
    componentDidMount(){
        console.log("Component DID MOutn")
        if(localStorage.token){
        this.checkToken(localStorage.token)
        .then((result)=>{
          //  console.log(result);
            if(result.data.isTokenValid){
                console.log("Valid Token");
                this.setState(
                    {
                        isAuthenticated:true,
                        name:result.data.name
                    }
                )
            }
        })
        }
    }

    changeAuth(username) {
        this.setState({
            isAuthenticated: true,
            name: username
        });
    }
    toggleAuth(){
        this.setState((prevState)=>{
            
           return {
                isAuthenticated:!(prevState.isAuthenticated),
                name:''
            }
        })
    }

    render() {
        console.log("Render", this.state);
        return (
            <BrowserRouter>
                <div className="container">
                    <Header title="Appraisal Portal" titleClass="text-center alert-info" />
                    <Switch>
                        <Route path="/" exact render={
                            (props) => {
                               
                                if (this.state.isAuthenticated) {
                                    return <Redirect to='/instruction' from="/" />
                                }
                                else
                                    return <Login {...props} action={this.changeAuth} />
                            }} />
                        <Route path="/register" exact component={Register} />
                        <Route path="/dashboard" exact render={
                            props => {
                                if (this.state.isAuthenticated) {
                            return <Dashboard {...props} name={this.state.name} 
                            action={this.toggleAuth} startTest={this.startTest} 
                                    time = {this.state.time} 
                            />
                                }
                               // alert("Login First!!!!");
                                return <Redirect to='/' from="/dashboard" />
                            }
                        } />
                        <Route path="/instruction" exact render={
                            props => {
                                if (this.state.isAuthenticated) {
                                    return <Instruction {...props} name={this.state.name} />
                                }
                                else
                                   // alert("Login First");
                                return <Redirect to='/' from='/instruction' />

                            }
                        } />
                        <Route path="/question/:quesName" render={(props)=>{
                            return <Coding {...props} action ={this.toggleAuth} />
                        }} name={this.state.name} time={this.state.time} startTest={this.startTest} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}
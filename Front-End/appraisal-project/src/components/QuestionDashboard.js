import React, { useEffect, useState } from 'react';
import Header from './header';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import { constants } from '../utils/constants';
import { Link } from 'react-router-dom';

const QuestionDashboard = (props) => {
    const [questions, setQuestions] = useState([]);
    useEffect(() => {
        console.log('requesting')
        const probUrl = constants.serverBaseUrl + constants.port + constants.problems+constants.all;
        axios({
            method: "GET",
            url: probUrl,
            headers:{
                bearer :localStorage.token
            }
        })
            .then((response) => {
                console.log(props);
                setQuestions(response.data);
            })
            .catch((error) => {
                
                console.log(error.response);
                 if(error.response.status==401){
                     alert("Unauthorized token invalid");
                      props.action();
                    props.history.replace('/');
                    return;
                 }
                 alert("Error in Fetching Questions");
                console.log(error);
            })
    }, [])

    let jsx;
    if (questions.length != 0) {
        jsx =
        <div>
            <h4 className='text-right text-secondary'>{props.name}</h4> 
        {questions.map((question, index) => {
            let qLink = `/question/${question.title}`
            let innerLink = `${index + 1}. ${question.title}`
            return (
                <div key={question.title}>
                    <Link to={qLink} >{innerLink}</Link>
                    <br />
                </div>
            )
        })}
        </div>
    }
    else
        jsx = <h4 className="text-center text-secondary">Fetching Questions.............</h4>
    return (


        <div>
            <Header title="Questions" titleClass="text-center alert-success" />
            {
                jsx
            }
        </div>
    )
}
export default QuestionDashboard;
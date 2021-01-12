import React, { useEffect, useState } from 'react';
import Header from './header';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { constants } from '../utils/constants';
import Countdown from 'react-countdown';
import { Link } from 'react-router-dom';

const QuestionDashboard = (props) => {

    const [questions, setQuestions] = useState([]);
    useEffect(() => {
       
        const probUrl = constants.serverBaseUrl + constants.problems + constants.all;
        axios({
            method: "GET",
            url: probUrl,
            headers: {
                bearer: sessionStorage.token
            }
        })
            .then((response) => {
                
                sessionStorage.x= parseInt(response.data[4]);
                sessionStorage.setItem('questions', JSON.stringify(response.data));
                props.startTest();
                setQuestions(response.data);
               
            })
            .catch((error) => {

                console.log(error.response);
                if (error.response.status == 401) {
                    alert("Unauthorized token invalid");
                    props.action();
                    props.history.replace('/');
                    return;
                }
                alert("Error in Fetching Questions");
                console.log(error);
            })
    }, [])
    function onTick(timer) {
        
        sessionStorage.setItem('x', timer.total);
    }
    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            return <span>Timer Completed</span>;
        } else {
            // Render a countdown
            return <span>{hours}:{minutes}:{seconds}</span>;
        }
    };



    
   


    if (questions.length != 0)
     
        return (
            <div>
                <Header title="Questions" titleClass="text-center alert-success" />

                <Countdown className="text-left text-danger"
                    date={Date.now() + parseInt(sessionStorage.x) -60000}
                    
                    onTick = {onTick}
                />
                <h4 className='text-right text-secondary'>{props.name}</h4>
                {
                    questions.map((question, index) => {
                        if(index!=4){
                        let qLink = `/question/${question.title}`
                        let innerLink = `${index + 1}. ${question.title}`
                        return (
                            <div key={question.title}>
                                <Link to={qLink} >{innerLink}</Link>
                                <br />
                            </div>
                        )
                        }
                    })
                }
            </div>

        )
    else
        return (
            <div>
                <Header title="Questions" titleClass="text-center alert-success" />
                <h4 className="text-center text-secondary">
                    Fetching Questions.............
       </h4>
            </div>
        )
}
export default QuestionDashboard;
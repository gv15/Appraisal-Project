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
        console.log('requesting')
        const probUrl = constants.serverBaseUrl + constants.port + constants.problems + constants.all;
        axios({
            method: "GET",
            url: probUrl,
            headers: {
                bearer: localStorage.token
            }
        })
            .then((response) => {
               
               
                console.log("Questions", response.data)
                let time = calculateTime(response.data);
                if(!sessionStorage.getItem('x'))
                sessionStorage.x= time;
                console.log(sessionStorage)
                console.log(time);
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



    function calculateTime(questions) {
        let timeInMs = 0
        questions.forEach(question => {
            console.log(question.level);
            if (question.level == "Easy") {
                timeInMs += 900000

            }
            if (question.level == "Medium") {
                timeInMs += 1800000

            }
            if (question.level == "Hard") {
                timeInMs += 2700000

            }
        });
        return timeInMs;
    }
   


    if (questions.length != 0)
     
        return (
            <div>
                <Header title="Questions" titleClass="text-center alert-success" />

                <Countdown className="text-left text-danger"
                    date={Date.now() + parseInt(sessionStorage.x)}
                    
                    onTick = {onTick}
                />
                <h4 className='text-right text-secondary'>{props.name}</h4>
                {
                    questions.map((question, index) => {
                        let qLink = `/question/${question.title}`
                        let innerLink = `${index + 1}. ${question.title}`
                        return (
                            <div key={question.title}>
                                <Link to={qLink} >{innerLink}</Link>
                                <br />
                            </div>
                        )
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
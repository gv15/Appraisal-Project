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
           
            <p className='text-center'>You are requested to read all the instructions thoroughly before proceeding to the appraisal test.</p>
           <ol>
               <li> Your test will contain coding questions selected by your organization.</li>
               <li> You will be required to provide solutions, and who will then be evaluated based on the number of test cases their solution passes.</li>
               <li> Easy Questions have the least weightage, and have a time limit of 15 minutes</li>
               <li> Medium Questions have medium weightage, and have a time limit of 30 minutes.</li>
               <li> Hard Questions have the highest weightage, and have a time limit of 45 minutes.</li>
               <li> Overall Time for the test is dynamically decided based on the questions selected by your organization.</li>
               <li> You can code in the provided coding area, and then submit it once.</li>
               <li> Kindly make sure you have read and understood the question, the inputs and outputs, and that you've considered the boundary conditions.</li>
               <li> You can compile their code and ensure lack of errors, however the number of test cases passed will not be made available untill the end.</li>
               <li>  Your result will be immediately made available to your organization, upon completion. A termination midway will also be reflected in your records.</li>
               <li> Kindly make sure you submit the code, as there is no auto submit. Code written but not submitted cannot be considered.</li>
               <li>  Once you have started the exam, stopping mid way will be counted as end. The same exam cannot be started again.</li>
               <li>In case of any technical difficulties, kindly contact your test coordinators</li>
               
           </ol>
            <Button buttonFor="Start" buttonClass="btn btn-warning" onClick={() => {
                
                props.history.push("/dashboard");
            }} />
        </div>
    )
}

export default Instruction;
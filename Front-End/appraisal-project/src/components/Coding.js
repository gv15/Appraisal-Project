import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { constants } from "../utils/constants";
import Countdown from 'react-countdown';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-c_cpp';
import "ace-builds/src-noconflict/mode-java"; //To Support Java
import "ace-builds/src-noconflict/theme-github"; //To Import theme
import "ace-builds/src-noconflict/ext-language_tools"; //To enable AutoCompletion and other Stuff
import 'ace-builds/src-noconflict/snippets/java'; // To Support Java Snippets
import 'ace-builds/src-noconflict/theme-monokai';
import '../styles/editor.css'

const Coding = (props) => {

    const [question, setQuestion] = useState({});
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('c_cpp');
    const { match } = props;
    // const textStyle = {
    //     "text-align":"justify",
    //     "font-size":"10px"
    // }
    const problemUrl = constants.serverBaseUrl + constants.port + constants.problems + "/" + match.params.quesName;
    var jsx = (<div className="text-success text center">Fetching Question.....</div>);
    useEffect(() => {
       
        
        
        axios.get(problemUrl, {
            headers:{bearer:localStorage.token}
        })
            .then((response) => {
               
                setQuestion(response.data);
                localStorage.setItem(response.data.title, JSON.stringify({}));
            })
            .catch((err) => {
                if(err.response.status == 401){
                    alert("Unauthorized Request!! Please login again");
                    props.action();
                    props.history.replace('/');
                }
                if(err.response.status == 502){
                    alert("Database Error!!Try again after sometime");
                    console.log(err);
                }
            })
    }, [])
    function handleChange(event){
        setLanguage(event.target.value);
    }
    function onEditorLoad(editor) {
        editor.focus();

    }
    function onChange(newValue, e) {
        setCode(newValue);
        
    }
    function compile(){
        let url = constants.serverBaseUrl+constants.port+constants.compile+"/"+language;
        console.log(url);
        axios.post(url, {
            code:code,
            q_id:question._id
        }, {
            headers:{
                bearer:localStorage.token
            }
        })
    }
    
    function onTick(timer){
        sessionStorage.setItem('x', timer.total);
    }
    return (
        (!question.title) ? (
            <div>
                <h3 className='alert-info text-center'>{match.params.quesName}</h3>
                <h6 className="text-left text-danger">{props.name}</h6>
                {jsx}
            </div>) :
            (
                <div>
                    <h3 className='alert-info text-center'>{match.params.quesName}</h3>
                    <h6 className="text-left text-danger">{props.name}</h6>
                    <Countdown 
                    date={Date.now()+parseInt(sessionStorage.x)}
                    className = "text-danger text-left"
                    onTick = {onTick}
                    />
                    <div className="col-display">
                    <div id='Question details' >
                        <p>Question: {question.question}</p>
                        <h6>Level: {question.level}</h6>
                    </div>



                    <div id='Editor' >
                        <select value={language}
                         onChange={handleChange} 
                         className='form-control'
                         >
                            <option  value="c_cpp">C++</option>
                            <option value="java">Java</option>
                        </select>
                        <AceEditor
                            theme="monokai"
                            mode={language}
                            onLoad={onEditorLoad}
                             width='550PX'
                             onChange = {onChange}
                            // height='300PX'
                            setOptions={{
                                enableBasicAutocompletion: true,
                                enableLiveAutocompletion: true,
                                fontSize: 16,
                                tabSize: 4,


                            }}
                        />
                        <br />
                        <button className="btn btn-primary" onClick = {compile}>Compile & Run</button>
                        
                        <button className="btn btn-success">Submit</button>
                    </div>
                    </div>

                </div>)

    )
}
export default Coding;
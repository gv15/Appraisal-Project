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
    const [language, setLanguage] = useState('java');
    const [compilerOutput, setCompilerOutput] = useState('');
    const { match } = props;
    // const textStyle = {
    //     "text-align":"justify",
    //     "font-size":"10px"
    // }
    const problemUrl = constants.serverBaseUrl + constants.problems + "/" + match.params.quesName;
    var jsx = (<div className="text-success text center">Fetching Question.....</div>);
    useEffect(() => {
        
    
        
        axios.get(problemUrl, {
            headers:{bearer:sessionStorage.token}
        })
            .then((response) => {
                console.log((Date.now()+response.data['timeLeft']))
                setQuestion(response.data);
                
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
        console.log("Language Changing to ", event.target.value);
        setLanguage(event.target.value);
    }
    function onEditorLoad(editor) {
        editor.focus();
        console.log("Editor Loaded");
    }
    function onChange(newValue, e) {
        if(sessionStorage['user_codes']){
            let user_codes = JSON.parse(sessionStorage['user_codes']);
            setUserCode(newValue, user_codes);
        }
        else{
            sessionStorage.setItem('user_codes', "{}");
        }
        
    }
    function setUserCode(code, obj){
        if(obj[question.title]){
            if(obj[question.title][language]){
                obj[question.title][language] = code;
            }
            else{
                obj[question.title][language] = {};
                obj[question.title][language] = code;
            }
            sessionStorage.setItem('user_codes', JSON.stringify(obj));
        }
        else{
            obj[question.title] = {};
            setUserCode(code, obj);
        }
    }
    function compile(){
       
        let url = constants.serverBaseUrl+constants.port+constants.compile+"/"+language;
        let user_code = JSON.parse(sessionStorage.user_codes)[question.title][language];
        
        axios.post(url, {
            code:user_code||question.code,
            q_id:question._id
        }, {
            headers:{
                bearer:sessionStorage.token
            }
        }).then((response)=>{
            setCompilerOutput(response.data.message);
        }).catch((err)=>{
            console.log(err.response);
        })
    }
    function returnDefaultCodeEditorValue(){
        //console.log("Running Default Code Value");
        if(!sessionStorage.getItem('user_codes')){
            return question['codes'][language]
        }
       let user_codes = JSON.parse(sessionStorage['user_codes']);
      
    //   console.log("language", language);
    //    if(user_codes[question.title]){
    //        console.log('returning',user_codes[question.title][language])
    //    }
    //    else{
    //     console.log('returning',question.codes[language])
       //}


       if(user_codes[question.title]){
        return user_codes[question.title][language]?user_codes[question.title][language]:question.codes[language]
    }
    else{
     console.log('returning',question.codes[language])
     return question.codes[language]
    }
    
    }
    
    function onTick(timer){
        sessionStorage.setItem('x', timer.total);
    }
    function handleCompileChange(event){
        console.log(event.target)
    }   
    function submitCode(){
        let code = JSON.parse(sessionStorage.user_codes)[question.title][language];
        let submitObject = {
           title:question.title,
           q_id:question['_id'],
           level:question['level'],
           code
        }
       axios.post(constants.serverBaseUrl+constants.port+constants.submit+"/"+language,
       submitObject,
       {headers:{bearer:sessionStorage.token}
       }
       ).then((response)=>{
        console.log(response.data.message)
           alert(response.data.message)
       }).catch((err)=>{
           alert(err.response.data.message);
       })
        
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
                    date={Date.now()+question["timeLeft"]}
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
                             value = {
                                 returnDefaultCodeEditorValue()?returnDefaultCodeEditorValue():''
                             }
                             height='400PX'
                            setOptions={{
                                enableBasicAutocompletion: true,
                                enableLiveAutocompletion: true,
                                fontSize: 16,
                                tabSize: 4,


                            }}
                        />
                        <br />
                        <button className="btn btn-primary" onClick = {compile}>Compile & Run</button>
                        
                        <button className="btn btn-success" onClick={submitCode} >Submit</button>
                        <br></br>
                        <label className='text-success'>Compiler Output</label>
                        <textarea readOnly className = 'form-control' rows="12" cols = '40' value={compilerOutput} onChange={handleCompileChange} />
                    </div>
                    </div>

                </div>)

    )
}
export default Coding;
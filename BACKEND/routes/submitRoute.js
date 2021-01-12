const express = require('express');
const submitRoute = express.Router();
const token = require('../utils/token');
const cp = require('child_process');
const fs = require('fs');
const usersubmissioncrud = require('../db/crud-helpers/usersubmissioncrud');
const scores = require("../utils/scores");
function submitTestCaseResult(obj, res){
    usersubmissioncrud.alreadySubmitted(obj.u_id, obj.p_id).then(
        (submission)=>{
        if(submission){
        usersubmissioncrud.replaceSubmission(obj).then(()=>{
        res.status(200).json({
            message:"Re-Submitted and Test Case Evaluated"
        })
    })
    }

         else{
        usersubmissioncrud.addSubmission(obj).then(()=>{
            res.status(200).json({
                message:"Submitted and Test Case Evaluated"
            })
        })
    }
    })
   
}
submitRoute.post("/java", (req, res)=>{
    let user = token.validate(req.headers.bearer);
   
    if(user.isTokenValid){
        
        
        fs.writeFileSync('./SubmissionCodes/Solution.java',req.body.code);//Wrong--> Code Copied
        const cmd = `javac Solution.java`;
        
        cp.exec(cmd, {cwd:`${process.cwd()}\\SubmissionCodes`}, (err, stdout, stderr)=>{
            if(stderr){
               
                res.status(200).json(
                    {
                        message:"Code is not error free click compile and run to check the errors"
                    }
                )
                return;
            }
            if(err){
                console.log("error", err)
                res.status(500).json({
                    message:'Server Compilation Process failed Your Code is saved please click submit again after some time! If error still exists please contact test administrators'
                })
                return;
            }
            
    
          
            cp.exec(`javac -cp junit-4.13.1.jar;. ${req.body.title.split(" ").join("")}Test.java"`,
                {cwd:`${process.cwd()}\\SubmissionCodes`},
               (err, stdout, stderr)=>{
                if(stderr){
                    console.log("error in test compilation", stderr);
                    return;
                }
                if(err){
                    res.status(500).json({
                        message:'Server test Compilation Process failed Your Code is saved please click submit again after some time! If error still exists please contact test administrators'
                    });
                    return;
                }
            })
            
            cp.exec(`java -cp junit-4.13.1.jar;.;hamcrest-core-1.3.jar org.junit.runner.JUnitCore ${req.body.title.split(" ").join("")}Test`, 
           {cwd:`${process.cwd()}\\SubmissionCodes`},
            (err, stdout, stderr)=>{
                if(stderr){
                    console.log("error in test execution", stderr);
                    res.status(500).json({
                        message:'Server Test execution Process failed Your Code is saved please click submit again after some time! If error still exists please contact test administrators'
                    });
                    return;
                }
                console.log(stdout);
                // res.status(200).json({message:stdout});
                // return;
                if(stdout.includes("OK")){
                   submitTestCaseResult({
                       u_id:user['user_id'],
                       p_id:req.body["q_id"],
                       score:scores[req.body.level]
                   });
                }
                if(stdout.includes("FAILURES")){
                    console.log("testCases",stdout.slice(-5), "total", stdout.slice(-19, -18))
                    let test = parseInt(stdout.slice(-5));
                    let total = parseInt(stdout.slice(-19, -18));
                   let incrementScore = ((total-test)/total)*scores[req.body.level];
                   console.log("Increment Score", incrementScore);
                   submitTestCaseResult({
                    u_id:user['user_id'],
                    p_id:req.body["q_id"],
                    score:incrementScore
                }, res);
                }
                
               
            }
            )
        })
    }
    else{
        res.status(401).json({
            message:"Unauthorized Request"
        })
    }
    
})
module.exports = submitRoute;
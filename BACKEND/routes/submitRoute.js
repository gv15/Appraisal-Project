const express = require('express');
const submitRoute = express.Router();
const token = require('../utils/token');
const cp = require('child_process');
const fs = require('fs');
submitRoute.post("/java", (req, res)=>{
    let user = token.validate(req.headers.bearer);
    if(user.isTokenValid){
        fs.writeFileSync('./SubmissionCodes/submit.java',req.body.code);//Wrong--> Code Copied
        const cmd = `javac "${process.cwd()}\\SubmissionCodes\\Solution.java"`;
      
        cp.exec(cmd, (err, stdout, stderr)=>{
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
                    message:'Server Compilation Process failed'
                })
                return;
            }
            
            
            res.status(200).json({
                message:"code compiled successfully"
            })
        })
    }
    else{
        res.status(401).json({
            message:"Unauthorized Request"
        })
    }
    
})
module.exports = submitRoute;
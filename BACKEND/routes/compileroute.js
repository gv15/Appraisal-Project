const express = require('express');
const compileRouter = express.Router();
const cp = require('child_process');
const token = require('../utils/token');
const fs = require('fs');
const { response } = require('express');

compileRouter.post('/java', (req, res)=>{
    
    let tokenValidationResponse = token.validate(req.headers.bearer);
    if(tokenValidationResponse.isTokenValid){
        
        fs.writeFileSync('./Solution.java',req.body.code);
        const cmd = `javac "${process.cwd()}\\Solution.java"`;
      
        cp.exec(cmd, (err, stdout, stderr)=>{
            if(stderr){
                console.log("Error in Code", stderr);
                stderr = stderr.slice(35)
                res.status(200).json(
                    {
                        message:stderr
                    }
                )
                return;
            }
            if(err){
                console.log("error", err)
                res.status(500).json({
                    message:'Server Error'
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
});

module.exports = compileRouter;
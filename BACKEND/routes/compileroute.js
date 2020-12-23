const express = require('express');
const compileRouter = express.Router();
const token = require('../utils/token');
const fs = require('fs');

compileRouter.post('/java', (req, res)=>{
    console.log(req.body);
    let tokenValidationResponse = token.validate(req.headers.bearer);
    if(tokenValidationResponse.isTokenValid){
        fs.writeFileSync('./A.java',req.body.code);
        res.send("Recieved Data");
    }
    else{
        res.status(401).json({
            message:"Unauthorized Request"
        })
    }
});

module.exports = compileRouter;
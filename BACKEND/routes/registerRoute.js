const express = require('express');
const usercrud = require("../db/crud-helpers/usercrud");
const utils = require("../utils/util");

const registerRoute = express.Router();
registerRoute.post("/register",async (req, res)=>{
    req.body.email = utils.firstWordSmall(req.body.email);
   isAlreadyRegistered = await usercrud.isRegisteredUser({email:req.body.email});
   if(isAlreadyRegistered){
       res.status(403).json({
           message:"Already Registered"
       })
       return;
   }
    usercrud.add({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    }).then(()=>{
        res.status(201).json({
            isRegSuccess:true,
            message:"Registration Sucessfull"});
    }).catch((err)=>{
        console.log(err);
        res.status(502).send({message:"Some DB Problem in Registration"});
    })
})
module.exports = registerRoute;
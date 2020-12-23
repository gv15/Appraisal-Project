const express = require('express');
const tokenUtil = require('../utils/token');

const tokenRoute = express.Router();
tokenRoute.post("/validatetoken", (req, res)=>{
    res.json(tokenUtil.validate(req.body.token));
})


module.exports = tokenRoute;
const express = require('express');
const questionCrud = require('../db/crud-helpers/problemcrud');
const problemInputOutputCrud = require("../db/crud-helpers/inputoutputcrud");
const quesTestCrud = require("../db/crud-helpers/questiontestcrud");
const problemLangCrud = require("../db/crud-helpers/problangcodecrud");

const addRoute = express.Router();

addRoute.post("/problem", (req, res)=>{
  
    questionCrud.add({title:req.body.title, 
        question:req.body.question, 
        level:req.body.level,
        companies:req.body.companies
    })
    .then(
        ()=>{
            res.send("Added");
        }
    )
    .catch((err)=>{
        
        res.send("Some DB Error"+err);
    })
    });
addRoute.post("/probinputoutput", (req, res)=>{
    problemInputOutputCrud.add(
        {
            pid:req.body.pid,
            input:req.body.input,
            output:req.body.output,
            status: req.body.status
        })
    .then(()=>{
        res.send("Succesfully inserted Test Case");
    })
    .catch((err)=>{
        res.send(err);
    })
})
addRoute.post("/questest", (req, res)=>{
    quesTestCrud.add({q_id:req.body.qid,
        test_id:req.body.testid
    })
    .then(()=>{
        res.send("Mapping Sucessfull");
    })
    .catch((err)=>{
        res.send("err:"+err);
    })
})

addRoute.post("/problemlanguagecode", (req, res)=>{
    problemLangCrud.add({
        p_id:req.body.p_id,
        language:req.body.lang,
        code:req.body.code
    }).then(()=>{
        res.send("Mapping Succesfull");
    }).catch((err)=>{
        res.send("error in mapping", err);
    })
})
module.exports = addRoute;

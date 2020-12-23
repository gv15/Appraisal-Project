const express = require('express');
const quesCrud = require("../db/crud-helpers/problemcrud");
const problemRouter = express.Router();
const tokenOperations = require('../utils/token');
problemRouter.get("/", (req, res) => {
    res.send("problem route");
})
problemRouter.get("/all", (req, res) => {
    // console.log("requesting crud")
    if (tokenOperations.validate(req.headers.bearer).isTokenValid) {
        const questions = quesCrud.giveAll();
        questions.then((questions) => {
            questions.isTokenValid = true;
            res.status(200).json(questions);
        }).catch(() => {

            res.json({ message: "Error Fetching Questions" })
        });
    }
    else {
        res.status(401).json({
            isTokenValid: false
        })
    }
}
)
problemRouter.get('/:quesName', (req, res) => {
    console.log(req.headers.bearer);
    if (tokenOperations.validate(req.headers.bearer).isTokenValid) {
        console.log("Valid Token");
        const question = quesCrud.searchByName(req.params.quesName);
        question.then(ques => {
            if (ques) {
                ques.isTokenValid = true;
                res.status(200).json(ques);
            }
            else {
                res.status(502).json({ message: "Error Fetching Question" });
            }
        })
    }
    else {
        res.status(401).json({
            message: "Unauthorized Request"
        })
    }

})
module.exports = problemRouter;
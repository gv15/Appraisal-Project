const express = require('express');
const quesCrud = require("../db/crud-helpers/problemcrud");
const problemRouter = express.Router();
const tokenOperations = require('../utils/token');
const submitTimeCrud = require('../db/crud-helpers/submittimecrud');
const utils = require('../utils/util');
problemRouter.get("/", (req, res) => {
    res.send("problem route");
})
problemRouter.get("/all", (req, res) => {
    let user = tokenOperations.validate(req.headers.bearer);
    if (user.isTokenValid) {
        const questionsPromise = quesCrud.giveAll();
        questionsPromise.then((questions) => {

            submitTimeCrud.checkIfAlreadyStamped(user['user_id']).then(
                (stamp) => {

                    if (stamp) {

                        if (stamp.timeStamp - Date.now() > 0) {
                            console.log("Test Started")
                            let testTime = stamp.timeStamp - Date.now();

                            questions.push(testTime);
                            res.status(200).json(questions);
                        }
                        else {
                            res.status(403).json({
                                message: "Test Time Out"
                            })
                        }
                    }
                    else {

                        let testTime = utils.calculateTestTime(questions);
                        questions.push(testTime);
                        let endTimeStamp = Date.now() + testTime ;
                        submitTimeCrud.registerStamp({
                            u_id: user.user_id,
                            timeStamp: endTimeStamp
                        })
                        res.status(200).json(questions);
                    }
                }
            )

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
    let user = tokenOperations.validate(req.headers.bearer);
    if (user.isTokenValid) {
        const question = quesCrud.searchByName(req.params.quesName);
        question.then(ques => {
            if (ques) {
                ques.isTokenValid = true;
                
                submitTimeCrud.checkIfAlreadyStamped(user["user_id"]).then((stamp) => {
                    if(stamp){
                        ques["timeLeft"] = stamp.timeStamp - Date.now();
                        res.status(200).json(ques);
                    }
                    else{
                        res.status(403).json(
                            {
                                message:"Test Not Started"
                            }
                        )
                    }
                })
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
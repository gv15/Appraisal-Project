const express = require('express');
const resultRouter = express.Router();
let token = require("../utils/token");

  const userSubmissionCrud = require('../db/crud-helpers/usersubmissioncrud');
  const user = require('../db/crud-helpers/usercrud');
  resultRouter.get("/ranks", (req, res) => {
    if (token.validate(req.headers.bearer).isTokenValid) {
    var scoreUserMap = [];
    user.giveAllUsers().then((users) => {
      userSubmissionCrud.getScores().then((scores) => {
        scoreUserMap = scores.map(score => {
          let user = users.find(user => String(score["_id"]) == String(user["_id"]));
          return {
            "_id": user["_id"],
            "name": user["name"],
            "email": user["email"],
            "score": score["totalScore"]
          }
        })
        res.status(200).json(scoreUserMap);

      })
    })
  }
  else{
    res.status(401).json(
      {
        message:"Unauthorized Request"
      }
    )
  }
    

 
})

  
module.exports = resultRouter;
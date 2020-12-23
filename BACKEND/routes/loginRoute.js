const express = require("express");
const encryptDecrypt = require("../utils/encdecr");
const userCrud = require("../db/crud-helpers/usercrud");
const jwt = require('../utils/token');
const utils = require("../utils/util");

const loginRoute = express.Router();

loginRoute.post("/login", async (req, res) => {
    req.body.email = utils.firstWordSmall(req.body.email);
    userCrud.isRegisteredUser(req.body).then((isUserReg) => {
        if (isUserReg) {
            userCrud.authenticate(req.body).then((isLoginAllowed) => {
                if (isLoginAllowed) {

                    let user;
                    userCrud.findDetails(req.body).then((userFromDb) => {
                        user = userFromDb;
                        console.log("User", user);
                        const token = jwt.generate(
                            {
                                user_id:user._id,
                                name: user.name,
                                email:user.email
                            }
                        );
                        let name = user ? user.name : "user";
                        res.status(200).json({
                            isRegistered: true,
                            login: true,
                            message: "Login Allowed",
                            webToken: token,
                            name
                        })
                    })
                        .catch((err) => {

                            console.log("error fetching user\n", err);
                        })

                }
                else {
                    res.status(401).json(
                        {
                            isRegistered: true,
                            login: false,
                            message: "Invalid Password"
                        }
                    )
                }
            })
        }
        else {
            res.status(401).json({
                isRegistered: false,
                message: "not registered please register at localhost:3030/accounts/register"
            })
        }
    }).catch((err) => {
        res.status(404).send("Database Error Please Try Again after some time");
    })
})

// }).catch(()=>{
//     res.json(
//         { message:"Db Problem"}
//     )
//     })
// })
module.exports = loginRoute;
const jwt = require('jsonwebtoken');
const key = require("./key");

const tokenOpr = {
    generate(payload){
        return jwt.sign(payload, key.key);
    },
    validate(token){
        let response = {};
        try{
        response = jwt.verify(token, key.key);
        response.isTokenValid = true;
        }
        catch(err){
            response.isTokenValid = false; 
        }
        return response;
    }
}
module.exports = tokenOpr;
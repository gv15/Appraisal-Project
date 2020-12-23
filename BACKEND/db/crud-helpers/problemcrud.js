const Problem = require("../Schemas/Problem");
const quesLangCrud = require("./queslangcodecrud");
const problemCrud = {
    add: function (obj) {
        return Problem.create(obj);
    },
     search() {

    },
    async giveAll() {
        let questions;
        try {
             questions = await Problem.find({});
        }
        catch(err){
            if(err){
                return null;
            }
        }
       // console.log("questions fetched", questions)
        return questions;
    },
    async searchByName(name){
        let reqQuestion;
        let reqCodes;
        try{
             reqQuestion = await Problem.findOne({title:name});
             
        }
        catch(err){
            return null;
        }
        console.log(name, "fetched");
        try{
            console.log("Requesting Codes");
            reqCodes = await quesLangCrud.search(reqQuestion["_id"]);
            let codes=[];
            reqCodes.forEach((codeobj)=>{
                console.log("pushing",  codeobj);
                codes.push({
                    lang:codeobj.language,
                    code:codeobj.code
                })
            })
             
            
        }
        catch(err){
            return null;
        }
        return reqQuestion;

    }
};

module.exports = problemCrud;
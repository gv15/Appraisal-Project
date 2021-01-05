const Problem = require("../Schemas/Problem");
const quesLangCrud = require("./problangcodecrud");
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
        catch (err) {
            if (err) {
                return null;
            }
        }
        // console.log("questions fetched", questions)
        return questions;
    },
    async searchByName(name) {
        let reqQuestion;
        let reqCodes;
        try {
            reqQuestion = await Problem.findOne({ title: name });
            reqQuestion = reqQuestion.toObject();

        }
        catch (err) {
            return null;
        }
       
        try {
            reqCodes = await quesLangCrud.search(reqQuestion["_id"]);
            let code = {};
            reqCodes.forEach((codeObj) => {
                code[codeObj.language] = codeObj.code;
                
            })
            reqQuestion.codes = code;

        }
        catch (err) {
            console.log("Error In Code", err)
            return null;
        }
        return reqQuestion;

    }
};

module.exports = problemCrud;
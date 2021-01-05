const ProblemLanguageCodeModel = require('../Schemas/problemlanguagecode');
const probLangCrud = {
    add(obj) {
        return ProblemLanguageCodeModel.create(obj);
    },
    async search(id) {
        let quesCode;
        try {
             quesCode = await ProblemLanguageCodeModel.find({ "p_id": id });
             
        }
        catch(err){
            console.log("codes error:\n", err);
            return null;
        }
        return quesCode;
    }
}
module.exports = probLangCrud;
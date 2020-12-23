const QuesLangCode = require('../Schemas/queslanguagecode');
const quesLangCrud = {
    add(obj) {
        return QuesLangCode.create(obj);
    },
    async search(id) {
        let quesCode;
        try {
             quesCode = await QuesLangCode.find({ "q_id": id });
             
        }
        catch(err){
            console.log("codes error:\n", err);
            return null;
        }
        return quesCode;
    }
}
module.exports = quesLangCrud;
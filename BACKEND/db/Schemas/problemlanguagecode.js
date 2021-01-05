const mongoose = require("../connect");
let Schema = mongoose.Schema;
let probLangSchema = new Schema({
    p_id:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"Problem"
    },
    language:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required:true
    }

})
let ProblemLanguageCode = mongoose.model("ProblemLangCode", probLangSchema);
module.exports = ProblemLanguageCode;
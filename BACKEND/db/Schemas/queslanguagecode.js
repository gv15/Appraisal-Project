const mongoose = require("../connect");
let Schema = mongoose.Schema;
let quesLangSchema = new Schema({
    q_id:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"Question"
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
let QuesLangCode = mongoose.model("queslangcode", quesLangSchema);
module.exports = QuesLangCode;
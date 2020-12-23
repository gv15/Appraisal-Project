const mongoose = require("../connect");
let Schema = mongoose.Schema;
let probinputOutputSchema = new Schema({
    pid:{
        required:true,
        ref:"Problem",
        type:Schema.Types.ObjectId
    },
    input:{
        type:Schema.Types.Mixed,
        required:true
    },
    output:{
        type:Schema.Types.Mixed,
        required:true
    },
    status:{
        type:String,
        required:true
    }
})
let ProblemInputOutput = mongoose.model("ProblemInputOutput", probinputOutputSchema);
module.exports = ProblemInputOutput;


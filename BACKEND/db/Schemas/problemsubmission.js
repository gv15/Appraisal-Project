const mongoose = require('../connect');
const Problem = require('./Problem');

const Schema  = mongoose.Schema;
const probSubSchema = new Schema({
    prob_id:{
        type:Schema.Types.ObjectId,
        ref:'Problem'
    },
    code:String,
    prob_input_output_id:{
        type:Schema.Types.ObjectId,
        ref:'ProblemInputOutput'
    },
    isPassed:{
        type:Boolean,

    },
    user_id:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    datetime:{
        type:Schema.Types.Date
    },
    language:String
})
const ProblemSubmission = mongoose.model('ProblemSubmission', probSubSchema);
module.exports = ProblemSubmission;

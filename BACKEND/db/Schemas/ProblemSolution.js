const mongoose = require('../connect');
const Problem = require('./Problem');

const Schema = mongoose.Schema;
 
const prob_sol_schema = new Schema({
    prob_id:{
        required:true,
        type:Schema.Types.ObjectId,
        ref:'Problem'
    },
    input:{
        type:Schema.Types.Mixed,
        required:true
    },
    solution:{
        required:true,
        type:Schema.Types.Mixed
    }
})
const ProblemSolution = mongoose.model('ProblemSolution',prob_sol_schema);
module.exports = ProblemSolution;
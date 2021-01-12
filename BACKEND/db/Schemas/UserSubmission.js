const mongoose = require('../connect');

const userSubmissionSchema = new mongoose.Schema({
    u_id:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'User',
        required:true
    },
    p_id:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'Problem',
        required:true
    },
    score:{
        type:Number,
        required:true
    }

})

const UserSubmission = mongoose.model('usersubmission', userSubmissionSchema);
module.exports = UserSubmission;
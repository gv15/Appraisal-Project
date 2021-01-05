let mongoose = require('../connect');
let Schema = mongoose.Schema;
let SubmitTimestampSchema = new Schema({
    u_id:{
        type:Schema.ObjectId,
        required:true
    },
    timeStamp:{
        type:Schema.Types.Date,
        required:true
    }
})
let SubmissionTimestampModel = mongoose.model('SubmissionTimestamps', SubmitTimestampSchema);
module.exports = SubmissionTimestampModel;

const SubmitTimestampModel = require('../Schemas/SubmitTimestamp');
const submitTimestampCrud = {
    registerStamp(obj){
        return SubmitTimestampModel.create(obj);
    },
    checkIfAlreadyStamped(user_id){
        return SubmitTimestampModel.findOne({u_id:user_id});
    }
}
module.exports = submitTimestampCrud;
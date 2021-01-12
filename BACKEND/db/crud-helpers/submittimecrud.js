const SubmitTimestampModel = require('../Schemas/SubmitTimestamp');
const submitTimestampCrud = {
    registerStamp(obj){
        return SubmitTimestampModel.create(obj);
    },
    checkIfAlreadyStamped(user_id){
        return SubmitTimestampModel.findOne({u_id:user_id});
    },
    async giveLeftTime(user_id){
      await  this.checkIfAlreadyStamped(user_id).then(stamp=>{
            console.log("Stamp", stamp);
            stamp = stamp.toObject();
            return stamp.timeStamp-Date.now();
        })
    }
}
module.exports = submitTimestampCrud;
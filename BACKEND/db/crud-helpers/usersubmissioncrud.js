const UserSubmissionModel = require('../Schemas/UserSubmission');

const usersubmissioncrud = {
    addSubmission(obj){
        return UserSubmissionModel.create(obj);
    },
    replaceSubmission(obj){
       return UserSubmissionModel.replaceOne({u_id:obj.u_id, p_id:obj.p_id}, obj);
    },
    alreadySubmitted(u_id, p_id){
       return UserSubmissionModel.findOne({u_id, p_id})
    },
    async getScores(){
     return await  UserSubmissionModel.aggregate([
            {$group:{
                "_id":"$u_id",
                totalScore:{$sum:"$score"}
            }}
        ])
    }

}

module.exports = usersubmissioncrud;
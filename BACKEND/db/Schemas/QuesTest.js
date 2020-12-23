const mongoose = require("../connect");

let quesTestSchema = new mongoose.Schema({
    q_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Question'
    },
    test_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'TestCase'
    }
});
const QuesTestModel = mongoose.model("QuesTest", quesTestSchema);
module.exports = QuesTestModel;
const QuesTestModel = require("../Schemas/QuesTest");
const quesTestCrud = {
    add(obj){
        return QuesTestModel.create(obj);
    },
}
module.exports = quesTestCrud;
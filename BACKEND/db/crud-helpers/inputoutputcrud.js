const ProblemInputOutput = require("../Schemas/ProblemInputOutput");
const crud = {
    add(obj){
        return ProblemInputOutput.create(obj);
    }
}
module.exports = crud;
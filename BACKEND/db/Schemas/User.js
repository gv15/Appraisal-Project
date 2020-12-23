const mongoose = require("../connect");
let Schema = mongoose.Schema;
let userSchema = new Schema({
    name : {
        type:String,
        required:true,
        maxlength:35
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:String,
    last_access_time:{
        type:Schema.Types.Date
    },
    rank:{
        type:String
    }
})
const User = mongoose.model("User", userSchema);
module.exports = User;
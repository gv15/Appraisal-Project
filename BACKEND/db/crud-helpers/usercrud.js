const User = require("../Schemas/User");
const encryptDecrypt = require("../../utils/encdecr")
const crud = {
    add(obj){
        obj.password = encryptDecrypt.encrypt(obj.password);
        return User.create(obj);
    },
    async authenticate(obj){
        let user;
        try{
         user = await User.findOne({email:obj.email});
        }
        catch(err){
            return err;
        }
        if(encryptDecrypt.verify(user.password, obj.password)){
            //generate token
            
            return true
        }
        else{
             return false;
        }
       
    },
    async isRegisteredUser(obj){
        let user;
        try{
         user = await User.findOne({email:obj.email});
        }
        catch(err){
        }
        return user?true:false;
    },
   async findDetails(obj){
    let user;
       try{
         user = await User.findOne({email:obj.email});
        }
        catch(err){
            return err;
        }
        return user;
    }
        
}

module.exports = crud;
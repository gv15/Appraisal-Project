const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(12);
const encryptDecrypt = {
    encrypt(plainPassword){
      return bcrypt.hashSync(plainPassword,salt );
    },
    verify(dbPassword, enteredPassword){
      let result = bcrypt.compareSync(enteredPassword, dbPassword);
        return result;
    }
}
module.exports = encryptDecrypt;
const mongoose = require('../connect');
const quesSchema = new mongoose.Schema(
   {
       question:{
           type:"String",
           required:true    
       },
       title:{
           type:"String", 
           required:true
       },
       level:{
           type:"String",
           required:true
       },
       companies:{
           type:String,
           
       }

   } 
)
const Problem = mongoose.model('Problem', quesSchema);
module.exports = Problem;
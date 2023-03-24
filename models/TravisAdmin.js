const mongoose=require('mongoose');
const bcrypt=require('bcrypt')
const {isEmail}=require('validator')
const Schema=mongoose.Schema;


const travisAdminSchema=new Schema({
  
  
    email:{
        type:String,
        
    },
    password:{
        type:String,
        
        
    },


})
const TravisAdmin=mongoose.model('TravisAdmin',travisAdminSchema);
module.exports=TravisAdmin; 
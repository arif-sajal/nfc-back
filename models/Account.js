const mongoose=require('mongoose');
const bcrypt=require('bcrypt')
const {isEmail}=require('validator')
const Schema=mongoose.Schema;


const accountSchema=new Schema({
   accountuser:{
       type:String, 
       
       trim:true
       
         },
  
         username:{
          type:String,
          trim:true
         }, 
      
       
       pic:{
        type:String,
       },
       direct:{
        type:mongoose.Schema.Types.ObjectId,
  
        ref:'Socialuser'  
       },
   owner:{
    type:mongoose.Schema.Types.ObjectId,
  
    ref:'User'  
   },
   accountlinks:[{
    type:mongoose.Schema.Types.ObjectId,
    
    ref:'Social'
}]
   


},{ timestamps: true })
const Account=mongoose.model('Account',accountSchema);
module.exports=Account; 
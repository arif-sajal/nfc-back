const mongoose=require('mongoose');
const bcrypt=require('bcrypt')
const {isEmail}=require('validator')
const Schema=mongoose.Schema;


const adminDataSchema=new Schema({
  
  
    adminName:{
        type:String,
        default:'admin'
    },
    userTotal:[{
        type:mongoose.Schema.Types.ObjectId,
        
        ref:'User',
        trim: true,
       
    }]


},{ timestamps: true })
const Admin=mongoose.model('Admin',adminDataSchema);
module.exports=Admin; 
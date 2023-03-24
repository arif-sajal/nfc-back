const mongoose=require('mongoose');
const bcrypt=require('bcrypt')
const {isEmail}=require('validator')
const Schema=mongoose.Schema;


const socialSchema=new Schema({
  
    usernam:{
       type: String,
       trim: true,
        
    },
    picname:{
        type:String,trim: true,
        
    },
    group:{
        type:String,
        trim: true,
        
    },
    title:{
        type:String,
        trim: true,
        
    },
    placeholder:{
        type:String,
        trim: true,
        
    },
    src:{
        type:String,
        trim: true,
        
    },
    
    url:{
        type:String,
        trim: true,
    },
   
    active:{
        type:Boolean,
        default:false
    },
    accountowner:{
        type:mongoose.Schema.Types.ObjectId,
        
        ref:'Account'
       
    }


},{ timestamps: true })
const Social=mongoose.model('Social',socialSchema);
module.exports=Social; 


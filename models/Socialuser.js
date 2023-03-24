const mongoose=require('mongoose');
const bcrypt=require('bcrypt')
const {isEmail}=require('validator')
const Schema=mongoose.Schema;


const socialuserSchema=new Schema({
  
    usernam:{
       type: String
        
    },
    nameIcon:{
        type:String
        
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
    color:{
        type:String
    },
    url:{
        type:String
    },
    directAccount:{
        type:mongoose.Schema.Types.ObjectId,
  
        ref:'Account'  
       }
   
   


},{ timestamps: true })
const Socialuser=mongoose.model('Socialuser',socialuserSchema);
module.exports=Socialuser; 



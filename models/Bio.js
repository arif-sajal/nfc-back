const mongoose=require('mongoose');
const bcrypt=require('bcrypt')
const {isEmail}=require('validator')
const Schema=mongoose.Schema;


const bioSchema=new Schema({
  
    bio:{
       type: String
        
    },
    state:{
        type:String
        
        
    },
    address:{
        type:String
        
        
    },
    city:{
        type:String
        
        
    },
    zipcode:{
        type:String
        
        
    },
    country:{
        type:String
        
        
    },

    pic:{
        type:String
    },
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        
        ref:'User'
       
    }


},{ timestamps: true })
const Bio=mongoose.model('Bio',bioSchema);
module.exports=Bio; 
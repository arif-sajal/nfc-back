const User=require('../../models/User')
const bcrypt = require('bcryptjs');
const Admin=require('../../models/AdminData')
const TravisAdmin=require('../../models/TravisAdmin')
// const bcrypt=require('bcrypt')
const Bio=require('../../models/Bio')
const Account=require('../../models/Account')
const Socialuser=require('../../models/Socialuser')
const Social=require('../../models/Userlink')
const jwt=require('jsonwebtoken'); 
const {jwtKey,API_KEY}=require('../../config/keys')
const checkuser=require('../../middleware/checkUser')

///photo 

module.exports.photo_get=(req,res)=>{
    
    const id= req.user._id.toString(); 
    User.findById(id).then(user=>{
        res.status(200).json({id:user._id})
    })
    .catch(err=>{
        res.status(422).json({error:err})
    })
    

}
///pic get

module.exports.pic_get=(req,res)=>{
  
    const id= req.user._id.toString(); 
    User.findById(id).then(user=>{
        res.status(200).json({id:user._id})
    })
    .catch(err=>{
        res.status(422).json({error:err})
    })
    
    
    

    
}

//edit profile

module.exports.editprofile_get=(req,res)=>{
    const id=req.user._id.toString(); 
    res.status(200).json({id:id})

}
//////eidt accounty
module.exports.editaccount_get=(req,res)=>{
    const id=req.user._id.toString(); 
    res.status(200).json({id:id})

}


///new one

module.exports.profile_gettuser= async (req,res) => {
    // change here

     const {id}=req.params;
    try{

        const user=await Bio.findById(id)
        res.status(200).json({user:user})

    }catch(err){
   
        res.status(422).json({error:err})
 
        
    

    } 

} 
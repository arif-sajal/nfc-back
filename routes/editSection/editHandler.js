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


///edit profile

module.exports.editprofile_post=(req,res)=>{
    const id=req.body.id;
    Bio.findOneAndUpdate({postedBy:req.body.id},{
       $set: {bio:req.body.bio,
        pic:req.body.pic}
    },{new:true},(err,user)=>{
      if (err){
        res.status(422).json({error:err})
      }
      User.findById(id)
      .then(newuser=>
        newuser.save().then(yes=>console.log('yes')).catch(err=>console.log('yes'))
        
        ).catch(err=>console.log(yes))
      res.status(200).json({user})
    })
    

}



////edit account

module.exports.editaccount_post=(req,res)=>{
    const id=req.body.iid
  Account.findOneAndUpdate({_id:req.body.id},{
     $set: {accountuser:req.body.accountuser,
      userLink:req.body.userLink,
      pic:req.body.pic
  }
  },{new:true},(err,user)=>{
    if (err){
      res.status(422).json({error:err})
    }
    User.findById(id).select("account").populate("account","accountuser username pic accountlinks ")
 .then(users=>res.status(200).json({users:users}))
 .catch(err=>console.log('erro'))
    
  })
  

}


///edit social
module.exports.profile_editlink_post = (req,res)=>{

    Social.findOneAndUpdate({_id:req.body.id},{
       $set: {usernam:req.body.usernam
        
    }
    },{new:true},(err,user)=>{
      if (err){
        res.status(422).json({error:err})
      }
      res.status(200).json({user:user})
    })
    

}
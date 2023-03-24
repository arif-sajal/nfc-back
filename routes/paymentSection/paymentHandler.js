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

module.exports.profile_paymentemail= (req,res)=>{
    const id=req.user._id.toString();
    User.findById(id)
    .then((user)=>{
        
        
            User.findOneAndUpdate({_id:user._id},{
                $set: {paymentAddress:req.body.payment
                 }
             },{new:true},(err,userNew)=>{
               if (err){
                 res.status(422).json({error:err})
               }
               res.status(422).json({user:userNew})
            })      

       

    }).catch(err=>console.log('err'))
   
    }
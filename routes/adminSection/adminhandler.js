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

module.exports.travis_signin=(req,res)=>{ 
  
    const {email,password}=req.body;
    TravisAdmin.findOne({email:email})
    .then(user=>{
        if(!user){
            console.log("hahs",user)
            return    res.status(422).json({error:"Invalid Email "})  
        }
        if(user.password==password){
            res.status(200).json({sms:'get successfully'})
        }
        else{
            res.status(422).json({error:"Invalid  Password"})  
        }
       
        
    }).catch(err=>console.log('err'))

}

module.exports.travis_signup=(req,res)=>{
  
    const {email,password}=req.body;
    TravisAdmin.findOne({email:email})
    .then(user=>{
        if(user){
            console.log("hahs",user)
            return    res.status(422).json({error:"Email Alreadfy Exists "})  
        }
        const userNew=new TravisAdmin({
            email,
            password
        }) 
        userNew.save()
        .then((userNew)=>{
            res.status(422).json({userNew:userNew}) 
        }).catch(err=>console.log('err'))
        
       
        
    }).catch(err=>console.log('err'))

}


///getting user data to dashboard


module.exports.travis_user_get=(req,res)=>{
  
    
    // console.log("refer",refer)
    
    Admin.findOne({adminName:'admin'})
    .populate({
        path: 'userTotal',
        model: 'User',
        select:'fullname nfcGet paymentAddress totalAmount email',
        populate:{
            path: 'data',
        model: 'Bio',
        select:'country state address city zipcode',
        }
      }).sort({createdAt: -1})
   
    // .populate("userTotal","email totalAmount nfcGet paymentAddress data",)
  
    // .populate("data","address zipcode city state country")
    .then((adminUser)=>{
        
        
        res.status(200).json({users:adminUser})
       
       
    }).catch(err=>console.log(err))

}
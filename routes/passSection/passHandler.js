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

module.exports.forgotpass_post=(req,res)=>{
    const {email}=req.body;
    User.findOne({email}).then(user=>{  
        const code=Math.floor((Math.random()*1000000)+1)
        const msg={
            to:user.email,
            from:"Travis.swop@gmail.com",
            subject:"Account Password Reset",
            text:`Your verification code is ${code}`
        }
        sgMail.send(msg,(err,info)=>{
            if(err){
                console.log('email not sent')
            }else{
                console.log("success")
            }
        })

    res.status(200).json({success:code,email:user.email})}
    ).catch(err=>res.status(404).json({error:'Email not found'}))
  
       
}
module.exports.setpass_post=(req,res)=>{
    const {email,password}=req.body;
 


    User.findOne({email}).then(user=>{  
       if(!user){
           res.status(404).json({error:"Email Not Found"})
       }
       console.log( "yesyes",user)
       bcrypt.hash(password,14).then(hashedpassword=>{
        user.password=hashedpassword;
        user.save().then(user=>{
            res.json({sms:'Password Updated Successfully'})
        })
       }).catch(err=>console.log(err))
       
       
       }).catch(err=>console.log(err))

    
        

   
  
       
}
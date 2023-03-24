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

module.exports.createlink_post=async(req,res)=>{
    const {idd}=req.params;
     const {usernam,title,placeholder,url,src,picname,group}=req.body;
     const account=await Account.findById(idd)  
     try{
        const social=await Social.create({
            usernam,
            src,
            title,
            placeholder,
            url,
            picname,
            group,
           
            accountowner:account._id
            

        })
        account.accountlinks.push(social._id)
         
        await account.save();
        const user=await Social.findById(social._id).select("usernam picname group placeholder title src url accountowner active")

        // const user=await Social.findById(social._id).select("usernam nameIcon title color url ")
        // const user=await Account.findById(idd).select(accountlinks).populate("usernam nameIcon title color url ")
        console.log(user)
        res.status(200).json({user:user})

    }catch(err){
        res.status(422).json({error:err})
    }
  
   

}

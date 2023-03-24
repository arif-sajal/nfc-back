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

module.exports.createaccount_post= async(req,res)=>{
    const id=req.user._id.toString();
    const user=await User.findById(id)
    const{accountuser,pic,username}=req.body;
    try{
           const found=await Account.findOne({username:username})
           if(found){
             return   res.status(422).json({error:"Try Another Username"})
           }
            const account=await Account.create({
                accountuser,
                pic,
                username:username.trim(),
                owner:user._id
     
            }) 
            user.account.push(account._id)
            await user.save();
            console.log( "length is",user.account.length)
            // console.log(account)
            // res.status(200).json({account:account})
        const useracc=await Account.findById(account._id).select("accountuser username pic direct")
        res.status(200).json({useracc:useracc})
     }catch(err){
        res.status(422).json({error:"You can not create more than five accounts"})
    }
}
    
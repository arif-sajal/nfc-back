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
////get user data when NFC is touched
module.exports.profile_username_get=(req,res)=>{
    Account.findOne({username:req.params.username})
    .select("accountuser username pic accountlinks direct").populate("accountlinks","usernam placeholder src title url accountowner picname group").populate("direct","usernam url")
    .then(user=>{
        res.status(200).json({user:user})
    })
    .catch(err=>{
        res.status(200).json({error:err}) 
    })
   

}
///get user  when logged in  app
module.exports.profile_get= async(req,res)=>{
    // change here


    const id=req.user._id.toString();  
   try{
    
       const user=await User.findById(id).select("referralCode totalAmount nfcGet fullname data account").populate("data","bio pic").populate("account","accountuser username pic accountlinks")
       res.status(200).json({user:user}) 
   
      

   
    }
    catch(err){
    res.status(422).json({error:err})
   }

    
}
/////when user clicks any particular account
module.exports.account_get=async(req,res)=>{
    const {id}=req.params
    try{
       
        const account=await Account.findById(id).select("accountuser username pic accountlinks").populate("accountlinks","usernam src title placeholder url accountowner active")
        console.log(account)
        res.status(200).json({account:account}) 

       }
    //    account.accountlinks.push(social._id)
    //    await account.save();
    //    res.status(200).json({user:social})

   catch(err){
       res.status(422).json({error:err})
   }
 
  

}
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

///delete user account
module.exports.delete_account= (req,res)=>{
    const id=req.user._id.toString();
    Account.findByIdAndDelete({_id:req.params.accid})
    .then(user=>console.log('yes')).catch(err=>res.status(422).json({error:err}))
    User.findById(id).then(user=>{
       const datas= user.account.filter(acc=> acc != req.params.accid)
       user.account=[...datas]
       user.save().then(useryes=>console.log('yes') ).catch(err=>res.status(422).json({error:err}))
       User.findById(id).select("account").populate("account","accountuser username pic accountlinks ")
       .then(users=>res.status(200).json({users:users}))
       .catch(err=>console.log('erro'))
       
        // user.account.pull(req.params.accid);
        // user.account.save()
        
    }
        ).catch(err=>res.status(422).json({error:err}))
        
   
    
    }


    ///delete social account
    module.exports.delete_social= (req,res)=>{
        const id=req.user._id.toString();
        Social.findByIdAndDelete({_id:req.params.soaid})
        .then(user=>console.log('yes')).catch(err=>res.status(422).json({error:err}))
        Account.findById({_id:req.params.idd}).then(user=>{
           const datas= user.accountlinks.filter(acc=> acc != req.params.soaid)
           user.accountlinks=[...datas]
           user.save().then(useryes=>console.log('yes') ).catch(err=>res.status(422).json({error:err}))
           Account.findById({_id:req.params.idd}).select("accountlinks").populate("accountlinks","usernam placeholder title src url accountowner active")
           .then(users=>res.status(200).json({users:users}))
           .catch(err=>console.log('erro'))
           
            // user.account.pull(req.params.accid);
            // user.account.save()
            
        }
            ).catch(err=>res.status(422).json({error:err}))
            
       
        
        }
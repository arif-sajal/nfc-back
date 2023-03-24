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

///direct on

module.exports.updatedirecton_post=(req,res)=>{
    const id=req.body.idd
   Account.findById(id).select("accountlinks accountuser username pic  owner").populate("accountlinks","usernam src title url accountowner active placeholder").then(account=>{
    
    // const  objIndex = account.accountlinks.findIndex((obj => obj.active==true));

  const objIndex =  account.accountlinks.find((obj => obj.active == true));
                 if(objIndex){
                    Social.findOneAndUpdate(
                        {_id:objIndex._id},{
                            $set: {active:false
                             }
                         },{new:true},(err,userpre)=>{
                           if (err){
                             res.status(422).json({error:err})
                           } 
                           Social.findOneAndUpdate({_id:req.body.id},{
                            $set: {active:req.body.active
                             }
                         },{new:true},(err,user)=>{
                           if (err){
                             res.status(422).json({error:err})
                           }
                              const id2 =objIndex._id.toString();
                            
                                const socialuser=new Socialuser({
                                    usernam:user.usernam,  
                                   src:user.src,
                                   src:user.placeholder,
                                   title:user.title,
                                    url:user.url,
                                    directAccount:account._id
                                
                                         })
                                    socialuser.save()
                                    .then(socialuser=>console.log('yes')).catch(err=>console.log('no'))
                                account.direct=socialuser._id
                                account.save().then(account=>res.status(200).json({user:user,socialuser:socialuser,id2:id2,active:userpre.active})).catch(err=>console.log('no'))
                           
                            
                           
                         })	
                
                           

                        }


                    )
                            }
   

  
      else
       { Social.findOneAndUpdate({_id:req.body.id},{
            $set: {active:req.body.active
             }
         },{new:true},(err,user)=>{
           if (err){
             res.status(422).json({error:err})
           }
           
            
                const socialuser=new Socialuser({
                    usernam:user.usernam,  
                   
                   title:user.title,
                   src:user.src,
                src:user.placeholder,
                    url:user.url,
                    directAccount:account._id
                
                         })
                    socialuser.save()
                    .then(socialuser=>console.log('yes')).catch(err=>console.log('no'))
                account.direct=socialuser._id
                account.save().then(account=>res.status(200).json({user:user,socialuser:socialuser})).catch(err=>console.log('no'))
           
            
           
         })	}

       
    

  

   })
   .catch(err=>console.log('yes'))  

} 

///direct off


module.exports.updatedirectonoff_post=(req,res)=>{
    const id=req.body.idd;
   
    Account.findById(id)
    .then(account=>{

        Social.findOneAndUpdate({_id:req.body.id},{
            $set: {
                active:req.body.active  
            }
        },{new:true},(err,user)=>{
            if (err){
                         res.status(422).json({error:err})
                       }
                       Socialuser.findByIdAndDelete({_id:req.body.socailid})
                  .then(userOne=>console.log('erro')).catch(err=>res.status(422).json({error:err}))
                  account.direct=null;
                  account.save().then(yes=>console.log('yes')).catch(err=>res.status(422).json({error:err}))
                  res.status(200).json({user:user})
                    
          })


    })
    .catch(err=>console.log('yes'))  
    

}

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

const sgMail=require('@sendgrid/mail')
sgMail.setApiKey(API_KEY)
const cretaetoken=(id)=>{
    return jwt.sign({id},jwtKey,{
        expiresIn:1*24*60*60
    })
}



///save to admin
const saveToAdmin=(id)=>{
    const admin='admin';
    Admin.findOne({adminName:admin})
    .then((adminUser)=>{
        // if(adminUser.userTotal.length < 1 || adminUser.userTotal == undefined){
        //     const admin=new Admin({

        //         userTotal:userTotal.unshift(id)
        //     })
        //     admin.save()
        //     .then((adminMade)=>{
        //         console.log('success') 
        //     }).catch(err=>console.log('err'))
        // }
        adminUser.userTotal.unshift(id)
        adminUser.save()
        .then((successUser)=>{
            console.log('success')
        }).catch(err=>console.log('err'))
        
        
   
    
    }).catch(err=>console.log('err'))

}

///email verification code sent part

module.exports.user_verificationcode=(req,res)=>{
    const {email}=req.body;
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return    res.status(422).json({error:"Email Already Exists"})
           }
           const code=Math.floor((Math.random()*1000000)+1)
           const msg={
               to:email,
               from:"Travis.swop@gmail.com",
               subject:"Email Verification",
               text:`Your verification code is ${code}`
           }
           sgMail.send(msg,(err,info)=>{
               if(err){
                   console.log('email not sent')
               }else{
                res.status(200).json({code:code})
               }
           })    
    })
    .catch(err=>console.log('yes'))

}



///////sign up

module.exports.signup_post=(req,res)=>{
    const {email,password,fullname,referralCode}=req.body;
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
         return    res.status(422).json({error:"Email Already Exists"})
        }
        // if code exists 
       else if(referralCode.length>1){
                         
        User.findOne({referralCode:referralCode}).then((foundUser)=>{
            if(foundUser){
                //if userrefercode found
                User.findOneAndUpdate({_id:foundUser._id},{
                    $set: {totalAmount:foundUser.totalAmount+5
                     
                 }
                 },{new:true},(err,userNew)=>{
                   if (err){
                       //not found
                      console.log("not found")
                   }
                   else{
                    bcrypt.hash(password,7)
                    .then(hashedpassword=>{
                        const referralCode=makeid(8)
                        const user=new User({
                            email,
                            password:hashedpassword,
                            fullname,
                            referralCode,
                            nfcGet:1
                        }) 
                        user.save()
                        .then(user=>{
                            saveToAdmin(user._id);
                            const token = cretaetoken(user._id);
                            res.status(200).json({user:user,token:token,userNew:userNew})
                        }).catch(err=>console.log('err'))})
                   }
       ///  found
                 })
            }
            // not found refercode user
           else{
            bcrypt.hash(password,7)
            .then(hashedpassword=>{
                const referralCode=makeid(8)
                const user=new User({
                    email,
                    password:hashedpassword,
                    fullname,
                    referralCode
                }) 
                user.save()
                .then(user=>{
                    saveToAdmin(user._id);
                    const token = cretaetoken(user._id);
                    res.status(200).json({user:user,token:token})
                }).catch(err=>console.log('err'))
            })
           }

        }
      ).catch(err=>console.log('wrong'))
            
  } // if code and email user does not exist
        else {   bcrypt.hash(password,7)
        .then(hashedpassword=>{
            const referralCode=makeid(8)
            const user=new User({
                email,
                password:hashedpassword,
                fullname,
                referralCode
            }) 
            user.save()
            .then(user=>{

                saveToAdmin(user._id);
                const token = cretaetoken(user._id);
                res.status(200).json({user:user,token:token})
            }).catch(err=>console.log('err'))
        })
        }
}).catch(err=>console.log('err'))
}

//////sign in

module.exports.signin_post=(req,res)=>{
    const {email,password}=req.body;
    User.findOne({email:email})
    .then(user=>{
        if(!user){
            return    res.status(422).json({error:"Invalid Email Or Password"})  
        }
        bcrypt.compare(password,user.password)
        .then(doMatch=>{
            if (doMatch){
                const token =  cretaetoken(user._id); 
                res.status(200).json({user:user,token:token})
            }
            else{
                return    res.status(422).json({error:"Invalid Email Or Password"}) 
            }
        }).catch(err=>{
            console.log('err')
        })
    }).catch(err=>console.log('err'))


 } 


const User=require('../models/User')
const Bio=require('../models/Bio')
const jwt=require('jsonwebtoken');
const {jwtKey}=require('../config/keys')
module.exports.checkuser= (req,res,next)=>{

    const { authorization }=req.headers;
    if(!authorization){
        return res.status(401).send('you must be logged in 2');

    }
    const token=authorization.replace("Bearer ","");
    jwt.verify(token,jwtKey,async(err,payload)=>{
        if(err){
            return res.status(401).send(authorization);   
        }
       
        const {id}=payload;
    const user=await User.findById(id)
    req.user=user;
    
    console.log(req.user)
    next();
    })
    
}
module.exports.checkuserLogin= (req,res,next)=>{

    const { authorization }=req.headers;
    if(!authorization){
        return res.status(401).send('you must be logged in 2');

    }
    const token=authorization.replace("Bearer ","");
    jwt.verify(token,jwtKey,async(err,payload)=>{
        if(err){
            return res.status(401).send(authorization);   
        }
       
        const {id}=payload;
        // Bio.postedBy._id=id
        // res.status(200).send(id) change here
    const user=await User.findById(id)
    req.user=user;
  
    // req.user.postedBy.fullname
    console.log(req.user)
    next();
    })
    
}
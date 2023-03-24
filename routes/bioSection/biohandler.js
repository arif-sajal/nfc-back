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





module.exports.update_profile_bio__post=async(req,res)=>{
    // const id=req.user._id;
    // const {id}=req.body
    const {bio,id,pic,address,city,zipcode,state,country}=req.body;
    const user=await User.findById(id)
    console.log(user)
    try{
       
        const bioDataa=await Bio.create({
            bio,
            address,city,zipcode,state,country,
            pic,
            postedBy:user._id
        })
        // const id=bioData._id.toString()
        user.data=bioDataa._id
        // user.addesss=bioDataa.address+`${" "}`+bioDataa.city+`${" "}`+bioDataa.zipcode+`${" "}`+bioDataa.state+`${" "}`+bioDataa.country
        await user.save();
        const bioData= await Bio.findById(bioDataa._id) .select("bio,address,city,zipcode,state,country,pic,postedBy").populate("postedBy","fullname email")
        res.status(200).json({bioData:bioData})
        
        console.log(bioData)
        
   }
    catch(err){
        
        res.status(422).json({error:err})
      //   res.send(err.code)
      }
} 
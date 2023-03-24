const User = require('../models/User')
// const uuid = require("uuid")
const { v4: uuidv4 } = require('uuid');
const fetch = require('node-fetch')
const NodeCahe = require("node-cache")
const myCache = new NodeCahe({ stdTTL: 300 })
const bcrypt = require('bcryptjs');
const Admin = require('../models/AdminData')
const TravisAdmin = require('../models/TravisAdmin')
// const bcrypt=require('bcrypt')
const Bio = require('../models/Bio')
const Customer = require('../models/Customer')
const News = require('../models/News')
const ContactEom = require('../models/ContactEom')
const Account = require('../models/Account')
const Socialuser = require('../models/Socialuser')
const Product = require('../models/Product')
const GetProduct = require('../models/GetProduct')
const Social = require('../models/Userlink')
const jwt = require('jsonwebtoken');
const { API_KEY, STRIPE_KEY, WEB_HOOK_SECRET } = require('../config/keys')
const jwtKey = 'let go for a walk'
const stripe = require("stripe")(STRIPE_KEY)
const checkuser = require('../middleware/checkUser')


const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(API_KEY)


const cretaetoken = (id) => {
    return jwt.sign({ id }, jwtKey, {
        expiresIn: 30 * 24 * 60 * 60
    })
}
const handleerror = (err) => {
    console.log(err);

    const errors = { email: '', password: '', fullname: '' };
    if (err.message === 'incorrect email') {
        errors.email = "email is not registered"
    }
    if (err.message === 'incorrect password') {
        errors.password = "password is incorrect"
    }
    if (err.code === 11000) {
        errors.email = "email is already registered"
        return errors;
    }
    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        })

    }
    return errors;




}
module.exports.signup_post_new = async (req, res) => {
    const { email, password, fullname, referralCode } = req.body;
    try {
        const user = await User.create({
            email, password, fullname, referralCode
        })
        const token = cretaetoken(user._id);


        return res.status(200).json({ user: user, token: token })




    }
    catch (err) {
        const error = handleerror(err)
        return res.status(422).json({ error: error })
        //   res.send(err.code)
    }
}


function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}
const saveToAdmin = (id) => {
    const admin = 'admin';
    Admin.findOne({ adminName: admin })
        .then((adminUser) => {
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
                .then((successUser) => {
                    console.log('success')
                }).catch(err => console.log('err'))




        }).catch(err => console.log('err'))




}
const saveToProduct = (id) => {
    const user = 'yoyo';
    Admin.findOne({ ProductUser: user })
        .then((totalProducts) => {
            // if(adminUser.userTotal.length < 1 || adminUser.userTotal == undefined){
            //     const admin=new Admin({

            //         userTotal:userTotal.unshift(id)
            //     })
            //     admin.save()
            //     .then((adminMade)=>{
            //         console.log('success') 
            //     }).catch(err=>console.log('err'))
            // }
            totalProducts.products.unshift(id)
            totalProducts.save()
                .then((successUser) => {
                    console.log('success')
                }).catch(err => console.log('err'))




        }).catch(err => console.log('err'))




}

module.exports.user_verificationcode = (req, res) => {
    const { email } = req.body;
    // return res.status(200).json({ email: email })

    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "Email Already Exists" })
            }

            const code = Math.floor((Math.random() * 1000000) + 1)
            return res.status(200).json({ code: code })

            const msg = {
                to: email,
                from: " SWOP <info@swopme.co>",
                subject: "Email Verification",
                html: `
                <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
                "http://www.w3.org/TR/html4/loose.dtd">
             <html lang="en">
             <head>
                 <meta name="viewport" content="width=device-width;initial-scale=1.0; user-scalable=1;" />
             <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
             <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;600;700;900&display=swap" rel="stylesheet">
                 <title>Email Verification || SWOP</title>
             
             </head>
             <body style="font-family: 'Roboto', sans-serif !important;background-color: #333;">
                 
                 <table style="margin:0 auto; padding:0; cellpadding:0; cellspacing:0; background-color: #ffffff; width: 600px; height: auto;text-align: center; ">
                     <tr>
                         <td style="text-align: center;">
                             <a href="https://www.sowpme.co" style="margin-bottom: 30px;"><img src="https://swopme.co/images/Frame.png" alt="swop logo" width="150" style="padding: 4%;"></a>
                         </td>
                     </tr>
                     <tr >
                         <td style="padding: 20px; text-align: center;">
                             <a href="https://www.sowpme.co" class="btn" style="text-decoration: none; background-color: #5E6FF3; padding: 10px 70px; color: #ffffff;border-radius: 10px;font-size: 25px;">Please Verify your Email Address</a>
                         </td>
                     </tr>
                     <tr>
                         <td style="text-align: center;padding: 6% 6% 0%;">
                             <p><b style="font-size: 25px; font-weight: 600">Hi,</b></p>
                             <p style="font-size: 18px; font-weight: 400">Thank you for choosing SWOP</p>
                         </td>
                     </tr>
                     <tr>
                         <td style="text-align: center;padding: 6% 6% 0%;">
                             <p style="font-size: 18px; font-weight: 400">To make SWOP safe for its Users,</p>
                             <p style="font-size: 18px; font-weight: 400;">we require all our users to verify their email address.</p>
                         </td>
                     </tr>
                     <tr >
                         <td style="padding: 30px; text-align: center;">
                             <p style="margin-bottom: 25px;font-size: 18px; font-weight: 400;">Your verification code is</p>
                             <a href="https://www.sowpme.co" class="btn" style="text-decoration: none; background-color: #5E6FF3; padding: 10px 50px; color: #ffffff;border-radius: 20px;font-size: 24px; font-weight: 600;">${code}</a>
                         </td>
                     </tr>
                     <tr>
                         <td style="padding: 6% ;">	
                             <div style="margin: 0 auto;">
                                 <p style="margin: 0 auto;font-size: 18px; font-weight: 600;line-height: 2;color: #7C7C7C;">Note: You may stop receiving emails & will not be able to access your Profile if you don't verify your email ID.</p>
                                 
                             </div>
             
                         </td>
                     </tr>
                     <tr>
                         <td style="text-align: center;padding: 5%;">
                             
                             <p style="margin: 0;font-size: 18px; font-weight: 600;"><b>The SWOP Team</b></p>
                             <p style="margin: 0;"><a href="https://www.sowpme.co/" style="color: #2AB6FE;text-decoration: none;font-size: 18px; font-weight: 400;">www.sowpme.co</a></p>
                         </td>
                     </tr>
                     <tr style="background: rgb(154,113,231);background: -moz-linear-gradient(left,  rgba(154,113,231,1) 0%, rgba(108,50,222,1) 57%);
             background: -webkit-linear-gradient(left,  rgba(154,113,231,1) 0%,rgba(108,50,222,1) 57%);background: linear-gradient(to right,  rgba(154,113,231,1) 0%,rgba(108,50,222,1) 57%);filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#9a71e7', endColorstr='#6c32de',GradientType=1 );
             color: #ffffff;text-align: center;">
                         <td>
                             <footer>
                                 <p style="margin-bottom: 0px;">
                                     <a href="https://www.sowpme.co/"><img src="https://tashinsteel.com/email_photo/sm.png" alt="" style="height: 40px;padding-bottom: 15px;"></a>
                                 </p>
                                 <p style="
                 margin-top: 2px;
             ">
                                     <a href="https://www.sowpme.co/"><img src="https://tashinsteel.com/email_photo/fb.png" alt="" style="width: 40px; height: 40px;margin-right: 15px;"></a>
                                     <a href="https://www.sowpme.co/"><img src="https://tashinsteel.com/email_photo/ins.png" alt="" style="width: 40px; height: 40px;margin-right: 15px;"></a>
                                     <a href="https://www.sowpme.co/"><img src="https://tashinsteel.com/email_photo/yt.png" alt="" style="width: 40px; height: 40px;margin-right: 15px;"></a>
                                 <a href="https://www.sowpme.co/"><img src="https://tashinsteel.com/email_photo/tw.png" alt="" style="width: 40px; height: 40px;margin-right: 15px;"></a>
                             <a href="https://www.sowpme.co/"><img src="https://tashinsteel.com/email_photo/in.png" alt="" style="width: 40px; height: 40px;margin-right: 15px;"></a>
                             <a href="https://www.sowpme.co/"><img src="https://tashinsteel.com/email_photo/ttk.png" alt="" style="width: 40px; height: 40px;"></a>
                         </p>
                         <p style="font-weight: 400;margin: 0;">No longer want to receive these email? Unsubscribe.</p>
                         <p style="
                 margin-top: 2px;
             "><a href="https://www.sowpme.co/" style="color: #ffffff;text-decoration: none;font-weight: 400;">www.sowpme.co</a></p>
                             </footer>
                         </td>
                     </tr>
                 </table>
             
             </body>
             </html>
                
                
                `
            }
            sgMail.send(msg, (err, info) => {
                if (err) {
                    console.log('email not sent')
                } else {
                    res.status(200).json({ code: code })
                }
            })
        })
        .catch(err => console.log('yes'))



}



module.exports.signup_post = (req, res) => {
    const { email, password, fullname, referralCode } = req.body;
    // return res.status(422).json({ error: "Email Already Exists" })

    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "Email Already Exists" })
            }
            // if code exists 
            else if (referralCode.length > 1) {

                User.findOne({ referralCode: referralCode }).then((foundUser) => {
                    if (foundUser) {
                        //if userrefercode found
                        User.findOneAndUpdate({ _id: foundUser._id }, {
                            $set: {
                                totalAmount: foundUser.totalAmount + 5

                            }
                        }, { new: true }, (err, userNew) => {
                            if (err) {
                                //not found
                                console.log("not found")
                            }
                            else {
                                bcrypt.hash(password, 7)
                                    .then(hashedpassword => {
                                        const referralCode = makeid(8)
                                        const user = new User({
                                            email,
                                            password: hashedpassword,
                                            fullname,
                                            referralCode,
                                            nfcGet: 1
                                        })
                                        user.save()
                                            .then(user => {

                                                const token = cretaetoken(user._id);
                                                res.status(200).json({ user: user, token: token, userNew: userNew })
                                                saveToAdmin(user._id);
                                            }).catch(err => console.log('err'))
                                    })
                            }
                            ///  found
                        })
                    }
                    // not found refercode user
                    else {
                        bcrypt.hash(password, 7)
                            .then(hashedpassword => {
                                const referralCode = makeid(8)
                                const user = new User({
                                    email,
                                    password: hashedpassword,
                                    fullname,
                                    referralCode
                                })
                                user.save()
                                    .then(user => {

                                        const token = cretaetoken(user._id);
                                        res.status(200).json({ user: user, token: token })
                                        saveToAdmin(user._id);
                                    }).catch(err => console.log('err'))
                            })
                    }

                }
                ).catch(err => console.log('wrong'))

            } // if code and email user does not exist
            else {
                bcrypt.hash(password, 7)
                    .then(hashedpassword => {
                        const referralCode = makeid(8)
                        const user = new User({
                            email,
                            password: hashedpassword,
                            fullname,
                            referralCode
                        })
                        user.save()
                            .then(user => {


                                const token = cretaetoken(user._id);
                                res.status(200).json({ user: user, token: token })
                                saveToAdmin(user._id);
                            }).catch(err => console.log('err'))
                    })
            }
        }).catch(err => console.log('err'))
}












module.exports.pic_get = (req, res) => {

    const id = req.user._id.toString();
    User.findById(id).then(user => {
        res.status(200).json({ id: user._id })
    })
        .catch(err => {
            res.status(422).json({ error: err })
        })




}

module.exports.photo_get = (req, res) => {

    const id = req.user._id.toString();
    User.findById(id).then(user => {
        res.status(200).json({ id: user._id })
    })
        .catch(err => {
            res.status(422).json({ error: err })
        })


}


module.exports.editprofile_get = (req, res) => {
    const id = req.user._id.toString();
    res.status(200).json({ id: id })

}
module.exports.editprofile_post = (req, res) => {
    const id = req.body.id;
    Bio.findOneAndUpdate({ postedBy: req.body.id }, {
        $set: {
            bio: req.body.bio,
            pic: req.body.pic
        }
    }, { new: true }, (err, user) => {
        if (err) {
            res.status(422).json({ error: err })
        }
        User.findById(id)
            .then(newuser =>
                newuser.save().then(yes => console.log('yes')).catch(err => console.log('yes'))

            ).catch(err => console.log(yes))
        res.status(200).json({ user })
    })


}
// linkining website
module.exports.profile_username_get = (req, res) => {
    Account.findOne({ username: req.params.username })
        .select("accountuser username pic accountlinks direct").populate("accountlinks", "usernam placeholder src title url accountowner picname group").populate("direct", "usernam url group placeholder")
        .then(user => {
            res.status(200).json({ user: user })
        })
        .catch(err => {
            res.status(200).json({ error: err })
        })


}
module.exports.editaccount_get = (req, res) => {
    const id = req.user._id.toString();
    res.status(200).json({ id: id })

}

module.exports.editaccount_post = (req, res) => {
    const id = req.body.iid
    Account.findOneAndUpdate({ _id: req.body.id }, {
        $set: {
            accountuser: req.body.accountuser,
            userLink: req.body.userLink,
            pic: req.body.pic
        }
    }, { new: true }, (err, user) => {
        if (err) {
            res.status(422).json({ error: err })
        }
        User.findById(id).select("account").populate("account", "accountuser username pic accountlinks ")
            .then(users => res.status(200).json({ users: users }))
            .catch(err => console.log('erro'))

    })


}

module.exports.profile_editlink_post = (req, res) => {

    Social.findOneAndUpdate({ _id: req.body.id }, {
        $set: {
            usernam: req.body.usernam

        }
    }, { new: true }, (err, user) => {
        if (err) {
            res.status(422).json({ error: err })
        }
        res.status(200).json({ user: user })
    })


}


module.exports.update_profile_bio__post = async (req, res) => {
    // const id=req.user._id;
    // const {id}=req.body
    const { bio, id, pic, address, city, zipcode, state, country } = req.body;
    const user = await User.findById(id)

    try {

        const bioDataa = await Bio.create({
            bio,
            address, city, zipcode, state, country,
            pic,
            postedBy: user._id
        })
        // const id=bioData._id.toString()
        user.data = bioDataa._id
        // user.addesss=bioDataa.address+`${" "}`+bioDataa.city+`${" "}`+bioDataa.zipcode+`${" "}`+bioDataa.state+`${" "}`+bioDataa.country
        await user.save();
        const bioData = await Bio.findById(bioDataa._id).select("bio,address,city,zipcode,state,country,pic,postedBy").populate("postedBy", "fullname email")
        res.status(200).json({ bioData: bioData })



    }
    catch (err) {

        res.status(422).json({ error: err })
        //   res.send(err.code)
    }
}
// module.exports.signin_post=async(req,res)=>{
//     const {email,password}=req.body;
//     try{
//         const user= await User.login(email,password);
//         const token=cretaetoken(user._id);
//         console.log('yes yes',user)
//         // res.cookie('jwt',token,{httpOnly:true,maxAge:3*24*60*60*1000})
//         // const user= await User.findById(usercreate._id).select("email fullname data account").populate("data","bio gender")

//         res.status(200).json({user:user,token:token})        
//       }
//     catch(err){
//         const error=handleerror(err)
//         res.status(422).json({error}) 
//       //   res.send(err.code)
//       }


//  }

module.exports.signin_post = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(422).json({ error: "Invalid Email Or Password" })
            }
            bcrypt.compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        const token = cretaetoken(user._id);
                        res.status(200).json({ user: user, token: token })
                    }
                    else {
                        return res.status(422).json({ error: "Invalid Email Or Password" })
                    }
                }).catch(err => {
                    console.log('err')
                })
        }).catch(err => console.log('err'))


}
module.exports.profile_gettuser = async (req, res) => {
    // change here

    const { id } = req.params;
    try {

        const user = await Bio.findById(id)
        res.status(200).json({ user: user })

    } catch (err) {

        res.status(422).json({ error: err })




    }

}




module.exports.forgotpass_post = (req, res) => {
    const { email } = req.body;
    User.findOne({ email }).then(user => {
        const code = Math.floor((Math.random() * 1000000) + 1)
        const msg = {
            to: user.email,
            from: " SWOP <info@swopme.co>",
            subject: "Account Password Reset",
            html: `
            
            <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
	<meta name="viewport" content="width=device-width;initial-scale=1.0; user-scalable=1;" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>Forget Password || SWOP</title>

</head>
<body style="font-family: 'Roboto', sans-serif !important;background-color: #333;">
	
	<table style="margin:0 auto; padding:0; cellpadding:0; cellspacing:0; background-color: #ffffff; width: 600px; height: auto;text-align: center; ">
		<tr>
			<td style="text-align: center;">
				<a href="https://www.sowpme.co" style="margin-bottom: 30px;"><img src="https://swopme.co/images/Frame.png" alt="swop logo" width="150" style="padding: 4%;"></a>
			</td>
		</tr>
		<tr>
			<td style="text-align: center;padding: 5% 6% 0%;">
				<p style="font-size: 22px;font-weight: 600;"><b>Hello,</b></p>
				<p style="font-size: 18px;font-weight: 400;">A request has been recived to change the password for your SWOP account</p>
			</td>
		</tr>
		<tr >
			<td style="padding: 10px; text-align: center;">
				<p style="margin-bottom: 25px;font-size: 18px; font-weight: 400;">Your verification code is</p>
				<a href="https://www.sowpme.co" class="btn" style="text-decoration: none; background-color: #5E6FF3; padding: 10px 50px; color: #ffffff;border-radius: 20px;font-size: 24px; font-weight: 600;">${code}</a>
			</td>
		</tr>
		<tr>
			<td style="padding-bottom: 130px;padding-top: 50px;">	
				<div style="width: max-content;margin: 0 auto;">
					<p style="margin: 0;font-weight: 400;">If you did not Initiate this request, please contact us immediately at</p>
					<p><a href="https://www.sowpme.co/" style="color: #2AB6FE;text-decoration: none;font-weight: 400;">support@sowpme.co</a></p>
					
				</div>

			</td>
		</tr>
		<tr>
			<td style="text-align: center;padding: 5%;">
				
				<p style="margin: 0;font-size: 18px; font-weight: 600;"><b>The SWOP Team</b></p>
				<p style="margin: 0;"><a href="https://www.sowpme.co/" style="color: #2AB6FE;text-decoration: none;font-size: 18px; font-weight: 400;">www.sowpme.co</a></p>
			</td>
		</tr>
		<tr style="background: rgb(154,113,231);background: -moz-linear-gradient(left,  rgba(154,113,231,1) 0%, rgba(108,50,222,1) 57%);
background: -webkit-linear-gradient(left,  rgba(154,113,231,1) 0%,rgba(108,50,222,1) 57%);background: linear-gradient(to right,  rgba(154,113,231,1) 0%,rgba(108,50,222,1) 57%);filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#9a71e7', endColorstr='#6c32de',GradientType=1 );color: #ffffff;text-align: center;">
			<td>
				<footer>
					<p style="margin-bottom: 0px;">
						<a href="https://www.sowpme.co/"><img src="https://tashinsteel.com/email_photo/sm.png" alt="" style="height: 40px;padding-bottom: 15px;"></a>
					</p>
					<p style="
    margin-top: 2px;
">
						<a href="https://www.sowpme.co/"><img src="https://tashinsteel.com/email_photo/fb.png" alt="" style="width: 40px; height: 40px;margin-right: 15px;"></a>
						<a href="https://www.sowpme.co/"><img src="https://tashinsteel.com/email_photo/ins.png" alt="" style="width: 40px; height: 40px;margin-right: 15px;"></a>
						<a href="https://www.sowpme.co/"><img src="https://tashinsteel.com/email_photo/yt.png" alt="" style="width: 40px; height: 40px;margin-right: 15px;"></a>
					<a href="https://www.sowpme.co/"><img src="https://tashinsteel.com/email_photo/tw.png" alt="" style="width: 40px; height: 40px;margin-right: 15px;"></a>
				<a href="https://www.sowpme.co/"><img src="https://tashinsteel.com/email_photo/in.png" alt="" style="width: 40px; height: 40px;margin-right: 15px;"></a>
				<a href="https://www.sowpme.co/"><img src="https://tashinsteel.com/email_photo/ttk.png" alt="" style="width: 40px; height: 40px;"></a>
			</p>
			<p style="font-weight: 400;margin: 0;">No longer want to receive these email? Unsubscribe.</p>
			<p style="
    margin-top: 2px;
"><a href="https://www.sowpme.co/" style="color: #ffffff;text-decoration: none;font-weight: 400;">www.sowpme.co</a></p>
				</footer>
			</td>
		</tr>
	</table>

</body>
</html>
            
            
            
            `
        }
        sgMail.send(msg, (err, info) => {
            if (err) {
                console.log('email not sent')
            } else {
                console.log("success")
            }
        })

        res.status(200).json({ success: code, email: user.email })
    }
    ).catch(err => res.status(404).json({ error: 'Email not found' }))


}
module.exports.setpass_post = (req, res) => {
    const { email, password } = req.body;



    User.findOne({ email }).then(user => {
        if (!user) {
            res.status(404).json({ error: "Email Not Found" })
        }
        console.log("yesyes", user)
        bcrypt.hash(password, 14).then(hashedpassword => {
            user.password = hashedpassword;
            user.save().then(user => {
                res.json({ sms: 'Password Updated Successfully' })
            })
        }).catch(err => console.log(err))


    }).catch(err => console.log(err))







}


module.exports.createaccount_post = async (req, res) => {
    const id = req.user._id.toString();
    const user = await User.findById(id)
    const { accountuser, pic, username } = req.body;
    try {
        const found = await Account.findOne({ username: username })
        if (found) {
            return res.status(422).json({ error: "Try Another Username" })
        }
        const account = await Account.create({
            accountuser,
            pic,
            username: username.trim(),
            owner: user._id

        })
        user.account.push(account._id)
        await user.save();
        console.log("length is", user.account.length)
        // console.log(account)
        // res.status(200).json({account:account})
        const useracc = await Account.findById(account._id).select("accountuser username pic direct")
        res.status(200).json({ useracc: useracc })
    } catch (err) {
        res.status(422).json({ error: "You can not create more than five accounts" })
    }
}







module.exports.createlink_post = async (req, res) => {
    const { idd } = req.params;
    const { usernam, title, placeholder, url, src, picname, group } = req.body;
    const account = await Account.findById(idd)
    try {
        const social = await Social.create({
            usernam,
            src,
            title,
            placeholder,
            url,
            picname,
            group,

            accountowner: account._id


        })
        account.accountlinks.push(social._id)

        await account.save();
        const user = await Social.findById(social._id).select("usernam picname group placeholder title src url accountowner active")

        // const user=await Social.findById(social._id).select("usernam nameIcon title color url ")
        // const user=await Account.findById(idd).select(accountlinks).populate("usernam nameIcon title color url ")
        console.log(user)
        res.status(200).json({ user: user })

    } catch (err) {
        res.status(422).json({ error: err })
    }



}


module.exports.account_get = async (req, res) => {
    const { id } = req.params
    try {

        const account = await Account.findById(id).select("accountuser username pic accountlinks").populate("accountlinks", "usernam src title placeholder url accountowner active")
        console.log(account)
        res.status(200).json({ account: account })

    }
    //    account.accountlinks.push(social._id)
    //    await account.save();
    //    res.status(200).json({user:social})

    catch (err) {
        res.status(422).json({ error: err })
    }



}



module.exports.updatedirectonoff_post = (req, res) => {
    const id = req.body.idd;

    Account.findById(id)
        .then(account => {

            Social.findOneAndUpdate({ _id: req.body.id }, {
                $set: {
                    active: req.body.active
                }
            }, { new: true }, (err, user) => {
                if (err) {
                    res.status(422).json({ error: err })
                }
                Socialuser.findByIdAndDelete({ _id: req.body.socailid })
                    .then(userOne => console.log('erro')).catch(err => res.status(422).json({ error: err }))
                account.direct = null;
                account.save().then(yes => console.log('yes')).catch(err => res.status(422).json({ error: err }))
                res.status(200).json({ user: user })

            })


        })
        .catch(err => console.log('yes'))


}




module.exports.updatedirecton_post = (req, res) => {
    const id = req.body.idd
    Account.findById(id).select("accountlinks accountuser username pic  owner").populate("accountlinks", "usernam src title url accountowner active placeholder").then(account => {

        // const  objIndex = account.accountlinks.findIndex((obj => obj.active==true));

        const objIndex = account.accountlinks.find((obj => obj.active == true));
        if (objIndex) {
            Social.findOneAndUpdate(
                { _id: objIndex._id }, {
                $set: {
                    active: false
                }
            }, { new: true }, (err, userpre) => {
                if (err) {
                    res.status(422).json({ error: err })
                }
                Social.findOneAndUpdate({ _id: req.body.id }, {
                    $set: {
                        active: req.body.active
                    }
                }, { new: true }, (err, user) => {
                    if (err) {
                        res.status(422).json({ error: err })
                    }
                    const id2 = objIndex._id.toString();

                    const socialuser = new Socialuser({
                        usernam: user.usernam,

                        placeholder: user.placeholder,
                        group: user.group,
                        title: user.title,
                        url: user.url,
                        directAccount: account._id

                    })
                    socialuser.save()
                        .then(socialuser => console.log('yes')).catch(err => console.log('no'))
                    account.direct = socialuser._id
                    account.save().then(account => res.status(200).json({ user: user, socialuser: socialuser, id2: id2, active: userpre.active })).catch(err => console.log('no'))



                })



            }


            )
        }



        else {
            Social.findOneAndUpdate({ _id: req.body.id }, {
                $set: {
                    active: req.body.active
                }
            }, { new: true }, (err, user) => {
                if (err) {
                    res.status(422).json({ error: err })
                }


                const socialuser = new Socialuser({
                    usernam: user.usernam,

                    title: user.title,
                    src: user.src,
                    src: user.placeholder,
                    url: user.url,
                    directAccount: account._id

                })
                socialuser.save()
                    .then(socialuser => console.log('yes')).catch(err => console.log('no'))
                account.direct = socialuser._id
                account.save().then(account => res.status(200).json({ user: user, socialuser: socialuser })).catch(err => console.log('no'))



            })
        }






    })
        .catch(err => console.log('yes'))

}

module.exports.profile_get = async (req, res) => {
    // change here


    const id = req.user._id.toString();
    // if (myCache.has("profileData")) {
    //     return res.status(200).json({ user: myCache.get("profileData"), time: "from cahed" })

    // } else {}
    try {

        const user = await User.findById(id).select("referralCode totalAmount nfcGet fullname data account").populate("data", "bio pic").populate("account", "accountuser username pic accountlinks")
        // myCache.set("profileData", user)
        res.status(200).json({ user: user, time: "from not cahed" })




    }
    catch (err) {
        res.status(422).json({ error: err })
    }


}
module.exports.delete_account = (req, res) => {
    const id = req.user._id.toString();
    Account.findByIdAndDelete({ _id: req.params.accid })
        .then(user => console.log('yes')).catch(err => res.status(422).json({ error: err }))
    User.findById(id).then(user => {
        const datas = user.account.filter(acc => acc != req.params.accid)
        user.account = [...datas]
        user.save().then(useryes => console.log('yes')).catch(err => res.status(422).json({ error: err }))
        User.findById(id).select("account").populate("account", "accountuser username pic accountlinks ")
            .then(users => res.status(200).json({ users: users }))
            .catch(err => console.log('erro'))



    }
    ).catch(err => res.status(422).json({ error: err }))

    // Account.findOne({_id:req.params.accid})
    // .populate("owner","_id")
    // .exec((err,accountname)=>{
    //     if(err || !accountname){
    //         return  res.status(422).json({error:err})
    //     }
    //     if(accountname.owner._id.toString()===req.user._id.toString()){
    //         User.findById(req.user._id).then(data=>{
    //             data.account.pull(accountname._id);
    //             data.save()}).catch(err=>console.log(err))


    //             accountname.remove()
    //         .then(result=>{
    //             User.findById(req.user._id).select("account").populate("account","accountuser userLink  accountlinks")
    //             .then(user=>{
    //                 res.status(200).json({user:user}) 
    //             })
    //             // res.status(200).json({user:"yes deeted"}) 

    //         }).catch(err=>{
    //             console.log(err)
    //         })
    //     }

    // })

}
module.exports.delete_social = (req, res) => {
    const id = req.user._id.toString();
    Social.findByIdAndDelete({ _id: req.params.soaid })
        .then(user => console.log('yes')).catch(err => res.status(422).json({ error: err }))
    Account.findById({ _id: req.params.idd }).then(user => {
        const datas = user.accountlinks.filter(acc => acc != req.params.soaid)
        user.accountlinks = [...datas]
        user.save().then(useryes => console.log('yes')).catch(err => res.status(422).json({ error: err }))
        Account.findById({ _id: req.params.idd }).select("accountlinks").populate("accountlinks", "usernam placeholder title src url accountowner active")
            .then(users => res.status(200).json({ users: users }))
            .catch(err => console.log('erro'))

        // user.account.pull(req.params.accid);f
        // user.account.save()

    }
    ).catch(err => res.status(422).json({ error: err }))



}
module.exports.profile_paymentemail = (req, res) => {
    const id = req.user._id.toString();
    User.findById(id)
        .then((user) => {


            User.findOneAndUpdate({ _id: user._id }, {
                $set: {
                    paymentAddress: req.body.payment
                }
            }, { new: true }, (err, userNew) => {
                if (err) {
                    res.status(422).json({ error: err })
                }
                res.status(422).json({ user: userNew })
            })



        }).catch(err => console.log('err'))

}

module.exports.travis_signin = (req, res) => {

    const { email, password } = req.body;
    TravisAdmin.findOne({ email: email })
        .then(user => {
            if (!user) {
                console.log("hahs", user)
                return res.status(422).json({ error: "Invalid Email " })
            }
            if (user.password == password) {
                res.status(200).json({ sms: 'get successfully' })
            }
            else {
                res.status(422).json({ error: "Invalid  Password" })
            }


        }).catch(err => console.log('err'))

}

module.exports.travis_signup = (req, res) => {

    const { email, password } = req.body;
    TravisAdmin.findOne({ email: email })
        .then(user => {
            if (user) {
                console.log("hahs", user)
                return res.status(422).json({ error: "Email Alreadfy Exists " })
            }
            const userNew = new TravisAdmin({
                email,
                password
            })
            userNew.save()
                .then((userNew) => {
                    res.status(422).json({ userNew: userNew })
                }).catch(err => console.log('err'))



        }).catch(err => console.log('err'))

}

//NFC SEND
module.exports.nfc_send = (req, res) => {
    console.log('err')


}
/////PAYMENT PAY
module.exports.payment_pay = (req, res) => {
    console.log('err')


}


module.exports.travis_user_get = (req, res) => {


    // console.log("refer",refer)

    Admin.findOne({ adminName: 'admin' })
        .populate({
            path: 'userTotal',
            model: 'User',
            select: 'fullname nfcGet paymentAddress totalAmount email',
            populate: {
                path: 'data',
                model: 'Bio',
                select: 'country state address city zipcode',
            }
        }).sort({ createdAt: -1 })

        // .populate("userTotal","email totalAmount nfcGet paymentAddress data",)

        // .populate("data","address zipcode city state country")
        .then((adminUser) => {


            res.status(200).json({ users: adminUser })


        }).catch(err => console.log(err))

}

///referralCode validation for ecommerce
module.exports.referralCode_get = (req, res) => {


    const { referralCode } = req.body

    User.findOne({ referralCode: referralCode }).
        then(userFound => {
            if (userFound) {
                return res.status(200).json({ userFound: userFound, found: true })
            }
            else {
                return res.status(200).json({ found: false })

            }



        }
        ).catch(err => res.status(400).json({ code: "error" }))

}

/////get single product
module.exports.singleProduct_get = (req, res) => {


    const { id } = req.params

    Product.findOne({ _id: id }).
        then(user => res.status(200).json({ user: user })
        ).catch(err => res.status(400).json({ code: "error" }))

}

const addRewardToCustomer = (refCode, totalQuantity) => {



    User.findOne({ referralCode: refCode })
        .then(foundUser => {
            User.findOneAndUpdate({ referralCode: refCode }, {
                $set: {
                    totalAmount: foundUser.totalAmount + 5 * totalQuantity
                }
            }, { new: true }, (err, deliveredProduct) => {
                if (err) {
                    res.status(400).json({ error: err })
                }
                console.log("done")
            })



        }).catch(err => console.log('err', err))
}
const productQuery = (id, qty) => {

    Product.findById(id).then((product) => {
        if (product.amount - qty == 0) {
            ///delete product
            Product.findByIdAndDelete({ _id: id })
                .then(user => console.log('yes')).catch(err => console.log('yes'))
        } else {

            ///updated product
            Product.findOneAndUpdate({ _id: id }, {
                $set: {
                    amount: product.amount - qty
                }
            }, { new: true }, (err, updatedPro) => {
                if (err) {

                }

            })
        }


    }).catch(err => console.log(err))





}

const savingToCustomer = async (items, email, firstName, lastName, address, city, country, state, zip, phoneNumber, totalPrice) => {



    const myArray = items.map(async (item) => {
        try {
            const product = await Product.findById(item.id).exec()

            return { name: product.name, image: product.imageUrl[0], qty: item.quantity };
        }
        catch (e) {
            console.log("wrong", e)
        }

    })

    const values = await Promise.all(myArray)

    try {
        const customer = await Customer.create({
            name: ` ${firstName} ${lastName}`,
            email: email,
            totalPrice: totalPrice,
            addressCustomer: {
                address,
                city,
                country,
                state,
                zip,
                phoneNumber
            },
            products: values,
        })
    }
    catch (e) {
        console.log("wrong", e)
    }


}

////payment customer 

module.exports.payment_post = async (req, res) => {

    const { email, items, refCode, referenceStatus, shipping, totalPrice, totalQuantity } = req.body

    const total = {
        items: items,
        refCode: refCode

    }
    const idempotencyKey = uuidv4()
    console.log("rescode", refCode)

    try {
        // creating customer
        // const customer = await stripe.customers.create({ email: token.email, source: token.id })
        // console.log('customer', customer)
        // charging customer
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalPrice * 100,
            currency: 'usd',

            receipt_email: email,
            payment_method_types: ['card'],
            description: "total",
            shipping: shipping
        })
        res.status(200).json({ clientSecret: paymentIntent.client_secret, paymentIntent: paymentIntent })



    }
    catch (e) {
        res.status(400).json({ error: e })


    }
}
////product update

module.exports.product_update = (req, res) => {
    const { items, email, firstName, lastName, refCode, totalQuantity, totalPrice, addressCustomer } = req.body
    const { address, city, country, state, zip, phoneNumber } = addressCustomer


    const msg = {
        to: email,
        from: " SWOP <info@swopme.co>",
        subject: "Email Verification",
        html: `<h5 style="color:grey;text-align:center;">

        Your order successfully received.you will find your NFCS as soon as possible<h5>`
    }
    sgMail.send(msg, (err, notiEmail) => {
        if (err) {
            console.log('email not sent')
        } else {
            console.log('yes')
        }
    })

    ///product update and delete
    items.map(item => productQuery(item.id, item.quantity))

    ///adding reward to the user whose refCode is used
    refCode ? addRewardToCustomer(refCode, totalQuantity) : null

    ///saving customer for order route
    savingToCustomer(items, email, firstName, lastName, address, city, country, state, zip, phoneNumber, totalPrice)


    res.status(200).json({ success: 'success' })


}






////// webhooks




module.exports.webhook_implement = (req, res) => {

    const sig = req.headers['stripe-signature']
    const payload = req.body
    const payloadString = JSON.stringify(payload, null, 2);
    const header = stripe.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret: WEB_HOOK_SECRET,
    });
    console.log("hooks", sig)
    // console.log("req.body", payloadString)
    let event;
    try {
        event = stripe.webhooks.constructEvent(
            payloadString, header, WEB_HOOK_SECRET
        )

        // console.log("event", event)
    }
    catch (e) {
        console.log("error shown", e)

    }


    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            console.log(`session ${session}`);
            // Then define and call a function to handle the event checkout.session.completed
            break;
        case 'payment_intent.payment_failed':
            const paymentIntentFailed = event.data.object;
            // Then define and call a function to handle the event payment_intent.payment_failed
            break;
        case 'payment_intent.succeeded':
            const paymentIntent = (event.data.object);

            console.log("description", paymentIntent.toString());
            // Then define and call a function to handle the event payment_intent.succeeded
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    res.status(200).json({ success: "success" })
}


///sending new order for order

module.exports.new_order = async (req, res) => {


    try {
        const newOrder = await Customer.find({ delivered: false }).sort({ createdAt: -1 })
        res.status(200).json({ newOrder: newOrder })
    } catch (e) {
        res.status(400).json({ e: "error" })
    }

}

///sending all order for order

module.exports.all_order = async (req, res) => {


    try {
        const allOrder = await Customer.find({ delivered: true }).sort({ createdAt: -1 })
        res.status(200).json({ allOrder: allOrder })
    } catch (e) {
        res.status(400).json({ e: "error" })
    }

}




///updating after order delivered

module.exports.delivered_Product = (req, res) => {

    const { id } = req.params
    Customer.findOneAndUpdate({ _id: id }, {
        $set: {
            delivered: true
        }
    }, { new: true }, (err, deliveredProduct) => {
        if (err) {
            res.status(400).json({ error: err })
        }
        res.status(200).json({ deliveredProduct })
    })
}
///adding produtcs for admin for ecommerce
module.exports.submitProducts = (req, res) => {


    const { name, description, imageUrl, price, amount, compatibility, shippingAndReturns } = req.body
    const product = new Product({
        name,
        description,
        imageUrl,
        price,
        amount,
        compatibility,
        shippingAndReturns

    })
    product.save()
        .then(response => {


            res.status(200).json({ response: response })
        }).catch(err => console.log('err', err))

}
///getting products for ecommerce
module.exports.submitProducts_get = async (req, res) => {


    try {
        const products = await Product.find()
        res.status(200).json({ products: products })
    } catch (e) {
        res.status(400).json({ e: "error" })
    }



}

module.exports.travis_bio_get = (req, res) => {


    const { id } = req.params

    User.findById(id)

        // .select("userTotal").populate()
        .select("data")
        // .select("data")
        .populate("data", "address zipcode city state country")
        .then((bioUser) => {


            res.status(200).json({ user: bioUser })


        }).catch(err => console.log(err))

}
////adding contact

module.exports.contact_customer = (req, res) => {


    const { name, email, company, phoneNumber, message } = req.body
    const contact = new ContactEom({
        name,
        email,
        company,
        phoneNumber,
        message
    })
    contact.save()
        .then(user => {

            res.status(200).json({ user: "Successfully Added" })
        }).catch(err => console.log(err))

}
////sending contact
module.exports.contacAdmin_customer = async (req, res) => {


    try {
        const contacted = await ContactEom.find().sort({ createdAt: -1 })
        res.status(200).json({ user: contacted })
    } catch (e) {
        res.status(400).json({ e: "error" })
    }

}



// UPDATE PRODUCT




module.exports.updateProduct = (req, res) => {
    const { name, description, imageUrl, price, amount } = req.body
    const { id } = req.params
    Product.findOneAndUpdate({ _id: id }, {
        $set: {
            name, description, imageUrl, price, amount
        }
    }, { new: true }, (err, updatedProduct) => {
        if (err) {
            res.status(400).json({ error: err })
        }
        res.status(200).json({ updatedProduct })
    })
}



// delete PRODUCT  News////

module.exports.distroyProduct = (req, res) => {
    const { id } = req.params
    Product.findByIdAndDelete({ _id: id })
        .then(user => res.status(200).json({ msg: "deleted succesfully" })).catch(err => res.status(422).json({ error: err }))


}
///post news
module.exports.news_post = (req, res) => {
    const { imageUri, header, description, link } = req.body

    const news = new News({
        imageUri,
        header,
        description,
        link

    })
    news.save()
        .then(news => {

            res.status(200).json({ news: news })
        }).catch(err => console.log(err))


}

///get all news

module.exports.news_get = async (req, res) => {


    try {
        const news = await News.find().sort({ createdAt: -1 })
        res.status(200).json({ news: news })
    } catch (e) {
        res.status(400).json({ e: "error" })
    }

}

///////////////////////////
module.exports.all_user = (req, res) => {

    if (myCache.has("adminData")) {
        return res.status(200).json({ allUser: myCache.get("adminData") })

    } else {



        User.find()
            .select('fullname nfcGet paymentAddress totalAmount email data')
            .populate('data', 'country state address city zipcode').sort({ createdAt: -1 })

            .then(allUser => {
                myCache.set("adminData", allUser)
                res.status(200).json({ allUser: allUser })
            }


            ).catch(err => console.log('err', err))

    }

}


module.exports.mainuser = (req, res) => {

    const msg = {
        to: 'kha9647@gmail.com',
        from: 'SWOP <info@swopme.co>',
        subject: "Email Verification",
        html: `
        <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
        "http://www.w3.org/TR/html4/loose.dtd">
     <html lang="en">
     <head>
         <meta name="viewport" content="width=device-width;initial-scale=1.0; user-scalable=1;" />
     <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
     <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;600;700;900&display=swap" rel="stylesheet">
         <title>Email Verification || SWOP</title>
     
     </head>
     <body style="font-family: 'Roboto', sans-serif !important;background-color: #333;">
         
         <table style="margin:0 auto; padding:0; cellpadding:0; cellspacing:0; background-color: #ffffff; width: 600px; height: auto;text-align: center; ">
             <tr>
                 <td style="text-align: center;">
                     <a href="https://www.sowpme.co" style="margin-bottom: 30px;"><img src="https://swopme.co/images/Frame.png" alt="swop logo" width="150" style="padding: 4%;"></a>
                 </td>
             </tr>
             <tr >
                 <td style="padding: 20px; text-align: center;">
                     <a href="https://www.sowpme.co" class="btn" style="text-decoration: none; background-color: #5E6FF3; padding: 10px 70px; color: #ffffff;border-radius: 10px;font-size: 25px;">Please Verify your Email Address</a>
                 </td>
             </tr>
             <tr>
                 <td style="text-align: center;padding: 6% 6% 0%;">
                     <p><b style="font-size: 25px; font-weight: 600">Hi,</b></p>
                     <p style="font-size: 18px; font-weight: 400">Thank you for choosing SWOP</p>
                 </td>
             </tr>
             <tr>
                 <td style="text-align: center;padding: 6% 6% 0%;">
                     <p style="font-size: 18px; font-weight: 400">To make SWOP safe for its Users,</p>
                     <p style="font-size: 18px; font-weight: 400;">we require all our users to verify their email address.</p>
                 </td>
             </tr>
             <tr >
                 <td style="padding: 30px; text-align: center;">
                     <p style="margin-bottom: 25px;font-size: 18px; font-weight: 400;">Your verification code is</p>
                     <a href="https://www.sowpme.co" class="btn" style="text-decoration: none; background-color: #5E6FF3; padding: 10px 50px; color: #ffffff;border-radius: 20px;font-size: 24px; font-weight: 600;">674836</a>
                 </td>
             </tr>
             <tr>
                 <td style="padding: 6% ;">	
                     <div style="margin: 0 auto;">
                         <p style="margin: 0 auto;font-size: 18px; font-weight: 600;line-height: 2;color: #7C7C7C;">Note: You may stop receiving emails & will not be able to access your Profile if you don't verify your email ID.</p>
                         
                     </div>
     
                 </td>
             </tr>
             <tr>
                 <td style="text-align: center;padding: 5%;">
                     
                     <p style="margin: 0;font-size: 18px; font-weight: 600;"><b>The SWOP Team</b></p>
                     <p style="margin: 0;"><a href="https://www.sowpme.co/" style="color: #2AB6FE;text-decoration: none;font-size: 18px; font-weight: 400;">www.sowpme.co</a></p>
                 </td>
             </tr>
             <tr style="background: rgb(154,113,231);background: -moz-linear-gradient(left,  rgba(154,113,231,1) 0%, rgba(108,50,222,1) 57%);
     background: -webkit-linear-gradient(left,  rgba(154,113,231,1) 0%,rgba(108,50,222,1) 57%);background: linear-gradient(to right,  rgba(154,113,231,1) 0%,rgba(108,50,222,1) 57%);filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#9a71e7', endColorstr='#6c32de',GradientType=1 );
     color: #ffffff;text-align: center;">
                 <td>
                     <footer>
                         <p style="margin-bottom: 0px;">
                             <a href="https://www.sowpme.co/"><img src="https://tashinsteel.com/email_photo/sm.png" alt="" style="height: 40px;padding-bottom: 15px;"></a>
                         </p>
                         <p style="
         margin-top: 2px;
     ">
                             <a href="https://www.sowpme.co/"><img src="https://tashinsteel.com/email_photo/fb.png" alt="" style="width: 40px; height: 40px;margin-right: 15px;"></a>
                             <a href="https://www.sowpme.co/"><img src="https://tashinsteel.com/email_photo/ins.png" alt="" style="width: 40px; height: 40px;margin-right: 15px;"></a>
                             <a href="https://www.sowpme.co/"><img src="https://tashinsteel.com/email_photo/yt.png" alt="" style="width: 40px; height: 40px;margin-right: 15px;"></a>
                         <a href="https://www.sowpme.co/"><img src="https://tashinsteel.com/email_photo/tw.png" alt="" style="width: 40px; height: 40px;margin-right: 15px;"></a>
                     <a href="https://www.sowpme.co/"><img src="https://tashinsteel.com/email_photo/in.png" alt="" style="width: 40px; height: 40px;margin-right: 15px;"></a>
                     <a href="https://www.sowpme.co/"><img src="https://tashinsteel.com/email_photo/ttk.png" alt="" style="width: 40px; height: 40px;"></a>
                 </p>
                 <p style="font-weight: 400;margin: 0;">No longer want to receive these email? Unsubscribe.</p>
                 <p style="
         margin-top: 2px;
     "><a href="https://www.sowpme.co/" style="color: #ffffff;text-decoration: none;font-weight: 400;">www.sowpme.co</a></p>
                     </footer>
                 </td>
             </tr>
         </table>
     
     </body>
     </html>
        
        
        
        `
    }
    sgMail.send(msg, (err, notiEmail) => {
        if (err) {
            console.log('email not sent')
        } else {
            res.status(200).json({ yes: "allUser" })
        }
    })

}



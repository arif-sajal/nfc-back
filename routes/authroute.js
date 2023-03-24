const express = require('express');
const router = express.Router();
const User = require('../models/User')
const auth = require('./routehandler')
const authAdmin = require('./adminSection/adminhandler')
const authAuth = require('./authSection/authSign')
const authBio = require('./bioSection/biohandler')
const authCreateAccount = require('./createAccountSection/createAccount')
const authCreateSocial = require('./createSocialSection/socialHandler')
const authDelete = require('./deleteSection/deketehandler')
const authDirect = require('./directSection/directHandler')
const authEdit = require('./editSection/editHandler')
const authGet = require('./getDataSection/getHnadler')
const authPass = require('./passSection/passHandler')
const authPayment = require('./paymentSection/paymentHandler')
const authUserData = require('./userDataSection/getUserHandler')
const check = require('../middleware/checkUser')

///all post///////

/////creating profile  (authSection)
router.post('/email/verificationcode', auth.user_verificationcode);
///sign up
router.post('/signup', auth.signup_post);
router.post('/signup/new', auth.signup_post_new);



///sign in
router.post('/signin', auth.signin_post);
//////(authSection)


////bio section address,zip,city  (bioSection)
router.post('/updateprofileBio', check.checkuser, auth.update_profile_bio__post);
//////(bioSection)



/////creating an account of the user (createAccountSection)
router.post('/profile/createaccount', check.checkuser, auth.createaccount_post)
//////(createAccountSection)



//////creating social account   (createSocialSection)

router.post('/profile/createalink/:idd', check.checkuser, auth.createlink_post)

/////(createSocialSection)


/////password portion (passSection)
router.post('/forgotpass', auth.forgotpass_post)
router.post('/setpass', auth.setpass_post)
//////(passSection)


/////all delete/////// (deleteSection)

///delete account
router.delete('/deleteaccount/:accid', check.checkuser, auth.delete_account)

/////delete social
router.delete('/deleteSocial/:soaid/:idd', check.checkuser, auth.delete_social)

////(deleteSection)

/////NFC AND PAYMENT DATA

router.post('/nfc/send', auth.nfc_send)
router.post('/payment/pay', auth.payment_pay)



//////admin////// (adminSection)
router.post('/admin/travis', auth.travis_signin)
router.post('/admin/travis/signup', auth.travis_signup)
//////admin  dashboard all data get
router.get('/admin/travis', auth.travis_user_get)
////(adminSection)


////ECOMMERCE
// router.get('/admin/productsGet', auth.travis_product_get)
router.get('/alluser/mainuser', auth.mainuser)
router.post('/site/referralCode', auth.referralCode_get)
router.get('/shop/:id', auth.singleProduct_get)
router.post('/payment', auth.payment_post)
router.get('/all/user/new', auth.all_user)
router.get('/order/new', auth.new_order)

router.get('/order/all', auth.all_order)
router.post('/deliver/product/:id', auth.delivered_Product)
router.route('/site/contact').post(auth.contact_customer).get(auth.contacAdmin_customer)
router.route('/site/product').post(auth.submitProducts).get(auth.submitProducts_get)
router.route('/site/product/:id').post(auth.updateProduct).delete(auth.distroyProduct)
router.route('/news/latest').post(auth.news_post).get(auth.news_get)
router.route('/product/update').post(auth.product_update)
router.post('/webhook', express.raw({ type: 'application/json' }), auth.webhook_implement)



///// all edit//////


////profile edit (editSection)
router.post('/editprofile', auth.editprofile_post)

////acount edit
router.post('/editaccount', auth.editaccount_post)
///////social edit
router.post('/profile/editlink', check.checkuser, auth.profile_editlink_post)
////(editSection)



////all direct

///direct on (directSection)
router.post('/updatedirecton', auth.updatedirecton_post)

///direct off
router.post('/updatedirectonoff', auth.updatedirectonoff_post)
////(directSection)


//////all payment/////

/////add referral payment (paymentSection)
router.post('/travis/paymentemail', check.checkuser, auth.profile_paymentemail)
//////(paymentSection)


////all get req/////
router.get('/photo', check.checkuser, auth.photo_get)
router.get('/pic', check.checkuser, auth.pic_get)
router.get('/editprofile', check.checkuser, auth.editprofile_get)
router.get('/editaccount', check.checkuser, auth.editaccount_get)
router.get('/profile/:id', auth.profile_gettuser)

///////getting all sorts of user data in app //////  (userDataSection)
/////when the user clicks any particular account to enter
router.get('/account/:id', check.checkuser, auth.account_get)

/////user profile data after logged in and sign in
router.get('/profile', check.checkuser, auth.profile_get)

///get account user profile with all social whrn touched NFC OR DEEPLINK

router.get('/:username', auth.profile_username_get)

/////(userDataSection)

// router.get('/social/:id',check.checkuser,auth.social_get)









////miscellaneous
// router.get('/admin/travis/bio/:id',auth.travis_bio_get)



module.exports = router;

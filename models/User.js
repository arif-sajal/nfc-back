const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const { isEmail } = require('validator')
const Schema = mongoose.Schema;
const userSchema = new Schema({
    fullname: {
        type: String,

        required: [true, 'Please enter your fullname'],

    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,

        required: [true, 'please enter a password'],
        minlength: [6, 'password must be of 6 characters']
    },
    referralCode: {
        type: String

    },
    totalAmount: {
        type: Number,
        default: 0

    },

    nfcGet: {
        type: Number

    },
    paymentAddress: {
        type: String,
    },
    addesss: {
        type: String,
    },
    adminInclusion: {
        type: mongoose.Schema.Types.ObjectId,

        ref: 'Admin'
    },
    data: {
        type: mongoose.Schema.Types.ObjectId,

        ref: 'Bio'
    },

    account: [{
        type: mongoose.Schema.Types.ObjectId,

        ref: 'Account'
    }]

}, { timestamps: true })
userSchema.path('account').validate(function (value) {
    console.log(value.length)
    if (value.length > 5) {
        throw new Error("One cannot have more than five accounts");
    }
})
userSchema.path('email').validate(function (value) {
    // console.log(value.length)
    if (!value.includes('@')) {
        throw new Error("Please enter a valid email");
    }
})
// userSchema.pre('save', async function(next){
//   const salt=await bcrypt.genSalt();
//   this.password=await bcrypt.hash(this.password,salt);
//   next();
// })

// userSchema.statics.login= async function(email,password){
//        const user=  await this.findOne({email});

//         if(user){
//             const auth=  await bcrypt.compare(password, user.password);
//              if(auth){
//                 return user;

//                 } 
//               throw Error('incorrect password')




//            }
//             throw Error('incorrect email')

// }

const User = mongoose.model('User', userSchema);
module.exports = User; 
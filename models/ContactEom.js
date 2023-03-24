const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const { isEmail } = require('validator')
const Schema = mongoose.Schema;


const contactEomSchema = new Schema({

    name: {
        type: String
    },
    email: {
        type: String

    },
    company: { type: String },
    phoneNumber: {
        type: Number
    },
    message: {
        type: String
    },

    created: { type: Date, default: Date.now }


}, { timestamps: true })
const ContactEom = mongoose.model('ContactEom', contactEomSchema);
module.exports = ContactEom; 
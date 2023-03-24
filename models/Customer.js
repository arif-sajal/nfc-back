const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const { isEmail } = require('validator');
const { stringify } = require('uuid');
const Schema = mongoose.Schema;


const customerSchema = new Schema({
    name: { type: String },
    addressCustomer: {
        address: { type: String },

        city: { type: String },
        country: { type: String },
        state: { type: String },
        zip: { type: Number },
        phoneNumber: { type: Number },
    },
    email: {
        type: String

    },
    totalPrice: { type: Number },
    products: [{ name: String, image: String, qty: Number }],
    delivered: {
        type: Boolean,
        default: false
    },


    created: { type: Date, default: Date.now }


}, { timestamps: true })
const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer; 
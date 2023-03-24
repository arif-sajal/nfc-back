const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const { isEmail } = require('validator')
const Schema = mongoose.Schema;


const productSchema = new Schema({

    name: {
        type: String
    },
    description: {
        type: String

    },
    imageUrl: [{ type: String }],
    price: {
        type: Number
    },
    amount: {
        type: Number
    },
    compatibility: {
        type: String
    },
    shippingAndReturns: {
        type: String
    }
    ,
    created: { type: Date, default: Date.now }


}, { timestamps: true })
const Product = mongoose.model('Product', productSchema);
module.exports = Product; 
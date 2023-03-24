const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const { isEmail } = require('validator')
const Schema = mongoose.Schema;


const getProductSchema = new Schema({
    ProductUser: {
        type: String,
        default: 'yoyo'
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    }],

    created: { type: Date, default: Date.now }


}, { timestamps: true })
const GetProduct = mongoose.model('GetProduct', getProductSchema);
module.exports = GetProduct; 
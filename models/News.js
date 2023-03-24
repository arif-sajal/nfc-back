const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const { isEmail } = require('validator')
const Schema = mongoose.Schema;


const newsSchema = new Schema({

    imageUri: {
        type: String
    },
    header: {
        type: String

    },
    link: {
        type: String

    },
    description: { type: String },


    created: { type: Date, default: Date.now }


}, { timestamps: true })
const News = mongoose.model('News', newsSchema);
module.exports = News; 
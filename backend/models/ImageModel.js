const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SplashModel = new Schema({
    img: {
        label: String,
        url: String
    }
}, {timestamps: true})

module.exports = mongoose.model('Splash',SplashModel)
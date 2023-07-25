const mongoose = require('mongoose');
const {Schema} = mongoose;

const productSchema = new Schema({
    producturl: {
        type: String, 
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    video_id: {
        type: String,
        required: true,
    }
}, {versionKey: false});

productSchema.path('producturl').validate((val) => {
    urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    return urlRegex.test(val);
}, 'Invalid URL.');

module.exports = mongoose.model('Product', productSchema)
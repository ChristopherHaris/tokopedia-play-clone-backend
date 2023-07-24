const mongoose = require('mongoose');
const {Schema} = mongoose;

const commentSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    comment: {
        type: String,
        required: true,
    },
    videoid: {
        type: String,
        required: true,
    }
}, {versionKey: false});

module.exports = mongoose.model('Comment', commentSchema)
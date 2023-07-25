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
    video_id: {
        type: String,
        required: true,
    },
}, { timestamps: { createdAt: 'created_at' } }, {versionKey: false});

module.exports = mongoose.model('Comment', commentSchema)
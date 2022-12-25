import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({

post: {type: mongoose.Types.ObjectId, ref: 'Post', required: true },
user: {type: mongoose.Types.ObjectId, ref: 'User', required: true},
description: {type: String, required: true}

}, {

    toJSON: {virtuals: true},
    toObject: {virtuals: true}
}, {

    timestamps: true
})

export default mongoose.model('Comment', CommentSchema)
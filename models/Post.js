import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({

title: {type: String, required: true, trim: true},
category: {type: String, required: true },
isLiked: {type: Boolean, default: false},
isDisliked: {type: Boolean, default: false},
numofViews: {type: Number, default: 0},
likes: [{

    type: mongoose.Types.ObjectId, ref: 'User'
}],

dislikes: [{
    type: mongoose.Types.ObjectId, ref: 'User'
}],

user: {type: mongoose.Types.ObjectId, ref: 'User', required: true},
description: {type: String, required: true},
image: {type: String, default: 'https://cdn.pixabay.com/photo/2022/09/11/14/43/whale-7446905__340.jpg'}

}, {

    toJSON: {virtuals: true},
    toObject: {virtuals: true},
    
}, {

    timestamps: true
})

//populate comments
PostSchema.virtual('comments', {

    ref: 'Comment',
    foreignField: 'post',
    localField: '_id'
})

export default mongoose.model('Post', PostSchema);
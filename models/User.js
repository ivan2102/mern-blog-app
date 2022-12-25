import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const UserSchema = new mongoose.Schema({

    firstName: {type: String, required: [true, "First name is required"]},
    lastName: {type: String, required: [true, "Last name is required"]},
    profilePhoto: {type: String, default: "https://cdn.pixabay.com/photo/2017/01/31/21/22/avatar-2027363__340.png"},
    bio: { type: String},
    email: {type: String, required: [true, "Email is required"]},
    password: {type: String, required: [true, "Password is required"]},
    postCount: {type: Number, default: 0},
    isBlocked: {type: Boolean, default: false},
    isAdmin: {type: Boolean, default: false},
    role: {type: String, enum: ["Admin", "Guest", "Blogger"]},
    isFollowing: {type: Boolean, default: false},
    isUnFollowing: {type: Boolean, default: false},
    isAccountVerified: {type: Boolean, default: false},
    accountVerificationToken: String,
    accountVerificationTokenExpireAt: Date,
    viewedBy: {type: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]},
    followers: {type: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]},
    following: {type: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]},
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {type: Boolean, default: false}

    

}, {

    toJSON: {virtuals: true},
    toObject: {virtuals: true}
    
}, {

    timestamps: true
})

//virtual method to fetch posts
UserSchema.virtual('posts', {

    ref: 'Post',
    foreignField: 'user',
    localField: '_id'
})

//account type virtual property
UserSchema.virtual('accountType').get(function() {

    const totalFollowers = this.followers?.length
    return totalFollowers >= 1 ? 'Pro Account' : 'Starter Account'
})


//hash password

UserSchema.pre('save', async function() {

    if(!this.isModified('password')) {
       
        next()
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

//match password
UserSchema.methods.isPasswordMatched = async function (passwordConfirmation) {
    return await bcrypt.compare(passwordConfirmation, this.password);
}

//verify account
UserSchema.methods.createAccountVerificationToken = async function() {

   //create a token
   const verificationToken = crypto.randomBytes(32).toString('hex');
   this.accountVerificationToken = crypto.createHash('sha256').update(verificationToken).digest('hex');   

   this.accountVerificationTokenExpireAt = "30d"

   return verificationToken;

}

//forget password
UserSchema.methods.createPasswordResetToken = async function() {

    const resetToken = crypto.randomBytes(32).toString('hex');
   this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')

   this.passwordResetExpires = Date.now() + 30 * 60 * 1000

   return resetToken;
}


export default mongoose.model('User', UserSchema);
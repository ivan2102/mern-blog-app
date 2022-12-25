import User from "../models/User.js";
import expressAsyncHandler from 'express-async-handler';
import  generateToken  from "../utils/generateToken.js";
import validateMongodbID from "../utils/validateMongodbID.js";
import dotenv from 'dotenv';
dotenv.config();
import crypto from 'crypto';
import cloudinaryUploadImg from '../utils/cloudinary.js';
import blockUserFunction from "../utils/blockUserFunction.js";




//register user
const registerUser = expressAsyncHandler( async (req, res) => {

    const userExists = await User.findOne({ email: req.body.email })
    if(userExists) throw new Error('User already exists');

    try {

        const user = await User.create({

            firstName: req?.body?.firstName,
            lastName: req?.body?.lastName,
            email: req?.body?.email,
            password: req?.body?.password,
                        
        });

          res.json(user)
        
    } catch (error) {

        res.json(error)
        
    }

})

//login user
const loginUser = expressAsyncHandler( async (req, res) => {

    const { email, password } = req.body

    const user = await User.findOne({ email })

    //check if user is blocked
    if(user?.isBlocked) throw new Error('User is blocked, please check and unblock user first')

    
   
     //check if password matched
    if(user && (await user.isPasswordMatched(password))) {

        res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            profilePhoto: user.profilePhoto,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })

    }else {

      res.status(401)  
      throw new Error('Invalid Login Credentials')


    }
})

const fetchAllUsers = expressAsyncHandler(async (req,res) => {

   try {

    const users = await User.find({}).populate('posts')
      res.json(users)
    
   } catch (error) {
    
    res.json(error)
   }
})

//delete user
const deleteUser = expressAsyncHandler( async (req, res) => {

    const {id} = req.params

    validateMongodbID(id)

    try {

        const user = await User.findByIdAndRemove(id)
        res.json(user)
        
    } catch (error) {
        
        res.json(error)
    }
})


//single user
const singleUserDetails = expressAsyncHandler( async (req, res) => {

    const {id} = req.params


    try {

        const user = await User.findById(id)
        res.json(user)
        
    } catch (error) {

        res.json(error)
        
    }
})

//user profile
const userProfile = expressAsyncHandler(async (req, res) => {
    const {id} = req.params
    //find the login user
    const loginUser = req.user?._id.toString()
    //check if the user is already logged in

     try {

        const user = await User.findById(id).populate('posts').populate('viewedBy')

        const alreadyViewed = user?.viewedBy.find(user  => user?._id.toString() === loginUser)

        if(alreadyViewed) {

            res.json(user)

        }else {

             const profileUser = await User.findByIdAndUpdate(user?._id, {

                $push: {viewedBy: loginUser}
             })

            res.json(profileUser)
        }

      
        
     } catch (error) {
       
        res.json(error) 
     }
})

//update user profile
const updateUserProfile = expressAsyncHandler(async (req, res) => {

    const {_id} = req.user
    validateMongodbID(_id);
    //block user
    blockUserFunction(req.user)

    try {

      const user = await User.findByIdAndUpdate(_id, {

        firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
           bio: req.body.bio

      }, {new: true, runValidators: true})

      res.json(user)
        
    } catch (error) {
        
        res.json(error)
    }
})

//update user password
const updateUserPassword = expressAsyncHandler( async (req, res) => {

    const {_id} = req.user
    const {password} = req.body
    validateMongodbID(_id);

    const user = await User.findById(_id)

    if(password) {

       user.password = password;

       const updatedUser = await user.save()

       res.json(updatedUser)
    }

     res.json(user)
})

//user following
const followingUser = expressAsyncHandler( async (req, res) => {

   const { followId } = req.body;
   const  loginId  = req.user.id;

   //find the target user and check if the login id exist
   const targetUser = await User.findById(followId)

   const alreadyFollowing = targetUser.followers?.find(user => user.toString() === loginId.toString())

   if(alreadyFollowing) throw new Error('You have already followed this user')

   await User.findByIdAndUpdate(followId, {

    $push: {followers: loginId},
    isFollowing: true

   }, { new: true })

   await User.findByIdAndUpdate(loginId, {

    //push add something into array
    $push: { following: followId }

   }, { new: true })

   res.json('You have successfully followed this user')
})

//unfollowing user

const unfollowingUser = expressAsyncHandler( async (req, res) => {

  const { unFollowId } = req.body;
   const  loginId  = req.user.id;

   await User.findByIdAndUpdate(unFollowId, {

    //pull remove something from the array
    $pull: { followers: loginId },
    isFollowing: false

   }, {new: true})

   await User.findByIdAndUpdate(loginId, {

    $pull: {following: unFollowId}

   }, { new: true })

   res.json('You have successfully unfollowed this user')

})

//block user
const blockUser = expressAsyncHandler( async (req, res) => {

   const {id} = req.params;
   validateMongodbID(id);

   const user = await User.findByIdAndUpdate(id, {

    isBlocked: true

   }, { new: true })

   res.json(user)
})

//unblock user
const unblockUser = expressAsyncHandler( async (req, res) => {

    const {id} = req.params;

   const user = await User.findByIdAndUpdate(id, {

        isBlocked: false

    }, {new: true})

    res.json(user)
})



//account verification
const updateUserAccountVerification = expressAsyncHandler(async (req, res) => {

    const { token } = req.body;

    //hash token
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    
    //find this user with token

    const userFound = await User.findOne({

        accountVerificationToken: hashedToken,
        accountVerificationTokenExpireAt: {$gt: new Date()}
    })

    if(!userFound) throw new Error('Verification token not found');

    //update user to true
    userFound.isAccountVerified = true
    userFound.accountVerificationToken = undefined
    userFound.accountVerificationTokenExpireAt = undefined

    await userFound.save()

    res.json(userFound)
})



//password reset
const resetPassword = expressAsyncHandler(async (req, res) => {

const { token, password } = req.body

  const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

  //find this user by token
  const user = await User.findOne({passwordResetToken: hashedToken, passwordResetExpires: { $gt: new Date.now()} })
  if(!user) throw new Error('Token expired')

  //update user password
  user.password = password
  user.passwordResetToken = undefined
  user.passwordResetExpires = undefined
  
    await user.save()

  res.json(user)

})

//profile photo upload
const uploadProfilePhoto = expressAsyncHandler( async (req, res) => {
 
    //find the login user
    const {_id} = req.user;
    //block user
    blockUserFunction(req.user)
   

    //get path for the image
    const localPath = `public/images/profile/${req.file.filename}`

    //upload to cloudinary
    const uploadImg = await cloudinaryUploadImg(localPath)
    
    const foundUser = await User.findByIdAndUpdate(_id, {

        profilePhoto: uploadImg.url

    }, {new: true})

    //remove uploaded images
    

    res.json(foundUser)

})

export {

    registerUser,
    loginUser,
    fetchAllUsers,
    deleteUser,
    singleUserDetails,
    userProfile,
    updateUserProfile,
    updateUserPassword,
    followingUser,
    unfollowingUser,
    blockUser,
    unblockUser,
    updateUserAccountVerification,
    resetPassword,
    uploadProfilePhoto
}
import Post from "../models/Post.js";
import User from "../models/User.js";
import expressAsyncHandler from "express-async-handler";
import validateMongodbId from "../utils/validateMongodbID.js";
import Filter from 'bad-words';
import cloudinaryUploadImg from "../utils/cloudinary.js";
import fs from 'fs';
import blockUserFunction from "../utils/blockUserFunction.js";
//create post
const createPost = expressAsyncHandler(async (req, res) => {
const { _id } = req.user
//message if user is blocked 
  blockUserFunction(req.user)

  //check for bad words
 const filter = new Filter()

 const isProfane = filter.isProfane(req.body.title, req.body.description)
//block user
if(isProfane) {
 await User.findByIdAndUpdate(_id, {

    isBlocked: true
})

throw new Error('Your post is blocked, because it contains profane words. Please try again')
}

//prevent user if starter account to create more than 2 posts
if(req.user?.accountType === 'Starter Account' && req.user?.postCount >= 2) {

    throw new Error('Starter account can only create 2 posts. Get more followers')
}


//get the path of the image
const localPath = `public/images/posts/${req.body.filename}`

//upload to cloudinary
const uploadImg = await cloudinaryUploadImg(localPath)


try {

    const post = await Post.create({
        ...req.body,
         image: uploadImg.url,
          user: _id
        })

//update the user post count
await User.findByIdAndUpdate(_id, {

    $inc: {postCount: 1}
}, {new: true})

    res.json(post)

    //removed uploaded images
     fs.unlinkSync(localPath)
    
} catch (error) {

    res.json(error)
    
}
})

//get all posts
const getAllPosts = expressAsyncHandler(async (req, res) => {

    const searchCategory = req.query.category

  try {

     //check if searchCategory
     if(searchCategory) {

       const posts = await Post.find({ category: searchCategory }).populate('user').populate('comments').sort('-createdAt')
       res.json(posts)

    }else {

      const posts = await Post.find({}).populate('user').populate('comments').sort('-createdAt')
       res.json(posts)
    }

   

  } catch (error) {
   
    res.json(error)
  }
})

//get single post
const getSinglePost = expressAsyncHandler( async (req, res) => {

const {id} = req.params
validateMongodbId(id)

try {

    const post = await Post.findById(id)
    .populate('user')
    .populate('dislikes')
    .populate('likes')
    .populate('comments');

    //update number of views
    await Post.findByIdAndUpdate(id, {

        $inc: {numofViews: 1}

    }, {new: true})
    res.json(post)
    
} catch (error) {
   
    res.json(error)
}
})

//update post
const updatePost = expressAsyncHandler(async (req, res) => {

     const {id} = req.params
    validateMongodbId(id)

      try {

        const post = await Post.findByIdAndUpdate(id, {

            ...req.body,
            user: req.user._id

        }, {new: true})

        res.json(post)
        
      } catch (error) {

        res.json(error)
        
      }
})

//delete post
const deletePost = expressAsyncHandler(async (req, res) => {

    const {id} = req.params
    validateMongodbId(id)

    try {

        const post = await Post.findByIdAndDelete(id)
        res.json(post)
        
    } catch (error) {

        res.json(error)
        
    }
})

//post likes
const likePost = expressAsyncHandler(async (req, res) => {

   //find the post to be liked
   const {id} = req.body

   const post = await Post.findById(id)

   //find the login user
   const loginId = req.user._id

   //find if this user liked this post
   const isLiked = post?.isLiked

   //check if the user is already dislake post
   const alreadyDisliked = post?.dislikes?.find(userId => userId.toString() === loginId.toString())

   //remove the user from the dislikes array if exists
   if(alreadyDisliked) {

      const post = await Post.findByIdAndUpdate(id, {

        $pull: {dislikes: loginId},
        isDisliked: false

      }, {new: true})

      res.json(post)
   }

   //remove the user if he has likes
   if(isLiked) {

    const post = await Post.findByIdAndUpdate(id, {

       $pull: {likes: loginId},
       isLiked: false 

    }, {new: true})

    res.json(post)

   }else {

    //add to likes
    const post = await Post.findByIdAndUpdate(id, {

        $push: {likes: loginId},
        isLiked: true

   }, {new: true})

   res.json(post)

   }

})

//dislike post
const dislikePost = expressAsyncHandler(async (req, res) => {

    //find the post to be disliked
    const {postId} = req.body

    const post = await Post.findById(postId)
  

    //find the login user
    const loginId = req.user._id

    //find if user unliked this post
    const isDisliked = post?.isDisliked

    //check if user liked post
   const alreadyLiked = post.likes.find(userId => userId.toString() === loginId.toString())

   //remove the user from the likes array if exists
   if(alreadyLiked) {

    const post = await Post.findByIdAndUpdate(postId, {

        $pull: {likes: loginId},
        isLiked: false
    }, {new: true})

    res.json(post)
   
}

//remove user from dislikes if already disliked
if(isDisliked) {

    const post = await Post.findByIdAndUpdate(postId, {

        $pull: {dislikes: loginId},
        isDisliked: false
    }, {new: true})

    res.json(post)

}else {

    const post = await Post.findByIdAndUpdate(postId, {

        $push: {dislikes: loginId},
        isDisliked: true
    }, {new: true})

    res.json(post)
}

})

export {
    createPost,
    getAllPosts,
    getSinglePost,
    updatePost,
    deletePost,
    likePost,
    dislikePost
}
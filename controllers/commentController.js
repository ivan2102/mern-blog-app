import Comment from "../models/Comment.js";
import expressAsyncHandler from "express-async-handler";
import validateMongodbId from "../utils/validateMongodbID.js";
import blockUserFunction from "../utils/blockUserFunction.js";

//create comment
const createComment = expressAsyncHandler(async (req, res) => {
    const user = req.user;
    //check if user is blocked
    blockUserFunction(user)
    
    const {postId, description}  = req.body
    

   try {

    const comment = await Comment.create({

        ...req.body,
        user,
        post: postId,
        description

    })
    res.json(comment)
    
   } catch (error) {

    res.json(error)
    
   }
})

//all comments
const allComments = expressAsyncHandler(async (req, res) => {

    try {

        const comments = await Comment.find({}).sort('-createdAt')
        res.json(comments)
        
    } catch (error) {

        res.json(error)
        
    }
})

//single comment
const singleComment = expressAsyncHandler(async (req, res) => {

    const {id} = req.params
    validateMongodbId(id)

    try {

        const comment = await Comment.findById(id)
        res.json(comment)
        
    } catch (error) {

        res.json(error)
        
    }
})

//update comment
const updateComment = expressAsyncHandler(async (req, res) => {

    const {id} = req.params
   

    try {

        const updateComment = await Comment.findByIdAndUpdate(id, {
          
           user: req.user,
           description: req.body.description

        }, {new: true})

        res.json(updateComment)
        
    } catch (error) {

        res.json(error)
        
    }
})

//delete comment
const deleteComment = expressAsyncHandler(async (req, res) => {

   const {id} = req.params
   validateMongodbId(id)

   try {

    const comment = await Comment.findByIdAndDelete(id)
    res.json(comment)
    
   } catch (error) {

    res.json(error)
    
   }
})
export {

    createComment,
    allComments,
    singleComment,
    updateComment,
    deleteComment
}
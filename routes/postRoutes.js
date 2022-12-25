import express from 'express';
const router = express.Router();
import authMiddleware from '../middleware/authMiddleware.js';
import { 
    createPost,
     getAllPosts,
      getSinglePost, 
      updatePost, 
      deletePost,
      likePost,
      dislikePost 
    } from "../controllers/postController.js";
import { photoUpload, resizePostImage } from '../middleware/uploadPhoto.js';

router.post('/', 
authMiddleware, 
photoUpload.single('image'), 
resizePostImage, 
createPost)

router.put('/likes', authMiddleware, likePost)
router.put('/dislikes', authMiddleware, dislikePost)

router.get('/', getAllPosts)
router.get('/:id', getSinglePost)
router.put('/:id', authMiddleware, updatePost)
router.delete('/:id', authMiddleware, deletePost)


export default router;
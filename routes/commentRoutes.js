import express from 'express';
const router = express.Router();
import authMiddleware from '../middleware/authMiddleware.js';
import { 
    createComment,
     allComments,
      updateComment,
      singleComment,
       deleteComment } 
       from '../controllers/commentController.js';

       router.post('/', authMiddleware, createComment)
       router.get('/', allComments)
       router.put('/:id', authMiddleware, updateComment)
       router.delete('/:id', authMiddleware, deleteComment)
       router.get('/:id', authMiddleware, singleComment)


export default router;
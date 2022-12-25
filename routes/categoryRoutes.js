import express from 'express';
const router = express.Router();
import authMiddleware from '../middleware/authMiddleware.js';
import { 
    createCategory,
     allCategories,
      singleCategory, 
      updateCategory, 
      deleteCategory 
    } from '../controllers/categoryController.js';

    router.post('/', authMiddleware, createCategory)
    router.get('/', allCategories)
    router.get('/:id', singleCategory)
    router.put('/:id', authMiddleware, updateCategory)
    router.delete('/:id', authMiddleware, deleteCategory)

export default router;
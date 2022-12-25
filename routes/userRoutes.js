import express from 'express';
const router = express.Router();
import { registerUser,
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
       uploadProfilePhoto,
       
     } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { photoUpload, resizeProfileImage } from '../middleware/uploadPhoto.js';

router.post('/register', registerUser);
router.post('/login', loginUser)
router.put('/upload-photo',
 authMiddleware, 
 photoUpload.single('image'),
 resizeProfileImage,
  uploadProfilePhoto)
router.post('/reset-password', resetPassword)
router.get('/', authMiddleware, fetchAllUsers)
router.get('/profile/:id', authMiddleware, userProfile)
router.put('/', authMiddleware, updateUserProfile)
router.put('/password', authMiddleware, updateUserPassword)
router.put('/follow', authMiddleware, followingUser)
router.put('/unfollow', authMiddleware, unfollowingUser)
router.put('/block-user/:id', blockUser)
router.put('/unblock-user/:id', unblockUser)
router.put('/verify-account', authMiddleware, updateUserAccountVerification)
router.delete('/:id', deleteUser)
router.get('/:id', singleUserDetails)

export default router;
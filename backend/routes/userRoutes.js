import express from 'express'
import { 
    authUser, 
    registerUser, 
    logoutUser, 
    getUserProfile, 
    updateUserProfile,
    searchVoter,
    changeVote,

} from '../controllers/userController.js';
import { protect, protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protectAdmin, registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.route('/profile').get(protectAdmin, getUserProfile).put(protectAdmin, updateUserProfile);
router.route('/voter').post(protect, searchVoter);
router.route('/changevote').put(protect ,changeVote);

export default router;
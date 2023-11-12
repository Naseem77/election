import express from 'express'
import { 
    voteCount,
    voteCountByBox,
    voterByID,
    voteCountByLocation,
    getAllUsers,
    deleteUser,
    getAllLocations
   
} from '../controllers/adminController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();
router.route('/votecount').get(protectAdmin,voteCount);
router.route('/votecountbybox').post(protectAdmin,voteCountByBox);
router.route('/voterbyid').get(protectAdmin,voterByID);
router.route('/votecountbylocation').post(protectAdmin,voteCountByLocation);
router.route('/getusers').post(protectAdmin,getAllUsers);
router.route('/deleteuser').post(protectAdmin,deleteUser);
router.route('/alllocations').post(protectAdmin,getAllLocations);


export default router;
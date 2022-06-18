import express from 'express'
import authenticateUser from '../middleware/auth.js'
import { stream } from '../controllers/stremController.js';
const router = express.Router();
router.route('/streaming').post(stream);
export default router; 



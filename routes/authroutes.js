import express from 'express';
import { currentuserController, loginController, registerController } from '../controllers/authController.js';
import { authmiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// POST /api/v1/auth/register
router.post('/register', registerController);
// login post
router.post('/login' , loginController);
// current user
router.get('/current-user', authmiddleware, currentuserController);

export default router;
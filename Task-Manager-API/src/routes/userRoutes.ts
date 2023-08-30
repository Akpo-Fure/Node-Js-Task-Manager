import express from 'express';
import { signUp, login, logout, getMe, updateMe, deleteMe } from '../controllers/userController';
import { protect } from '../middleware/authMiddlware'

const router = express.Router();

router.post('/signup', signUp)
router.post('/login', login)
router.post('/logout', protect, logout)
router.get('/me', protect, getMe)
router.patch('/me', protect, updateMe)
router.delete('/me', protect, deleteMe)


export default router;
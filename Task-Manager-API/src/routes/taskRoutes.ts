import express from 'express';
import { getTasks, addTask, getTask, deleteTask, updateTaskStatus } from '../controllers/taskControllers';
import { protect } from '../middleware/authMiddlware';
const router = express.Router();


router.post('/', protect, addTask)
router.get('/', protect, getTasks)
router.get('/:id', protect, getTask)
router.delete('/:id', protect, deleteTask)
router.patch('/:id', protect, updateTaskStatus)


export default router;

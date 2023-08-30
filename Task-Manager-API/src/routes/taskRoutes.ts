import express, { Request, Response, NextFunction } from 'express';
import { getAllTasks, addTask, getTask, deleteTask, updateTask } from '../controllers/taskControllers';
import { protect } from '../middleware/authMiddlware';
const router = express.Router();



router.get('/', protect, getAllTasks)
router.get('/:id', protect, getTask)
router.post('/', protect, addTask)
router.patch('/:id', protect, updateTask)
router.delete('/:id', protect, deleteTask)


export default router;

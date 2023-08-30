import express, { Request, Response, NextFunction } from 'express';
import { getAllTasks, addTask, getTask, deleteTask, updateTask } from '../controllers/taskControllers';
const router = express.Router();


/* GET home page. */
router.get('/', function (req: Request, res: Response, next: NextFunction) {
  res.render('index', { title: 'Express' });
});

router.get('/', getAllTasks)
router.get('/:id', getTask)
router.post('/', addTask)
router.patch('/:id', updateTask)
router.delete('/:id', deleteTask)


export default router;

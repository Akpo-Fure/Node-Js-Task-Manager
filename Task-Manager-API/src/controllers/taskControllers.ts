import { Request, Response, NextFunction } from 'express';
import Task from '../models/taskModel';

export const getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json({ tasks });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}

export const addTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({ task });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}

export const getTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const task = await Task.findOne({ _id: id });
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.status(200).json({ task });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        await Task.deleteOne({ _id: id });
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}

export const updateTask = async (req: Request, res: Response, next: NextFunction) => {

}
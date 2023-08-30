import { Request, Response, NextFunction } from 'express';
import Task from '../models/taskModel';
import User from '../models/userModel';


export const addTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body.User = req.user;
        const task = await Task.create(req.body);
        await User.findByIdAndUpdate(req.user, { $push: { Tasks: task._id } }).populate('Tasks');
        res.status(201).json({ task });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}

export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tasks = await Task.find({ User: req.user })
        res.status(200).json({ tasks });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}

export const getTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const task = await Task.findById({ _id: id });
        if (!task) return res.status(404).json({ message: 'Task not found' });
        if (task.User.toString() !== req.user) return res.status(401).json({ error: 'Not authorized to view this task' });
        res.status(200).json({ task });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const task = await Task.findById({ _id: id });
        if (!task) return res.status(404).json({ error: 'Task not found' });
        if (task.User.toString() !== req.user) return res.status(401).json({ error: 'Not authorized to delete this task' });
        await Task.findByIdAndDelete({ _id: id });
        await User.findByIdAndUpdate(req.user, { $pull: { Tasks: id } }).populate('Tasks');
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}


export const updateTaskStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const task = await Task.findById({ _id: id });
        if (!task) return res.status(404).json({ error: 'Task not found' });
        if (task.User.toString() !== req.user) return res.status(401).json({ error: 'Not authorized to update this tasks status' });
        if (req.body.Status !== 'Completed' && req.body.Status !== 'InProgress' && req.body.Status !== 'Pending') return res.status(400).json({ error: 'Invalid status inputed' });
        task.Status = req.body.Status || task.Status;
        await task.save();
        res.status(200).json({ message: 'Task status updated successfully', task });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}

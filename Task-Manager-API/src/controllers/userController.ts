import express, { Request, Response, NextFunction } from 'express';
import User from '../models/userModel';
import { generateToken, setTokenCookie } from '../utils/tokenGenerator';



export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (await User.findOne({ Email: req.body.Email })) return res.status(400).json({ message: 'User already exists' });
        req.body.Email = req.body.Email.toLowerCase();
        const user = await User.create(req.body);
        if (!user) return res.status(400).json({ message: 'User not created' });
        const token = await generateToken(user._id);
        setTokenCookie(res, token);
        res.status(201).json({ message: 'User created successfully', token: token });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findOne({ Email: req.body.Email.toLowerCase() })
        if (user && await (user.matchPassword(req.body.Password))) {
            const token = await generateToken(user._id);
            setTokenCookie(res, token);
            return res.status(200).json({ message: 'User logged in successfully', token: token });
        } return res.status(400).json({ message: 'Invalid credentials' });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}
import { Request, Response, NextFunction } from 'express';
import User from '../models/userModel';
import { generateToken, setTokenCookie } from '../utils/tokenGenerator';



export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (await User.findOne({ Email: req.body.Email })) return res.status(400).json({ error: 'User already exists' });
        req.body.Email = req.body.Email.toLowerCase();
        const user = await User.create(req.body);
        if (!user) return res.status(400).json({ error: 'User not created' });
        const token = await generateToken(user._id);
        setTokenCookie(res, token);
        res.status(201).json({ message: 'User created successfully', Name: user.Name, token: token });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findOne({ Email: req.body.Email.toLowerCase() })
        if (user && await (user.matchPassword(req.body.Password))) {
            const token = await generateToken(user._id);
            setTokenCookie(res, token);
            return res.status(200).json({ message: 'User logged in successfully', Name: user.Name, token: token });
        } return res.status(400).json({ error: 'Invalid credentials' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) return res.status(400).json({ error: 'User not logged in' });
        res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
        res.status(200).json({ message: 'User logged out successfully' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(req.user).select(
            "-createdAt -updatedAt -__v -Password -_id"
        );;
        if (!user) return res.status(404).json({ message: 'Please login to view profile details' });
        res.status(200).json({ message: 'My profile', user: user });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}

export const updateMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(req.user);
        if (!user) return res.status(404).json({ error: 'Please login to update profile details' });
        if (req.body.Name) user.Name = req.body.Name;
        if (req.body.Email) user.Email = req.body.Email;
        if (req.body.Password) user.Password = req.body.Password;
        if (req.body.PhoneNumber) user.PhoneNumber = req.body.PhoneNumber;
        await user.save();
        res.status(200).json({ message: 'Profile updated successfully', user: user });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}

export const deleteMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(req.user);
        if (!user) return res.status(404).json({ error: 'Please login to delete account' });
        await user.deleteOne();
        res.status(200).json({ message: 'Account deleted successfully', user: user });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}
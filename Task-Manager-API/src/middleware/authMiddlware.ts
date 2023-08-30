import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies.jwt) {
            token = req.cookies.jwt;
        }
        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
                req.user = decoded.userId;
                const currentUser = await User.findById(req.user);

                if (!currentUser) {
                    return res.status(401).json({ message: "Author not found" });
                }
                // Store the authenticated author in res.locals
                res.locals.author = currentUser;
                next();
            } catch (error: any) {
                return res.status(401).json({
                    message: "Not authorized, Invalid token",
                    Error: error.message,
                });
            }
        } else {
            return res.status(401).json({ message: "Not authorized, no token" });
        }
    } catch (error: any) {
        res.status(500).json({ Error: error.message });
    }
};

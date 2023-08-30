import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

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
                next();
            } catch (error: any) {
                return res.status(401).json({
                    message: "Not authorized, Invalid token",
                    Error: error.message,
                });
            }
        } else {
            return res.status(401).json({ message: "Not authorized, login to continue" });
        }
    } catch (error: any) {
        res.status(500).json({ Error: error.message });
    }
};

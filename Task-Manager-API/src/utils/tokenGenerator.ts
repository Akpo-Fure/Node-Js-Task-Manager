import jwt from 'jsonwebtoken';
import { Response } from 'express';

export const generateToken = (userId: string) => {
    const token: string = jwt.sign({ userId }, process.env.JWT_SECRET!, {
        expiresIn: "1d",
    });
    return token;
}

export const setTokenCookie = (res: Response, token: string) => {
    res.setHeader("Set-Cookie", `jwt=${token}; HttpOnly; Max-Age=${1 * 24 * 60 * 60 * 100}; SameSite=Strict; Path=/;`);
}
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

type User = {
    userId: string;
    email: string;
    role: string;
};

type AuthRequest = Request & { user?: User };

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access denied, token missing!' });
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET as string) as User;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Invalid token' });
    }
};

import { expressjwt, Request } from 'express-jwt';
import dotenv from 'dotenv';
import { Secret } from 'jsonwebtoken';
import { NextFunction, Response } from 'express';

dotenv.config();
const secret = process.env.JWT_SECRET as Secret;

export const validateAuthToken = [
    expressjwt({ secret, algorithms: ['HS256'] }),
    (req: Request, res: Response, next: NextFunction) => {
        if (!req.auth?.preferred_username) return res.status(401).json('Error: Unauthorized');
        next();
    },
];

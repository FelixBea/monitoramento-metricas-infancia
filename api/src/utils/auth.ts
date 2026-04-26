import dotenv from 'dotenv';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

dotenv.config();
const secret = process.env.JWT_SECRET as Secret;

export const generateToken = (payload: JwtPayload) => {
    const token = jwt.sign(payload, secret, {
        expiresIn: '30m',
    });
    return token;
}
import { NextFunction, Request, Response, Router } from 'express';
import authService from '../services/auth';
import { User } from '../types/users';


const auth = Router();

auth.post('/token', (req: Request, res: Response) => {
    console.log("auth req: ", req.body);
    if (!req.body || !req.body.user || !req.body.password) return res.sendStatus(400);
    const userCredentials: User = { name: req.body.user, password: req.body.password };

    // send name and password object for auth service to validate
    const isAuthenticated = authService.authenticateUser(userCredentials);

    // if not authenticated, response is an auth error
    if (!isAuthenticated) {
        return res.sendStatus(401);
    }

    // if authenticated, generate auth token and send it in the response
    const token = authService.getToken(userCredentials.name)
    res.status(200).json({ token });
});

export default auth;

import { NextFunction, Request, Response, Router } from 'express';
import childrenService from '../services/children';

class NotFoundError extends Error {}

const children = Router();

children.get('/', (req: Request, res: Response) => {
    try {
        const data = childrenService.findAll();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json('Oops! Internal error');
    }
});

children.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params?.id;
        const data = childrenService.findById(req.params?.id as string);

        if (id && !data) {
            throw new NotFoundError('Record not found');
        }
        res.status(200).json(data);
    } catch (error: any) {
        const message = error?.message || 'Oops! Internal error';
        if (error instanceof NotFoundError) {
            res.status(404).json(message);
            return next();
        }
        res.status(500).json(message);
    }
});

export default children;

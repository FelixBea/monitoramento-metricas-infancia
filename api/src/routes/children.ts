import { NextFunction, Request, Response, Router } from 'express';
import childrenService from '../services/children';
import { Pagination } from '../utils/pagination';

class NotFoundError extends Error {}

const children = Router();

children.get('/', (req: Request, res: Response) => {
    try {
        const pagination = { page: Number(req.query?.page), size: Number(req.query?.size) };
        const data = childrenService.findAll(pagination);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json('Oops! Internal error');
    }
});

children.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params?.id;
        const data = childrenService.findById(id as string);

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

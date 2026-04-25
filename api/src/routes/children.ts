import { NextFunction, Request, Response, Router } from 'express';
import childrenService from '../services/children';
import { ChildrenFilterValues } from '../types/children';

class NotFoundError extends Error {}

const children = Router();

children.get('/', (req: Request, res: Response) => {
    try {
        const pagination = {
            page: req.query.page ? Number(req.query.page) : null,
            size: req.query.size ? Number(req.query.size) : null,
        };
        const filters: Partial<ChildrenFilterValues>[] = [];
        
        req.query?.bairro && filters.push({ bairro: req.query.bairro as string });
        req.query?.hasAlerts && filters.push({ hasAlerts: true });
        req.query?.reviewed && filters.push({ revisado: req.query.reviewed !== 'false' });

        const data = childrenService.findAll(pagination, filters);
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
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

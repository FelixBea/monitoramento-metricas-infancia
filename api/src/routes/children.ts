import { NextFunction, Response, Router } from 'express';
import { Request } from 'express-jwt';
import childrenService from '../services/children';
import { ChildrenFilterValues } from '../types/children';
import { validateAuthToken } from '../middleware/auth';

const children = Router();

children.get('/', (req: Request, res: Response) => {
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
});

children.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    const data = childrenService.findById(req.params?.id as string);
    res.status(200).json(data);
});

children.patch('/:id/review', validateAuthToken, (req: Request, res: Response, next: NextFunction) => {
    childrenService.reviewById(req.params?.id as string, req.auth?.preferred_username);
    res.status(204);
});

export default children;

import { NextFunction, Request, Response } from 'express';

export class NotFoundError extends Error {}

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(error.stack);
    const message = error?.message || 'Oops! Internal error';
    if (error instanceof NotFoundError) {
        res.status(404).json(message);
        return next();
    }
    res.status(500).json(message);
  }
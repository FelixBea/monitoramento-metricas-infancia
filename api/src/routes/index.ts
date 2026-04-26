import { Router } from 'express';
import childrenRouter from './children';
import authRouter from './auth';

const apiV1Router = Router();

apiV1Router.use('/children', childrenRouter)
apiV1Router.use('/auth', authRouter)

export { apiV1Router }
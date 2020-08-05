import { Router } from 'express';
import sessionRouter from './session.routes';
import UserRouter from './user.routes';
import naverRouter from './naver.routes';
import projectRouter from './project.routes';

const routes = Router();
routes.use('/sessions', sessionRouter);
routes.use('/user', UserRouter);
routes.use('/naver', naverRouter);
routes.use('/project', projectRouter);

export default routes;

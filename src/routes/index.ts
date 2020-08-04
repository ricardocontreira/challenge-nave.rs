import { Router } from 'express';
import UserRouter from './user.routes';
import naverRouter from './naver.routes';
import projectRouter from './project.routes';

const routes = Router();

routes.use('/user', UserRouter);
routes.use('/Naver', naverRouter);
routes.use('/project', projectRouter);

export default routes;

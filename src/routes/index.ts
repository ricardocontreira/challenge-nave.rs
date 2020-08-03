import { Router } from 'express';
import UserRouter from './user.routes';
import naverRouter from './naver.routes';

const routes = Router();

routes.use('/user', UserRouter);
routes.use('/Naver', naverRouter);

export default routes;

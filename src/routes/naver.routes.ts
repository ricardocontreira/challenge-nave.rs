/* eslint-disable camelcase */
import { Router } from 'express';
import CreateNaverService from '../services/CreateNaverService';

const naverRouter = Router();

naverRouter.post('/Store', async (request, response) => {
  const {
    name,
    birthdate,
    admission_date,
    job_role,
    userCreator_id,
  } = request.body;

  const CreateNaver = new CreateNaverService();

  const naver = CreateNaver.execute({
    name,
    birthdate,
    admission_date,
    job_role,
    userCreator_id,
  });

  return response.json(naver);
});

export default naverRouter;

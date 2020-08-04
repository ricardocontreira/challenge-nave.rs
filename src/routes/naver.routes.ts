/* eslint-disable camelcase */
import { Router } from 'express';
import { getRepository } from 'typeorm';
import CreateNaverService from '../services/CreateNaverService';

const naverRouter = Router();

naverRouter.get('/', async (request, response) => {
  const navers = await getRepository('Navers').find();
  return response.json(navers);
});

naverRouter.post('/Store', async (request, response) => {
  const {
    name,
    birthdate,
    admission_date,
    job_role,
    userCreator_id,
    projects,
  } = request.body;

  const CreateNaver = new CreateNaverService();

  const naverCreated = await CreateNaver.execute({
    name,
    birthdate,
    admission_date,
    job_role,
    userCreator_id,
    projects,
  });

  return response.json(naverCreated);
});

export default naverRouter;

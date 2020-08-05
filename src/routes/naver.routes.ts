/* eslint-disable camelcase */
import { Router } from 'express';
import { getRepository } from 'typeorm';
import CreateNaverService from '../services/CreateNaverService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import Naver from '../model/Naver';
import Project from '../model/Project';

const naverRouter = Router();

naverRouter.use(ensureAuthenticated);

naverRouter.get('/', async (request, response) => {
  const navers = await getRepository(Naver).find();
  return response.json(navers);
});

naverRouter.put('/Show/:id', async (request, response) => {
  const { id } = request.params;

  const NaverId = await getRepository(Naver).findOne(id);
  const projectId = await getRepository(Project).findOne(id);

  return response.json({ NaverId, projectId });
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

naverRouter.put('/update/:id', async (request, response) => {
  const { id } = request.params;

  const naver = await getRepository(Naver).findOne(id);

  if (naver) {
    getRepository(Naver).merge(naver, request.body);
    const NaverEdited = await getRepository(Naver).save(naver);
    return response.json(NaverEdited);
  }

  return response.json({ msg: 'Not User found' });
});

naverRouter.delete('/delete/:id', async (request, response) => {
  const { id } = request.params;

  const naverfound = await getRepository(Naver).findOne(id);

  if (naverfound) {
    await getRepository(Naver).delete(id);
    return response.json({ msg: 'naver was deleted' });
  }

  return response.json({ msg: 'Not found naver' });
});

export default naverRouter;

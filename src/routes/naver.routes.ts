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
  const userCreator_id = request.user.id;
  const { name, admission_date, job_role } = request.query;

  const naver = await getRepository(Naver)
    .createQueryBuilder('naver')
    .where('naver.userCreator_id = :userCreator_id', { userCreator_id })
    .where(navers => {
      if (name) {
        navers.orWhere('naver.name ilike :name', { name: `%${name}%` });
      }
      if (admission_date) {
        navers.orWhere('naver.admission_date = :admission_date', {
          admission_date,
        });
      }
      if (job_role) {
        navers.orWhere('naver.job_role ilike :job_role', {
          job_role: `%${job_role}%`,
        });
      }
    })
    .getMany();
  return response.json(naver);
});

naverRouter.put('/Show/:id', async (request, response) => {
  const { id } = request.params;
  const userCreator_id = request.user.id;

  const NaverId = await getRepository(Naver)
    .createQueryBuilder('naver')
    .where('naver.userCreator_id = :userCreator_id', { userCreator_id })
    .andWhere('naver.id = :id', { id })
    .getOne();

  const projectId = await getRepository(Project).find();

  return response.json({ NaverId, projectId });
});

naverRouter.post('/Store', async (request, response) => {
  const { name, birthdate, admission_date, job_role, projects } = request.body;

  const userCreator_id = request.user.id;

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
  const userCreator_id = request.user.id;
  const naver = await getRepository(Naver)
    .createQueryBuilder('naver')
    .where('naver.userCreator_id = :userCreator_id', { userCreator_id })
    .where('naver.id = :id', { id })
    .getOne();

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

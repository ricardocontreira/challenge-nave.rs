/* eslint-disable camelcase */
import { Router } from 'express';
import { getRepository } from 'typeorm';
import Naver from '../model/Naver';
import Project from '../model/Project';
import CreateProjectService from '../services/CreateProjectService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const projectRouter = Router();

projectRouter.use(ensureAuthenticated);

projectRouter.get('/', async (request, response) => {
  const userCreator_id = request.user.id;

  const { name } = request.query;
  const projects = await getRepository(Project)
    .createQueryBuilder('project')
    .where('project.userCreator_id = :userCreator_id', { userCreator_id })
    .getMany();
  if (name) {
    if (projects) {
      const result = await getRepository(Project)
        .createQueryBuilder('project')
        .where('project.name ilike :name', { name: `%${name}%` })
        .getMany();
      return response.json(result);
    }
  }
  return response.json(projects);
});

projectRouter.put('/Show/:id', async (request, response) => {
  const { id } = request.params;
  const userCreator_id = request.user.id;

  const projectId = await getRepository(Project)
    .createQueryBuilder('project')
    .where('project.userCreator_id = :userCreator_id', { userCreator_id })
    .where('project.id = :id', { id })
    .getOne();

  const naverId = await getRepository(Naver).find();

  return response.json({ projectId, naverId });
});

projectRouter.post('/Store', async (request, response) => {
  const { name, naver_id } = request.body;
  const userCreator_id = request.user.id;
  const CreateProject = new CreateProjectService();

  const projectCreated = await CreateProject.execute({
    name,
    naver_id,
    userCreator_id,
  });

  return response.json(projectCreated);
});

projectRouter.put('/update/:id', async (request, response) => {
  const { id } = request.params;
  const userCreator_id = request.user.id;
  const project = await getRepository(Project)
    .createQueryBuilder('projects')
    .where('projects.userCreator_id = :userCreator_id', { userCreator_id })
    .where('projects.id = :id', { id })
    .getOne();

  if (project) {
    getRepository(Project).merge(project, request.body);
    const projectEdit = await getRepository(Project).save(project);
    return response.json(projectEdit);
  }

  return response.json({ msg: 'Not project found' });
});

projectRouter.delete('/delete/:id', async (request, response) => {
  const { id } = request.params;
  const userCreator_id = request.user.id;

  const projectFound = await getRepository(Project)
    .createQueryBuilder('project')
    .where('project.userCreator_id = :userCreator_id', { userCreator_id })
    .getOne();

  if (projectFound) {
    await getRepository(Project).delete(id);
    return response.json({ msg: 'project was deleted' });
  }

  return response.json({ msg: 'Not project naver' });
});

export default projectRouter;

/* eslint-disable camelcase */
import { Router } from 'express';
import { getRepository, getManager } from 'typeorm';
import Naver from '../model/Naver';
import Project from '../model/Project';
import CreateProjectService from '../services/CreateProjectService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const projectRouter = Router();

projectRouter.use(ensureAuthenticated);

projectRouter.get('/', async (request, response) => {
  const projects = await getRepository(Project).find();
  return response.json(projects);
});

projectRouter.put('/Show/:id', async (request, response) => {
  const { id } = request.params;

  const projectId = await getRepository(Project).findOne(id);
  const naverId = await getRepository(Naver).find();

  return response.json({ projectId, naverId });
});

projectRouter.post('/Store', async (request, response) => {
  const { name, naver_id, userCreator_id } = request.body;

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

  const project = await getRepository(Project).findOne(id);

  if (project) {
    getRepository(Project).merge(project, request.body);
    const projectEdited = await getRepository(Project).save(project);
    return response.json(projectEdited);
  }

  return response.json({ msg: 'project not found' });
});

projectRouter.delete('/delete/:id', async (request, response) => {
  const { id } = request.params;

  const projectfound = await getRepository(Project).findOne(id);

  if (projectfound) {
    await getRepository(Project).delete(id);
    return response.json({ msg: 'project was deleted' });
  }

  return response.json({ msg: 'Not found project' });
});

export default projectRouter;

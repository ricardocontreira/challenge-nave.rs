/* eslint-disable camelcase */
import { Router } from 'express';
import { getRepository } from 'typeorm';
import CreateProjectService from '../services/CreateProjectService';

const projectRouter = Router();

projectRouter.get('/', async (request, response) => {
  const projects = await getRepository('Projects').find();
  return response.json(projects);
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

export default projectRouter;

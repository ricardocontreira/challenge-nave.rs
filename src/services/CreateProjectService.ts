/* eslint-disable camelcase */
import { getRepository } from 'typeorm';
import Project from '../model/Project';

interface Request {
  name: string;
  userCreator_id: string;
  naver_id: Array<string>;
}

class CreateProjectService {
  public async execute({
    name,
    naver_id,
    userCreator_id,
  }: Request): Promise<Project> {
    const projectRepository = getRepository(Project);
    const project = projectRepository.create({
      name,
      naver_id,
      userCreator_id,
    });

    await projectRepository.save(project);
    return project;
  }
}

export default CreateProjectService;

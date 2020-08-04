/* eslint-disable camelcase */
import { getRepository } from 'typeorm';
import Naver from '../model/Naver';

interface Request {
  name: string;
  birthdate: Date;
  admission_date: Date;
  job_role: string;
  userCreator_id: string;
  projects: Array<string>;
}

class CreateNaverService {
  public async execute({
    name,
    birthdate,
    admission_date,
    job_role,
    userCreator_id,
    projects,
  }: Request): Promise<Naver> {
    const naverRepository = getRepository(Naver);
    const naver = naverRepository.create({
      name,
      birthdate,
      admission_date,
      job_role,
      userCreator_id,
      projects,
    });

    await naverRepository.save(naver);
    return naver;
  }
}

export default CreateNaverService;

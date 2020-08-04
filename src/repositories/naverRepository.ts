import { EntityRepository, Repository } from 'typeorm';
import Naver from '../model/Naver';

@EntityRepository(Naver)
class naverRepository extends Repository<Naver> {}

export default naverRepository;

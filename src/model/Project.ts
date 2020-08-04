/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Naver from './Naver';

@Entity('Projects')
class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  userCreator_id: string;

  @Column('text', { array: true })
  naver_id: string[];

  @ManyToOne(() => Naver)
  @JoinColumn({ name: 'naver_id' })
  naver: Naver;
}

export default Project;

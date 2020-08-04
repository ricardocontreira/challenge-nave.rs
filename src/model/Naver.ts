/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from './User';

@Entity('Navers')
class Naver {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  birthdate: Date;

  @Column()
  admission_date: Date;

  @Column()
  job_role: string;

  @Column()
  userCreator_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userCreator_id' })
  Creator: User;

  @Column('text', { array: true })
  projects: string[];
}

export default Naver;

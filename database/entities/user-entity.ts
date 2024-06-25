import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base-entity';

@Entity()
export class User extends BaseEntity {
  @Column('varchar', { nullable: true })
  name: string;

  @Column('varchar', { nullable: true })
  email: string;

  @Column('varchar', { nullable: true })
  password: string;

  @Column('int', { nullable: true })
  age: number;

  @Column('numeric', { nullable: true })
  goal: number;

  @Column('numeric', { nullable: true })
  weight: number;

  @Column('numeric', { nullable: true })
  height: number;

  @Column('varchar', { nullable: true })
  gender: string;

  @Column('varchar', { nullable: true })
  image: string;
}

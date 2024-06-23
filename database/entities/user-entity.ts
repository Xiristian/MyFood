import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base-entity';

@Entity()
export class User extends BaseEntity {
  @Column('varchar')
  name: string;

  @Column('varchar')
  email: string;

  @Column('int')
  age: number;

  @Column('numeric')
  goal: number;

  @Column('numeric')
  weight: number;

  @Column('numeric')
  height: number;

  @Column('varchar')
  gender: string;
}

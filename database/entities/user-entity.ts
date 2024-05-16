import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base-entity';

@Entity()
export class User extends BaseEntity{
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  age: number;

  @Column()
  weight: number;

  @Column()
  height: number;

  @Column()
  gender: string;
}

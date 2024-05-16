import { Entity, Column, OneToMany, JoinColumn } from 'typeorm';
import { Food } from './food-entity';
import { BaseEntity } from './base-entity';

@Entity()
export class Meal extends BaseEntity {
  @Column('varchar')
  name: string;

  @Column('integer')
  order: number;

  @Column('varchar')
  iconName: string;

  @OneToMany('Food', 'meal', { cascade: true })
  @JoinColumn()
  foods: Food[];
}

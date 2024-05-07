import { Entity, Column, OneToMany, JoinColumn } from 'typeorm';
import { Food } from './food-entity';
import { BaseEntity } from './base-entity';

@Entity()
export class Meal extends BaseEntity{
  @Column()
  name: string;

  @Column()
  order: number;

  @OneToMany(() => Food, food => food.meal, { cascade: true })
  @JoinColumn()
  foods: Food[];
}

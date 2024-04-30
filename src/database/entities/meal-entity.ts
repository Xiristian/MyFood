// meal.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { Food } from './food-entity';

@Entity()
export class Meal {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => Food, food => food.meal, { cascade: true })
  @JoinColumn()
  foods!: Food[];
}

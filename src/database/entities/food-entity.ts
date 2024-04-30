// food.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Meal } from './meal-entity';

@Entity()
export class Food {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  quantity!: number;

  @Column()
  calories!: number;

  @ManyToOne(() => Meal, meal => meal.foods)
  @JoinColumn()
  meal!: Meal;
}

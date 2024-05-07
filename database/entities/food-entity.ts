import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Meal } from './meal-entity';
import { BaseEntity } from './base-entity';

@Entity()
export class Food extends BaseEntity{
  @Column()
  name: string;

  @Column()
  quantity: number;

  @Column()
  calories: number;

  @Column()
  date: Date;

  @ManyToOne(() => Meal, meal => meal.foods)
  @JoinColumn()
  meal: Meal;
}

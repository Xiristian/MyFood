import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Meal } from './meal-entity';
import { BaseEntity } from './base-entity';

@Entity()
export class Food extends BaseEntity {
  @Column('varchar')
  name: string;

  @Column('numeric')
  quantity: number;

  @Column('numeric')
  calories: number;

  @Column('date')
  date: Date;

  @ManyToOne('Meal', 'foods')
  @JoinColumn()
  meal: Meal;
}

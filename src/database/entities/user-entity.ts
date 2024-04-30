// user.entity.ts

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number; // Adicione "!" para indicar que a propriedade será inicializada

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

  constructor(
    name: string,
    email: string,
    age: number,
    weight: number,
    height: number,
    gender: string
  ) {
    this.name = name;
    this.email = email;
    this.age = age;
    this.weight = weight;
    this.height = height;
    this.gender = gender;
  }
}

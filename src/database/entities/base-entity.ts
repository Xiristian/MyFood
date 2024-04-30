// src/entities/base.entity.ts

import { BaseEntity as TypeORMBaseEntity, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseEntity extends TypeORMBaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
}

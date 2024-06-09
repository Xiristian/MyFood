import { Repository } from 'typeorm';
import { BaseEntity } from '../entities/base-entity';

export class BaseEntityRepository extends Repository<BaseEntity> {}

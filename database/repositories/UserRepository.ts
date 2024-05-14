import { Repository } from 'typeorm';
import { User } from '../entities/user-entity';

export class UserRepository extends Repository<User> {
  // Seus métodos personalizados aqui, como selects principais, insert, update, delete por id, etc.
}

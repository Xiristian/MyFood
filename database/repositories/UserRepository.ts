import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user-entity';

export class UserRepository {
  private userRepository: Repository<User>;

  constructor(dataSource: DataSource) {
    this.userRepository = dataSource.getRepository(User);
  }

  async findOne(): Promise<User> {
    return await this.userRepository.findOneOrFail({ where: { id: 1 } });
  }

  async create(user: Partial<User>): Promise<User> {
    return await this.userRepository.save({ ...user, id: 1 });
  }

  async update(user: Partial<User>): Promise<User> {
    const userToSave = await this.userRepository.findOne({
      where: { name: user.name },
    });
    if (!userToSave) throw new Error('User not found');
    return this.userRepository.save({ ...userToSave, ...user });
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async deleteAll(): Promise<void> {
    await this.userRepository.clear();
  }
}

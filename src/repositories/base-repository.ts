import { Repository, Connection, Entity, EntityRepository, DeleteResult } from 'typeorm';

@Entity()
class RegisterModel {
  id: number;
  text: string;
  is_toggled: boolean;
}

interface ICreateRegisterData {
  text: string;
}

@EntityRepository(RegisterModel)
export class RegistersRepository {
  private ormRepository: Repository<RegisterModel>;

  constructor(connection: Connection) {
    this.ormRepository = connection.getRepository(RegisterModel);
  }

  public async getAll(): Promise<RegisterModel[]> {
    const registers = await this.ormRepository.find();
    return registers;
  }

  public async create({ text }: ICreateRegisterData): Promise<RegisterModel> {
    const register = this.ormRepository.create({
      text,
      is_toggled: false,
    });

    await this.ormRepository.save(register);
    return register;
  }

  public async toggle(id: number): Promise<void> {
    await this.ormRepository.query(
      `
      UPDATE
        registers
      SET
        is_toggled = ((is_toggled | 1) - (is_toggled & 1))
      WHERE
        id = ?;
      `,
      [id],
    );
  }

  public async delete(id: number): Promise<DeleteResult> {
    return await this.ormRepository.delete(id);
  }
}

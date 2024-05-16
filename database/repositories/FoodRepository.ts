import { DataSource, Repository } from 'typeorm';
import { Food } from '../entities/food-entity';

export class FoodRepository {
  private foodRepository: Repository<Food>;

  constructor(connection: DataSource) {
    this.foodRepository = connection.getRepository(Food);
  }

  // Selecionar alimentos por data e trazer informações da comida com a refeição
  async findFoodsByDate(date: Date): Promise<Food[]> {
    return this.foodRepository.createQueryBuilder('food')
      .leftJoinAndSelect('food.meal', 'meal')
      .where('food.date = :date', { date })
      .getMany();
  }

  // Inserir um novo alimento
  async createFood(foodData: Partial<Food>): Promise<Food> {
    const food = this.foodRepository.create(foodData);
    return this.foodRepository.save(food);
  }

  // Atualizar um alimento por ID
  async updateFood(id: number, foodData: Partial<Food>): Promise<Food | undefined> {
    await this.foodRepository.update(id, foodData);
    const updatedFood = await this.foodRepository.findOne({ where: { id } }); // Passando id como parte do objeto de opções
    return updatedFood || undefined; // Retornar undefined se updatedFood for null
  }

  // Excluir um alimento por ID
  async deleteFood(id: number): Promise<boolean> {
    const result = await this.foodRepository.delete(id);
    return result.affected === 1;
  }
}

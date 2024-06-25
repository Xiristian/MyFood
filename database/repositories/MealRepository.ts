// src/repositories/meal-repository.ts
import { DataSource, Repository } from 'typeorm';
import { Meal } from '../entities/meal-entity';
import { Food } from '../entities/food-entity';

export class MealRepository {
  private mealRepository: Repository<Meal>;
  private foodRepository: Repository<Food>;

  constructor(dataSource: DataSource) {
    this.mealRepository = dataSource.getRepository(Meal);
    this.foodRepository = dataSource.getRepository(Food);
  }

  async findAll(): Promise<Meal[]> {
    return this.mealRepository.find({ relations: ['foods'] });
  }

  async findByDate(date: Date): Promise<Meal[]> {
    const startDate = new Date(date);
    startDate.setUTCHours(0, 0, 0, -1);

    const endDate = new Date(date);
    endDate.setUTCHours(23, 59, 59, 999);

    const queryBuilder = this.mealRepository.createQueryBuilder('meal');
    const meals = await queryBuilder
      .leftJoinAndSelect('meal.foods', 'foods', 'date BETWEEN :startDate AND :endDate', { startDate, endDate })
      .getMany();

    return meals;
}

  async createMeal(meal: Partial<Meal>[]): Promise<Meal[]> {
    return await this.mealRepository.save(meal);
  }

  async createFood(
    name: string,
    quantity: number,
    calories: number,
    date: Date,
    mealId: number,
  ): Promise<Food> {
    const meal = await this.mealRepository.findOne({
      where: { id: mealId },
      relations: ['foods'],
    });
    if (!meal) throw new Error('Meal not found');

    const food = this.foodRepository.create({ name, quantity, calories, date });
    food.meal = meal;
    return this.foodRepository.save(food);
  }

  async update(id: number, name: string, order: number): Promise<Meal> {
    const meal = await this.mealRepository.findOne({
      where: { id },
      relations: ['foods'],
    });
    if (!meal) throw new Error('Meal not found');

    meal.name = name;
    meal.order = order;
    return this.mealRepository.save(meal);
  }

  async delete(id: number): Promise<void> {
    await this.mealRepository.delete(id);
  }
}

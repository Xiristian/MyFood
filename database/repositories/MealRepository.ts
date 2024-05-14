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
    const queryBuilder = this.mealRepository.createQueryBuilder('meal');
    const meals = await queryBuilder
      .leftJoinAndSelect('meal.foods', 'foods')
      .where('meal.date = :date', { date })
      .getMany();

    return meals;
  }

  async createMeal(name: string, order: number): Promise<Meal> {
    const meal = this.mealRepository.create({ name, order });
    return this.mealRepository.save(meal);
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

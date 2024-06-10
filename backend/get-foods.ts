import axios from 'axios';

export interface FoodDTO {
  brand_name: string;
  food_description: string;
  food_id: string;
  food_name: string;
  food_type: string;
  food_url: string;
  quantity: number;
  unit: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
}

export interface FoodsDTO {
  foods: FoodDTO[];
  max_results: string;
  page_number: string;
  total_results: string;
}

export const getFoods = async (search: string, page: number = 0): Promise<FoodDTO[]> => {
  try {
    const { data }: { data: FoodsDTO } = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/foods`,
      { timeout: 20000, params: { search, page, pageSize: 50 } },
    );
    return data.foods;
  } catch (error) {
    console.error(error);
    return [];
  }
};

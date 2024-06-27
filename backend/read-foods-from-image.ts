import axios from 'axios';
import * as fs from 'expo-file-system';
import { isTest } from './test';
import { FoodDTO, FoodsDTO } from './get-foods';

export const readFoodsFromImage = async (uri: string): Promise<FoodDTO[]> => {
  if (isTest) return test;
  try {
    const image = await fs.readAsStringAsync(uri, {
      encoding: fs.EncodingType.Base64,
    });

    const { data }: { data: FoodsDTO } = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/read-foods-from-image`,
      { image },
      { timeout: 20000 },
    );

    return data.foods;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const test: FoodDTO[] = [];

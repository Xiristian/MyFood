import axios from 'axios';
import * as fs from 'expo-file-system';
import { FoodFromImageDTO } from './FoodFromImageDTO';
import { isTest } from './test';

interface ResultDTO {
  error: string;
  foods: FoodFromImageDTO[];
}

export const readFoodsFromImage = async (uri: string): Promise<ResultDTO> => {
  if (isTest) return test;
  try {
    const image = await fs.readAsStringAsync(uri, {
      encoding: fs.EncodingType.Base64,
    });

    const { data }: { data: ResultDTO } = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/read-foods-from-image`,
      { image },
      { timeout: 20000 },
    );

    return { error: data.error, foods: data.foods };
  } catch (error) {
    console.error(error);
    return {
      error:
        'Não foi possível estabelecer conexão com o servidor. Verifique sua conexão de internet.',
      foods: [],
    };
  }
};

const test: ResultDTO = {
  error: '',
  foods: [
    {
      name: 'Bolo',
      filling: ['chocolate'],
      fillingIdentified: false,
      quantity: 1,
      unit: 'fatia',
    },
  ],
};

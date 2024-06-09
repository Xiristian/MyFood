import axios from 'axios';
import * as fs from 'expo-file-system';
import { FoodDTO } from './FoodDTO';

interface ResultDTO {
  error: string;
  foods: FoodDTO[];
}

export const readFoodsFromImage = async (uri: string): Promise<ResultDTO> => {
  try {
    const image = await fs.readAsStringAsync(uri, {
      encoding: fs.EncodingType.Base64,
    });

    const { data }: { data: ResultDTO } = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/read-foods-from-image?is-test=${process.env.EXPO_PUBLIC_IS_TEST}`,
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

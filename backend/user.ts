import axios from 'axios';
import { isTest } from './test';

export interface UserDTO {
  name: string;
  password: string;
  age?: number;
  height?: number;
  weight?: number;
  goal?: number;
}

export const login = async (user: UserDTO): Promise<UserDTO | string> => {
  if (isTest) return test;
  try {
    const { data }: { data: UserDTO } = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/login`,
      { user },
      { timeout: 20000 },
    );

    return data;
  } catch (error) {
    console.error(error);
    return 'Erro ao fazer login!';
  }
};

export const register = async (user: UserDTO): Promise<string> => {
  try {
    await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/register`, { user }, { timeout: 20000 });

    return 'Sucesso ao cadastrar!';
  } catch (error) {
    console.error(error);
    return 'Erro ao cadastrar!';
  }
};

const test: UserDTO = { name: 'Teste', password: '', age: 21, goal: 95, height: 180, weight: 100 };

import axios from 'axios';
import { isTest } from './test';

export interface UserDTO {
  name?: string;
  email?: string;
  password?: string;
  age?: number;
  height?: number;
  weight?: number;
  goal?: number;
}

export const login = async (user: UserDTO): Promise<UserDTO> => {
  if (isTest) return test;
  try {
    const { data }: { data: { user: UserDTO } } = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/login`,
      { user },
      { timeout: 20000 },
    );

    return data.user;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const register = async (user: UserDTO): Promise<string> => {
  try {
    if (isTest) return 'Sucesso ao cadastrar!';
    await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/register`, { user }, { timeout: 20000 });
    return 'Sucesso ao cadastrar!';
  } catch (error) {
    console.error(error);
    return 'Erro ao cadastrar!';
  }
};

const test: UserDTO = {
  name: 'Teste',
  email: 'Teste@email.com',
  password: '',
  age: 21,
  goal: 95,
  height: 180,
  weight: 100,
};

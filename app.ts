import express from 'express';
import { createConnection } from 'typeorm';
import { Food } from './src/database/entities/food-entity';
import { Meal } from './src/database/entities/meal-entity';
import { User } from './src/database/entities/user-entity';

const app = express(); // Definindo o identificador 'app' como uma instância de express()
const PORT = 3000; // Definindo o identificador 'PORT'

app.use(express.json());

createConnection({
  type: 'sqlite',
  database: 'path/to/database.db',
  entities: [User, Meal, Food],
  synchronize: true,
}).then(() => {
  console.log('Connected to the database');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

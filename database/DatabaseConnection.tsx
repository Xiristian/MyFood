import * as SQLite from 'expo-sqlite/legacy';
import { Text, View } from "@/components/Themed";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { DataSource } from "typeorm";
import { FoodRepository } from "./repositories/FoodRepository";
import { MealRepository } from "./repositories/MealRepository";
import { Meal } from './entities/meal-entity';
import { Food } from './entities/food-entity';

interface DatabaseConnectionContextData {
  foodRepository: FoodRepository;
  mealRepository: MealRepository;
  connection: DataSource | null;
}

const DatabaseConnectionContext = createContext<DatabaseConnectionContextData>(
  {} as DatabaseConnectionContextData
);

export const DatabaseConnectionProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [connection, setConnection] = useState<DataSource | null>(null);

  const connect = useCallback(async () => {
    const createdConnection = new DataSource({
      type: "expo",
      database: "myfood.db",
      driver: SQLite,
      entities: [Meal, Food],
      synchronize: true,
    });
    setConnection(await createdConnection.initialize());
  }, []);

  useEffect(() => {
    if (connection === null) {
      connect();
    }
  }, [connect, connection]);

  if (!connection) {
    return (
      <View
        style={{
          backgroundColor: "#7a3687",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Text lightColor="#eee" darkColor="rgba(255,255,255,0.1)">
          Loading...
        </Text>
      </View>
    );
  }

  return (
    <DatabaseConnectionContext.Provider
      value={{
        foodRepository: new FoodRepository(connection),
        mealRepository: new MealRepository(connection),
        connection: connection,
      }}
    >
      {children}
    </DatabaseConnectionContext.Provider>
  );
};

export function useDatabaseConnection() {
  const context = useContext(DatabaseConnectionContext);

  return context;
}

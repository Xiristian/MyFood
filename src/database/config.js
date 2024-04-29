import * as SQLite from "expo-sqlite";

// your entities will be imported here (User is an example)
import User from "./entities/User";

const config = {
  database: "mydatabase",
  driver: SQLite,
  entities: [User], // your entities will be added here (User is an example)
  synchronize: true,
  type: "expo",
};

export default config;

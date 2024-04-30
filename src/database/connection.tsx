// src/data/connection.tsx

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Connection, createConnection } from 'typeorm';
import { ActivityIndicator } from 'react-native';
import { BaseRepository } from '../repositories/base-repository';

interface DatabaseConnectionContextData {
  baseRepository: BaseRepository;
}

const DatabaseConnectionContext = createContext<DatabaseConnectionContextData>(
  {} as DatabaseConnectionContextData,
);

export const DatabaseConnectionProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [connection, setConnection] = useState<Connection | null>(null);

  const connect = useCallback(async () => {
    const createdConnection = await createConnection({
      type: 'expo',
      database: 'basedados.db',
      driver: require('expo-sqlite'),
      entities: [],
      synchronize: true,
    });

    setConnection(createdConnection);
  }, []);

  useEffect(() => {
    if (!connection) {
      connect();
    }
  }, [connect, connection]);

  if (!connection) {
    return <ActivityIndicator />;
  }

  return (
    <DatabaseConnectionContext.Provider
      value={{
        baseRepository: new BaseRepository(connection),
      }}
    >
      {children} {/* Renderize os componentes filhos aqui */}
    </DatabaseConnectionContext.Provider>
  );
};

export function useDatabaseConnection() {
  const context = useContext(DatabaseConnectionContext);
  if (!context) {
    throw new Error('useDatabaseConnection must be used within a DatabaseConnectionProvider');
  }
  return context;
}

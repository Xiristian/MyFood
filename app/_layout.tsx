import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, View, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native';
import { DatabaseConnectionProvider, useDatabaseConnection } from '@/src/database/connection';

const styles = StyleSheet.create({
  tasksContainer: {
    flex: 1,
    padding: 20,
  },
  taskItem: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  taskText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

function RootLayout() {
  const { baseRepository } = useDatabaseConnection();
  const [tasks, setTasks] = useState<TodoItem[]>([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    baseRepository.getAll().then(setTasks);
  }, [baseRepository]);

  const handleCreateTask = useCallback(async () => {
    const task = await baseRepository.create({ text: newTask });
    setTasks(current => [...current, task]);
    setNewTask('');
  }, [newTask, baseRepository]);

  const handleToggleTask = useCallback(async (id: number) => {
    await baseRepository.toggle(id);
    setTasks(current =>
      current.map(task =>
        task.id === id ? { ...task, is_toggled: !task.is_toggled } : task
      )
    );
  }, [baseRepository]);

  const handleDeleteTask = useCallback(async (id: number) => {
    await baseRepository.delete(id);
    setTasks(current => current.filter(task => task.id !== id));
  }, [baseRepository]);

  return (
    <SafeAreaView style={styles.tasksContainer}>
      <View>
        {tasks.map(task => (
          <TouchableOpacity
            key={String(task.id)}
            style={styles.taskItem}
            onPress={() => handleToggleTask(task.id)}
            onLongPress={() => handleDeleteTask(task.id)}
          >
            <Text style={styles.taskText}>{task.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newTask}
          onChangeText={setNewTask}
          placeholder="Add new task..."
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleCreateTask}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <DatabaseConnectionProvider>
      <RootLayout />
    </DatabaseConnectionProvider>
  );
}

import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, FlatList, View, Appearance } from 'react-native';
import { Text } from '@/components/Themed';
import Header from '@/components/Header';
import { Feather } from '@expo/vector-icons';
import SearchBar from '@/components/SearchBar';
import { router } from 'expo-router';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useDatabaseConnection } from '@/database/DatabaseConnection';

interface FoodItem {
  id: number;
  name: string;
  calories: number;
  quantity: number;
  unit: string;
}

const initialFoodData: FoodItem[] = [
  { id: 1, name: 'Banana', calories: 89, quantity: 1, unit: 'unidade' },
  { id: 2, name: 'Maçã', calories: 52, quantity: 1, unit: 'unidade' },
  { id: 3, name: 'Morango', calories: 32, quantity: 100, unit: 'g' },
];

interface FoodCardProps {
  item: FoodItem;
  index: number;
  onSelectItem: (id: number) => void;
  isSelected: boolean;
}

const FoodCard: React.FC<FoodCardProps> = ({ item, index, onSelectItem, isSelected }) => {
  const opacity = 0.8;
  const iconSize = 21;
  const appearance = Appearance.getColorScheme();

  return (
    <>
      <View
        style={[
          styles.separator,
          { backgroundColor: appearance === 'dark' ? '#333333' : '#E3E3E3' },
        ]}
      />
      <TouchableOpacity
        style={[styles.foodItem, isSelected && styles.selectedItem]}
        onPress={() => onSelectItem(item.id)}>
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>{index + 1}</Text>
        </View>
        <View style={styles.foodInfo}>
          <Text style={styles.foodName}>{item.name}</Text>
          <Text style={styles.foodDetails}>Calorias: {item.calories}</Text>
          <Text style={styles.foodDetails}>Quantidade: {item.quantity}</Text>
        </View>
        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={() => onSelectItem(item.id)}>
            <Feather
              name="plus-circle"
              size={iconSize}
              color="#547260"
              style={[styles.icon, { opacity }]}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log(`Editar ${item.name}`)}>
            <Feather
              name="edit"
              size={iconSize}
              color="#547260"
              style={[styles.icon, { opacity }]}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default function DescriptionScreen() {
  const route = useRoute<RouteProp<{ params: { mealId: number } }>>();
  const mealId = route.params?.mealId;

  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  const [allFoodData] = useState<FoodItem[]>(initialFoodData);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const appearance = Appearance.getColorScheme();
  const { mealRepository } = useDatabaseConnection();

  function handleSearch(text: string): void {
    const filteredResults = allFoodData.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase()),
    );
    setSearchResults(filteredResults);
  }

  function handleSelectItem(id: number): void {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(id)
        ? prevSelectedItems.filter((item) => item !== id)
        : [...prevSelectedItems, id],
    );
  }

  async function handleAddItems(): Promise<void> {
    if (selectedItems.length > 0) {
      console.log(`Adicionar alimentos com IDs ${selectedItems} à refeição ${mealId}`);
      for (const item of selectedItems) {
        const food = allFoodData.filter((value) => value.id === item)[0];
        await mealRepository.createFood(
          food.name,
          food.quantity,
          food.calories,
          new Date(),
          mealId,
        );
      }
      router.back();
    }
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: appearance === 'dark' ? '#333333' : '#FFFCEB' },
      ]}>
      <Header title={''} />
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Feather name="arrow-left" size={24} style={styles.arrow} />
      </TouchableOpacity>
      <Text style={[styles.title, { color: appearance === 'dark' ? '#FFFFFF' : '#547260' }]}>
        Adicionar Alimentos
      </Text>
      <SearchBar placeholder="Digite um alimento" onChangeText={handleSearch} />
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <FoodCard
            item={item}
            index={index}
            onSelectItem={handleSelectItem}
            isSelected={selectedItems.includes(item.id)}
          />
        )}
      />
      <View style={styles.bottomButtons}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.notFoundButton,
              { backgroundColor: appearance === 'dark' ? '#555555' : '#76A689' },
            ]}>
            <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>
              Não encontrei meu alimento
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.addButton,
              { backgroundColor: appearance === 'dark' ? '#333333' : '#547260' },
            ]}
            onPress={handleAddItems}>
            <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFCEB',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
  },
  arrow: {
    marginTop: 40,
    color: 'white',
  },
  separator: {
    height: 1,
    width: '80%',
    alignSelf: 'center',
    opacity: 0.8,
  },
  foodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  selectedItem: {
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    borderColor: '#76A689',
    borderWidth: 2,
    borderRadius: 10,
  },
  numberContainer: {
    alignItems: 'center',
    marginRight: 10,
  },
  numberText: {
    color: '#547260',
    fontSize: 16,
    fontWeight: 'bold',
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    color: '#547260',
    fontSize: 18,
    fontWeight: 'bold',
  },
  foodDetails: {
    color: '#547260',
    marginTop: 5,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  bottomButtons: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  addButton: {
    width: 150,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  notFoundButton: {
    width: 200,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

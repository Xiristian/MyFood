import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, FlatList, View } from 'react-native';
import { Text } from '@/components/Themed';
import Header from '@/components/Header';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import SearchBar from '@/components/SearchBar';

interface FoodItem {
  id: number;
  name: string;
  calories: number;
  quantity: string; // Renomeei para 'quantity'
}

const initialFoodData: FoodItem[] = [
  { id: 1, name: 'Banana', calories: 89, quantity: '1 unidade' },
  { id: 2, name: 'Maçã', calories: 52, quantity: '1 unidade' },
  { id: 3, name: 'Morango', calories: 32, quantity: '100g' },
];

interface FoodCardProps {
  item: FoodItem;
  index: number; 
  onSelectItem: (id: number) => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ item, index, onSelectItem }) => {
  const opacity = 0.8;
  const iconSize = 21; 

  return (
    <>
      <View style={styles.separator} />
      <TouchableOpacity style={styles.foodItem} onPress={() => onSelectItem(item.id)}>
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
            <Feather name="plus-circle" size={iconSize} color="#547260" style={[styles.icon, { opacity }]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log(`Editar ${item.name}`)}>
            <Feather name="edit" size={iconSize} color="#547260" style={[styles.icon, { opacity }]} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default function DescriptionScreen() {
  const navigation = useNavigation();
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  const [allFoodData] = useState<FoodItem[]>(initialFoodData);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  function handleSearch(text: string): void {
    const filteredResults = allFoodData.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setSearchResults(filteredResults);
  }

  function handleSelectItem(id: number): void {
    setSelectedItem(id);
  }

  function handleAddItem(): void {
    if (selectedItem !== null) {
      console.log(`Adicionar alimento com ID ${selectedItem} à refeição`);
    }
  }

  return (
    <View style={styles.container}>
      <Header title={''} />
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={24} style={styles.arrow} />
      </TouchableOpacity>
      <Text style={styles.title}>Adicionar Alimentos</Text>
      <SearchBar placeholder="Digite um alimento" onChangeText={handleSearch} />
      <FlatList
        data={searchResults}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item, index }) => (
          <FoodCard item={item} index={index} onSelectItem={handleSelectItem} />
        )}
      />
      <View style={styles.bottomButtons}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.notFoundButton}>
            <Text style={styles.buttonText}>Não encontrei meu alimento</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
            <Text style={styles.buttonText}>Adicionar</Text>
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
    color: '#547260',
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
    marginTop: 20,
    color:'white'
  },
  separator: {
    height: 1,
    backgroundColor: '#E3E3E3', // Cor do separator
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
  numberContainer: {
    alignItems: 'center',
    marginRight: 10,
  },
  numberText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  foodDetails: {
    marginTop: 5,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon:{
    marginRight:10
  },
  bottomButtons: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
  },
  addButton: {
    backgroundColor: '#547260',
    width: 150,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  notFoundButton: {
    backgroundColor: '#76A689',
    width: 200,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
    textAlign:'center'
  },
});

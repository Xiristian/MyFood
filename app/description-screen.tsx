import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Text, TouchableOpacity, View } from '@/components/Themed';
import Header from '@/components/Header';
import { Feather } from '@expo/vector-icons';
import SearchBar from '@/components/SearchBar';
import { router } from 'expo-router';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useDatabaseConnection } from '@/database/DatabaseConnection';
import { FoodDTO, getFoods } from '@/backend/get-foods';

interface FoodCardProps {
  item: FoodDTO;
  index: number;
  onSelectItem: (id: string) => void;
  isSelected: boolean;
}

const FoodCard: React.FC<FoodCardProps> = ({ item, index, onSelectItem, isSelected }) => {
  return (
    <>
      <View style={[styles.separator]} darkColor="#333333" lightColor="#E3E3E3" />
      <TouchableOpacity
        style={[styles.foodItem, isSelected && styles.selectedItem]}
        onPress={() => onSelectItem(item.food_id)}>
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>{index + 1}</Text>
        </View>
        <View style={styles.foodInfo}>
          <Text style={styles.foodName}>{item.food_name}</Text>
          <Text style={styles.foodDetails}>Calorias: {item.calories}</Text>
          <Text style={styles.foodDetails}>Quantidade: {item.quantity}</Text>
          <Text style={styles.foodDetails}>Unidade: {item.unit}</Text>
        </View>
        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={() => onSelectItem(item.food_id)}>
            <Feather name="plus-circle" size={21} color="#547260" style={[styles.icon]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log(`Editar ${item.food_name}`)}>
            <Feather name="edit" size={21} color="#547260" style={[styles.icon]} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default function DescriptionScreen() {
  const route = useRoute<RouteProp<{ params: { id: number } }>>();
  const mealId = route.params?.id;

  const { mealRepository } = useDatabaseConnection();

  const [searchResults, setSearchResults] = useState<FoodDTO[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const [searchText, setSearchText] = useState('');
  const [searchPage, setSearchPage] = useState(0);
  const [loading, setLoading] = useState(false);

  async function handleSearch(text: string) {
    setSearchText(text);
    if (text.length === 0) {
      setSearchResults([]);
      return;
    }
    let page = searchPage;
    if (text !== searchText) {
      setLoading(true);
      page = 0;
      setSearchPage(0);
    }
    const result = await getFoods(text, page);
    if (page === 0) setSearchResults(result);
    else setSearchResults((searchResults) => [...searchResults, ...result]);
    setLoading(false);
  }

  function handleSelectItem(id: string): void {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(id)
        ? prevSelectedItems.filter((item) => item !== id)
        : [...prevSelectedItems, id],
    );
  }

  async function handleAddItems(): Promise<void> {
    if (selectedItems.length > 0) {
      for (const item of selectedItems) {
        const food = searchResults.filter((value) => value.food_id === item)[0];
        await mealRepository.createFood(
          food.food_name,
          food.quantity,
          food.calories,
          new Date(),
          mealId,
        );
      }
      router.back();
    }
  }

  useEffect(() => {
    handleSearch(searchText);
  }, [searchPage]);

  return (
    <View style={[styles.container]} darkColor="#3C3C3C" lightColor="#FFFCEB">
      <Header title={''} />
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Feather name="arrow-left" size={24} style={styles.arrow} />
      </TouchableOpacity>
      <Text style={[styles.title]} darkColor="#547260" lightColor="#547260">
        Adicionar Alimentos
      </Text>
      <SearchBar placeholder="Digite um alimento" onChangeText={handleSearch} />
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.food_id}
        onEndReached={() => setSearchPage(searchPage + 1)}
        ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
        renderItem={({ item, index }) => (
          <FoodCard
            item={item}
            index={index}
            onSelectItem={handleSelectItem}
            isSelected={selectedItems.includes(item.food_id)}
          />
        )}
      />
      <View style={styles.bottomButtons}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.notFoundButton]}
            darkColor="#555555"
            lightColor="#76A689">
            <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>
              Não encontrei meu alimento
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.addButton]}
            darkColor="#555555"
            lightColor="#76A689"
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
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedItem: {
    borderColor: '#76A689',
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
    opacity: 0.8,
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

import { Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import CustomImagePicker from '@/components/ImagePicker';
import { FoodFromImageDTO } from '../backend/FoodFromImageDTO';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useDatabaseConnection } from '@/database/DatabaseConnection';

export default function Camera() {
  const navigation = useNavigation();

  const route = useRoute<RouteProp<{ params: { id: number, date: Date } }>>();
  const id = route.params?.id;
  const date = route.params?.date;

  const [image, setImage] = useState('');
  const [foods, setFoods] = useState<FoodFromImageDTO[]>([]);
  const [error, setError] = useState('');
  const { mealRepository } = useDatabaseConnection();

  useEffect(() => {
    async function loadData() {
      for (const food of foods)
        await mealRepository.createFood(food.name, food.quantity, 0, date, id);
    }
    loadData();
  }, [foods]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={25} style={styles.arrow} />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.container}>
        <CustomImagePicker setImage={setImage} setFoods={setFoods} setError={setError} />
        {error ? (
          <Text>{error}</Text>
        ) : foods ? (
          foods.map((food) => (
            <View key={food.name}>
              <Text>
                {food.name} {food.quantity} {food.unit}
              </Text>
              <Text>
                {food.filling.length > 0
                  ? food.fillingIdentified
                    ? `Possíveis recheios: ${food.filling.join(', ')}`
                    : `Recheio: ${food.filling.join(', ')}`
                  : 'Recheio não identificado'}
              </Text>
            </View>
          ))
        ) : null}
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        {image ? <Image source={{ uri: image }} style={{ width: 200, height: 200 }} /> : null}
      </ScrollView>
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
    color: 'white',
  },
  separator: {
    height: 1,
    backgroundColor: '#E3E3E3', // Cor do separator
    width: '80%',
    alignSelf: 'center',
    opacity: 0.8,
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
    textAlign: 'center',
  },
});

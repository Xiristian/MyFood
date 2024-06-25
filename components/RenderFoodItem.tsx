import { Food } from '@/database/entities/food-entity';
import { Text, TouchableOpacity, View } from '@/components/Themed';
import { Feather } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { useDatabaseConnection } from '@/database/DatabaseConnection';

const RenderFoodItem = ({ food, loadData }: { food: Food; loadData?: any }) => {
  const { foodRepository } = useDatabaseConnection();
  function onDelete(id: number) {
    foodRepository.deleteFood(id);
    loadData();
  }
  return (
    <View style={styles.foodItem} lightColor="#FFFCEB" darkColor="#3C3C3C">
      <View style={styles.foodDetails}>
        <Text style={styles.foodName}>{food.name}</Text>
        <Text style={styles.foodInfo}>Calorias: {food.calories}</Text>
        <Text style={styles.foodInfo}>Quantidade: {food.quantity}</Text>
        <Text style={styles.foodInfo}>Unidade: {food.unit}</Text>
      </View>
      <TouchableOpacity onPress={() => onDelete(food.id)}>
        <Feather name="trash-2" size={24} color="#E74C3C" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  foodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#76A689',
    marginVertical: 5,
  },
  foodDetails: {
    flexDirection: 'column',
    flex: 1,
    marginRight: 10,
  },
  foodName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#547260',
  },
  foodInfo: {
    fontSize: 14,
    color: '#547260',
  },
});

export default RenderFoodItem;

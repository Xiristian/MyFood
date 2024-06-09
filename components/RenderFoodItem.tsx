import { Food } from '@/database/entities/food-entity';
import { Text, View } from '@/components/Themed';

const RenderFoodItem = ({ food }: { food: Food }) => {
  return (
    <View lightColor="#FFFCEB" darkColor="#3C3C3C">
      <Text numberOfLines={1} style={styles.itemText}>
        {food.name}
      </Text>
    </View>
  );
};

const styles = {
  itemText: {
    marginLeft: 10,
    fontSize: 18,
    flex: 1,
    color: '#547260',
  },
};

export default RenderFoodItem;

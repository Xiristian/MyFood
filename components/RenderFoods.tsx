import { Food } from '@/database/entities/food-entity';
import React from 'react';
import { FlatList } from 'react-native';
import RenderFoodItem from './RenderFoodItem';

const RenderFoods = ({ foods }: { foods: Food[] }) => {
  return (
    <FlatList
      data={foods}
      keyExtractor={(item) => item.id.toString()}
      renderItem={(item) => <RenderFoodItem food={item.item} />}
    />
  );
};

export default RenderFoods;

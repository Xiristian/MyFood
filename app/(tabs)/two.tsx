import React, { useCallback, useState } from 'react';
import { StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Feather } from '@expo/vector-icons';
import { Meal } from '@/database/entities/meal-entity';
import { useDatabaseConnection } from '@/database/DatabaseConnection';
import { useFocusEffect } from 'expo-router';
import Header from '@/components/Header';

interface ItemMeal extends Meal {
  isExpanded?: Boolean;
}

export default function TabTwoScreen() {
  const { mealReposiory } = useDatabaseConnection();
  const initialData: ItemMeal[] = [
    { id: 1, name: 'Desjejum', iconName: 'sunrise', order: 0, foods: [] },
    { id: 2, name: 'Café da manhã', iconName: 'coffee', order: 0, foods: [] },
    { id: 3, name: 'Almoço', iconName: 'sun', order: 0, foods: [] },
    { id: 4, name: 'Café da tarde', iconName: 'coffee', order: 0, foods: [] },
    { id: 5, name: 'Jantar', iconName: 'moon', order: 0, foods: [] },
  ];

  const [data, setData] = useState<ItemMeal[]>([]);

  async function loadData() {
    let meals = await mealReposiory.findAll();
    if (!meals || meals.length === 0)
      meals = await mealReposiory.createMeal(initialData);
    setData(meals);
  }

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const toggleExpansion = (id: number) => {
    if (data)
      setData(data.map(item => {
        if (item.id === id) {
          return { ...item, isExpanded: !item.isExpanded };
        }
        return item;
      }));
  };

  function IconComponent({ iconName }: { iconName: string }) {
    if (iconName === 'sunrise') {
      return <Feather name="sunrise" size={24} color="#76A689" style={styles.icon} />;
    } else if (iconName === 'coffee') {
      return <Feather name="coffee" size={24} color="#76A689" style={styles.icon} />;
    } else if (iconName === 'sun') {
      return <Feather name="sun" size={24} color="#76A689" style={styles.icon} />;
    } else if (iconName === 'moon') {
      return <Feather name="moon" size={24} color="#76A689" style={styles.icon} />;
    } else {
      return null;
    }
  }

  const RenderItem = ({ item }: { item: ItemMeal }) => {
    function ArrowIcon() {
      if (item.isExpanded)
        return <Feather name="chevron-down" size={24} color="#76A689" style={styles.icon} />;
      else
        return <Feather name="chevron-right" size={24} color="#76A689" style={styles.icon} />;
    }

    return (
      <View lightColor="#FFFCEB" darkColor="#3C3C3C">
        <View style={styles.listItem} lightColor="#FFFCEB" darkColor="#3C3C3C">
          <IconComponent iconName={item.iconName} />
          <Text numberOfLines={1} style={styles.itemText}>{item.name}</Text>
          <TouchableOpacity onPress={() => toggleExpansion(item.id)}>
            <ArrowIcon />
          </TouchableOpacity>
        </View>
        {item.isExpanded ? <RenderExpandedContent /> : null}
      </View>
    );
  };

  const RenderExpandedContent = () => (
    <View style={styles.expandedContent} >
      <View style={styles.expandedContentIconsRow} lightColor="#FFFCEB" darkColor="#3C3C3C">
        <TouchableOpacity onPress={() => {/* Adicione a função do primeiro ícone */ }}>
          <View style={styles.iconWithText} lightColor="#FFFCEB" darkColor="#3C3C3C">
            <Feather name="camera" size={24} color="#76A689" style={styles.icon} />
            <Text style={styles.iconDescription}>Fotografar</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {/* Adicione a função do segundo ícone */ }}>
          <View style={styles.iconWithText} lightColor="#FFFCEB" darkColor="#3C3C3C">
            <Feather name="edit" size={24} color="#76A689" style={styles.icon} />
            <Text style={styles.iconDescription}>Descrever</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container} lightColor="#FFFCEB" darkColor="#3C3C3C">
      <Header title={''}/>
      <Text style={styles.title}>Minhas refeições</Text>
      <View style={styles.listContainer} lightColor="#FFFCEB" darkColor="#3C3C3C">
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={item => <RenderItem item={item.item} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#547260',
    marginBottom: 10,
    marginTop: 20,
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '80%',
  },
  listContainer: {
    flexGrow: 1,
    width: '90%',
    marginHorizontal: '5%',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#76A689',
  },
  itemText: {
    marginLeft: 10,
    fontSize: 18,
    flex: 1,
    color: '#547260'
  },
  icon: {
    marginRight: 10,
  },
  expandedContent: {
    marginTop: 10,
    width: '70%',
    marginHorizontal: '15%',
    marginBottom: 10,
  },
  expandedContentIconsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconWithText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconDescription: {
    marginLeft: 5,
    fontSize: 16,
    color: '#76A689'
  },
});

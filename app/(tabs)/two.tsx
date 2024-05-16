import React, { useCallback, useState } from 'react';
import { StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Text, View } from '@/components/Themed';
import { LuSunrise, LuCoffee, LuSun, LuMoon, LuCamera, LuPencil } from "react-icons/lu";
import { RiArrowDropRightFill, RiArrowDropDownFill } from "react-icons/ri";
import { Meal } from '@/database/entities/meal-entity';
import { useDatabaseConnection } from '@/database/DatabaseConnection';
import { useFocusEffect } from 'expo-router';

interface ItemMeal extends Meal {
  isExpanded?: Boolean;
}

export default function TabTwoScreen() {
  const initialData: ItemMeal[] = [
    { id: 1, name: 'Desjejum', iconName: 'sunrise', order: 0, foods: [] },
    { id: 2, name: 'Café da manhã', iconName: 'coffee', order: 0, foods: [] },
    { id: 3, name: 'Almoço', iconName: 'sun', order: 0, foods: [] },
    { id: 4, name: 'Café da tarde', iconName: 'coffee', order: 0, foods: [] },
    { id: 5, name: 'Jantar', iconName: 'moon', order: 0, foods: [] },
  ];

  const { mealReposiory } = useDatabaseConnection()

  const [data, setData] = useState<ItemMeal[]>([]);

  async function loadData() {
    let meals = await mealReposiory.findAll();
    if (!meals || meals.length === 0)
      meals = await mealReposiory.createMeal(initialData);
    console.log(meals)
    setData(meals)
  }

  useFocusEffect(
    useCallback(() => {
      loadData()
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
      return <LuSunrise name="sunrise" size={24} color="#76A689" style={styles.icon} />;
    } else if (iconName === 'coffee') {
      return <LuCoffee name="coffee" size={24} color="#76A689" style={styles.icon} />;
    } else if (iconName === 'sun') {
      return <LuSun name="sun" size={24} color="#76A689" style={styles.icon} />;
    } else if (iconName === 'moon') {
      return <LuMoon name="moon" size={24} color="#76A689" style={styles.icon} />;
    } else {
      return null;
    }
  }

  const RenderItem = ({ item }: { item: ItemMeal }) => {
    function ArrowIcon() {
      if (item.isExpanded)
        return <RiArrowDropDownFill name="arrow-bottom" size={24} color="#76A689" style={styles.icon} />
      else
        return <RiArrowDropRightFill name="arrow-right" size={24} color="#76A689" style={styles.icon} />
    }

    return (
      <View>
        <View style={styles.listItem}>
          {/* <IconComponent iconName={item.iconName} /> */}
          <Text numberOfLines={1} style={styles.itemText}>{item.name}</Text>
          <TouchableOpacity onPress={() => toggleExpansion(item.id)}>
            {/* <ArrowIcon /> */}
          </TouchableOpacity>
        </View>
        {item.isExpanded ? <RenderExpandedContent /> : null}
      </View>
    );
  };

  const RenderExpandedContent = () => (
    <View style={styles.expandedContent}>
      <View style={styles.expandedContentIconsRow}>
        <TouchableOpacity onPress={() => {/* Adicione a função do primeiro ícone */ }}>
          <View style={styles.iconWithText}>
            <LuCamera name="camera" size={24} color="#76A689" style={styles.icon} />
            <Text style={styles.iconDescription}>Fotografar</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {/* Adicione a função do segundo ícone */ }}>
          <View style={styles.iconWithText}>
            <LuPencil name="pencil" size={24} color="#76A689" style={styles.icon} />
            <Text style={styles.iconDescription}>Descrever</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" >
      <Text style={styles.title}>Minhas refeições</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.listContainer}>
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={item => <RenderItem item={item.item} />}
        />
      </View>
    </View >
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
    flex: 1,
    width: '90%',
    marginHorizontal: '5%',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#D5DFD9',
  },
  itemText: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
    color: '#76A689'
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
    fontSize: 14,
    color: '#76A689'
  },
});
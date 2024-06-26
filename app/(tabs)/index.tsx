import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, FlatList, Platform } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Feather } from '@expo/vector-icons';
import { Meal } from '@/database/entities/meal-entity';
import { useDatabaseConnection } from '@/database/DatabaseConnection';
import { useFocusEffect, useNavigation } from 'expo-router';
import RenderFoods from '@/components/RenderFoods';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import moment from 'moment';

interface ItemMeal extends Meal {
  isExpanded?: boolean;
}

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

const RenderItem = ({
  item,
  date,
  toggleExpansion,
  loadData,
}: {
  item: ItemMeal;
  date: Date;
  toggleExpansion: any;
  loadData: any;
}) => {
  function ArrowIcon() {
    if (item.isExpanded)
      return <Feather name="chevron-down" size={24} color="#76A689" style={styles.icon} />;
    else return <Feather name="chevron-right" size={24} color="#76A689" style={styles.icon} />;
  }

  return (
    <View lightColor="#FFFCEB" darkColor="#3C3C3C">
      <View style={styles.listItem} lightColor="#FFFCEB" darkColor="#3C3C3C">
        <IconComponent iconName={item.iconName} />
        <Text numberOfLines={1} style={styles.itemText}>
          {item.name}
        </Text>
        <TouchableOpacity onPress={() => toggleExpansion(item.id)}>
          <ArrowIcon />
        </TouchableOpacity>
      </View>
      {item.isExpanded ? <RenderFoods foods={item.foods} loadData={loadData} /> : null}
      {item.isExpanded ? (
        <RenderExpandedContent id={item.id} date={date} loadData={loadData} />
      ) : null}
    </View>
  );
};

const RenderExpandedContent = ({
  id,
  date,
  loadData,
}: {
  id: number;
  date: Date;
  loadData: any;
}) => {
  type RootStackParamList = {
    camera: { id: number; date: Date; loadData: any };
    'description-screen': { id: number; date: Date; loadData: any };
  };
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.expandedContent}>
      <View style={styles.expandedContentIconsRow} lightColor="#FFFCEB" darkColor="#3C3C3C">
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('camera', { id: id, date: date, loadData });
          }}>
          <View style={styles.iconWithText} lightColor="#FFFCEB" darkColor="#3C3C3C">
            <Feather name="camera" size={24} color="#76A689" style={styles.icon} />
            <Text style={styles.iconDescription}>Fotografar</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('description-screen', { id: id, date: date, loadData });
          }}>
          <View style={styles.iconWithText} lightColor="#FFFCEB" darkColor="#3C3C3C">
            <Feather name="edit" size={24} color="#76A689" style={styles.icon} />
            <Text style={styles.iconDescription}>Descrever</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function TabTwoScreen() {
  type RootStackParamList = { modal: any };
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { mealRepository } = useDatabaseConnection();

  const initialData: ItemMeal[] = [
    { id: 1, name: 'Desjejum', iconName: 'sunrise', order: 0, foods: [] },
    { id: 2, name: 'Café da manhã', iconName: 'coffee', order: 0, foods: [] },
    { id: 3, name: 'Almoço', iconName: 'sun', order: 0, foods: [] },
    { id: 4, name: 'Café da tarde', iconName: 'coffee', order: 0, foods: [] },
    { id: 5, name: 'Jantar', iconName: 'moon', order: 0, foods: [] },
  ];

  const [data, setData] = useState<ItemMeal[]>([]);
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  async function loadData() {
    let meals = await mealRepository.findAll();
    if (!meals || meals.length === 0) meals = await mealRepository.createMeals(initialData);
    meals = await mealRepository.findByDate(date);
    setData((data) => {
      for (let i = 0; i < meals.length; i++) {
        //@ts-ignore
        meals[i].isExpanded = data[i]?.isExpanded;
      }
      return meals;
    });
  }

  useEffect(() => {
    loadData();
  }, [date]);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowCalendar(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowCalendar(true);
  };

  const toggleExpansion = (id: number) => {
    if (data)
      setData(
        data.map((item) => {
          if (item.id === id) {
            return { ...item, isExpanded: !item.isExpanded };
          }
          return item;
        }),
      );
    loadData();
  };

  return (
    <View style={styles.container} lightColor="#FFFCEB" darkColor="#3C3C3C">
      <View style={{ flexDirection: 'row' }} lightColor="#FFFCEB" darkColor="#3C3C3C">
        <Text style={styles.title}>Minhas refeições</Text>
        <TouchableOpacity
          style={{ top: '5.5%', left: 10 }}
          onPress={() => navigation.navigate('modal')}>
          <Feather name="plus" size={24} color="#76A689" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={showDatepicker} style={styles.datePickerButton}>
        {Platform.OS !== 'ios' && (
          <Text style={styles.dateText}>{moment(date).format('DD/MM/yyyy')}</Text>
        )}
        {(showCalendar || Platform.OS === 'ios') && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'date'}
            display="default"
            onChange={onChange}
            accentColor="#547260"
            locale="pt-BR"
          />
        )}
        <Feather name="calendar" size={24} color="#76A689" style={styles.calendarIcon} />
      </TouchableOpacity>
      <View style={styles.listContainer} lightColor="#FFFCEB" darkColor="#3C3C3C">
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={(item) => (
            <RenderItem
              item={item.item}
              date={date}
              toggleExpansion={toggleExpansion}
              loadData={loadData}
            />
          )}
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
    color: '#547260',
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
    color: '#76A689',
  },
  calendarIcon: {
    marginLeft: 20,
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 7,
    borderWidth: 1,
    borderColor: '#76A689',
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20,
    width: '50%',
  },
  dateText: {
    fontSize: 16,
    color: '#547260',
    marginLeft: 30,
  },
});

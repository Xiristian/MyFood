import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, FlatList, View } from 'react-native';
import { Text } from '@/components/Themed';
import { LuSunrise, LuCoffee, LuSun, LuMoon, LuCamera, LuPencil } from "react-icons/lu";
import { RiArrowDropRightFill, RiArrowDropDownFill } from "react-icons/ri";

export default function TabTwoScreen() {
  const initialData = [
    { id: '1', text: 'Desjejum', iconName: 'sunrise', isExpanded: false },
    { id: '2', text: 'Café da manhã', iconName: 'coffee', isExpanded: false },
    { id: '3', text: 'Almoço', iconName: 'sun', isExpanded: false },
    { id: '4', text: 'Café da tarde', iconName: 'coffee', isExpanded: false },
    { id: '5', text: 'Jantar', iconName: 'moon', isExpanded: false },
  ];

  const [data, setData] = useState(initialData);

  const toggleExpansion = (id) => {
    setData(data.map(item => {
      if (item.id === id) {
        return { ...item, isExpanded: !item.isExpanded };
      }
      return item;
    }));
  };

  const renderItem = ({ item }) => {
    let iconComponent;
    if (item.iconName === 'sunrise') {
      iconComponent = <LuSunrise name="sunrise" size={24} color="#76A689" style={styles.icon} />;
    } else if (item.iconName === 'coffee') {
      iconComponent = <LuCoffee name="coffee" size={24} color="#76A689" style={styles.icon} />;
    } else if (item.iconName === 'sun') {
      iconComponent = <LuSun name="sun" size={24} color="#76A689" style={styles.icon} />;
    } else if (item.iconName === 'moon') {
      iconComponent = <LuMoon name="moon" size={24} color="#76A689" style={styles.icon} />;
    } else {
      iconComponent = null;
    }

    const arrowIcon = item.isExpanded ? (
      <RiArrowDropDownFill name="arrow-bottom" size={24} color="#76A689" style={styles.icon} />
    ) : (
      <RiArrowDropRightFill name="arrow-right" size={24} color="#76A689" style={styles.icon} />
    );

    return (
      <View>
        <View style={styles.listItem}>
          {iconComponent}
          <Text numberOfLines={1} style={styles.itemText}>{item.text}</Text>
          <TouchableOpacity onPress={() => toggleExpansion(item.id)}>
            {arrowIcon}
          </TouchableOpacity>
        </View>
        {item.isExpanded && renderExpandedContent()}
      </View>
    );
  };

  const renderExpandedContent = () => (
    <View style={styles.expandedContent}>
      <View style={styles.expandedContentIconsRow}>
        <TouchableOpacity onPress={() => {/* Adicione a função do primeiro ícone */}}>
          <View style={styles.iconWithText}>
            <LuCamera name="camera" size={24} color="#76A689" style={styles.icon} />
            <Text style={styles.iconDescription}>Fotografar</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {/* Adicione a função do segundo ícone */}}>
          <View style={styles.iconWithText}>
            <LuPencil name="pencil" size={24} color="#76A689" style={styles.icon} />
            <Text style={styles.iconDescription}>Descrever</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas refeições</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.listContainer}>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={renderItem}
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
    backgroundColor: '#FFFCEB',
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

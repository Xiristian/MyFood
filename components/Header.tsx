import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Sidebar from './Sidebar';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showBackButton = false }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigation = useNavigation();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          {showBackButton ? (
            <TouchableOpacity style={styles.menuIcon} onPress={() => navigation.goBack()}>
              <Feather name="arrow-left" size={24} color="#fff" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.menuIcon} onPress={toggleSidebar}>
              <FontAwesome name="bars" size={24} color="#fff" />
            </TouchableOpacity>
          )}
          <View style={styles.titleContainer}>
            <Text style={styles.headerTitle}>{title}</Text>
          </View>
          <View style={styles.placeholder} />
        </View>
      </View>
      {!showBackButton && <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />}
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: '13%',
    backgroundColor: '#547260',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    position: 'relative',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  menuIcon: {
    marginTop: 50,
  },
  placeholder: {
    width: 24, 
    height: 24,
    marginTop: 50,
  },
});

export default Header;

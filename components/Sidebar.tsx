import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, Animated } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const slideAnim = new Animated.Value(-250); // start off screen
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  useEffect(() => {
    if (isOpen) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -250,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isOpen]);

  const navigateTo = (screen: string) => {
    onClose();
    navigation.navigate(screen);
  };

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="none"
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.overlayTouchable} onPress={onClose} />
        <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}>
          <Text style={styles.sidebarTitle}>Menu</Text>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('index')}>
            <FontAwesome name="user" size={18} color="#344e41" style={styles.menuIcon} />
            <Text style={styles.menuItemText}>Usuário</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('meals')}>
            <FontAwesome name="book" size={18} color="#344e41" style={styles.menuIcon} />
            <Text style={styles.menuItemText}>Diário</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('camera')}>
            <FontAwesome name="camera" size={18} color="#344e41" style={styles.menuIcon} />
            <Text style={styles.menuItemText}>Escanear alimento</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'row',
  },
  overlayTouchable: {
    flex: 1,
  },
  sidebar: {
    width: 250,
    backgroundColor: '#FFFCEB',
    padding: 16,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
  },
  sidebarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
  },
  menuIcon: {
    marginRight: 10,
  },
  menuItemText: {
    fontSize: 18,
  },
});

export default Sidebar;

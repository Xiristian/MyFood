import React from 'react';
import { StyleSheet } from 'react-native';
import Logo from './Logo';
import { Text, View } from './Themed';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';

const Header: React.FC<BottomTabHeaderProps> = (props: BottomTabHeaderProps) => {
  return (
    <View style={[styles.headerContainer]} {...props}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{props?.options?.title}</Text>
        <Text style={styles.headerTitle}>OLAA</Text>
        <Logo />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: '13%',
    backgroundColor: '#547260',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#fff',
  },
});

export default Header;

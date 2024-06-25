import React from 'react';
import { StyleProp, StyleSheet, ImageStyle, Image } from 'react-native';
import LogoImg from '../assets/images/icon.png';
import { View } from './Themed';
import { ViewStyle } from 'react-native';

const Logo = ({
  style,
  imageStyle,
}: {
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
}) => {
  return (
    <View style={[styles.container, style]} lightColor="#FFFCEB" darkColor="#3C3C3C">
      <Image source={LogoImg} style={[styles.logo, imageStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '50%',
    height: '20%',
  },
  logo: {
    width: '100%',
    height: '100%',
    bottom: 50,
    resizeMode: 'contain',
  },
});

export default Logo;

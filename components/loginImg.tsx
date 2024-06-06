import React from 'react';
import { View, Image, StyleSheet } from 'react-native';



const FloatingSVG = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logoMeno.svg')}
        style={styles.svg}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    width: 100,
    height: 100,
    zIndex: 1, 
  },
  svg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', 
  },
});

export default FloatingSVG;

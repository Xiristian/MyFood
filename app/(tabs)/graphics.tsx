import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed';

export default function GraphicsScreen() {
  return <View style={styles.container} lightColor="#FFFCEB" darkColor="#3C3C3C"></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

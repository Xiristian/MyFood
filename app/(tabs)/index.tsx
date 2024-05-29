import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import Header from '@/components/Header';
import EditScreenInfo from '@/components/EditScreenInfo';


export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Header title="" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

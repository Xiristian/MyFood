import { StyleSheet } from 'react-native';
import { Text, TextInput, TouchableOpacity, View } from '@/components/Themed';
import { colors } from 'react-native-elements';
import { useState } from 'react';
import { useDatabaseConnection } from '@/database/DatabaseConnection';
import { useNavigation } from 'expo-router';

export default function ModalScreen() {
  const { mealRepository } = useDatabaseConnection();
  const navigation = useNavigation();

  const [description, setDescription] = useState('');

  async function onPress() {
    await mealRepository.createMeal({ name: description, iconName: 'sunrise' });
    navigation.goBack();
  }

  return (
    <>
      <View
        style={{
          opacity: 0.9,
          backgroundColor: colors.grey0,
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}></View>
      <View style={styles.container}>
        <View style={styles.modal} lightColor="#FFFCEB" darkColor="#3C3C3C">
          <Text style={styles.title}>Refeição</Text>
          <TextInput
            style={styles.input}
            keyboardType="default"
            value={description}
            onChangeText={setDescription}
            placeholder="Descrição"
          />
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>Criar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    height: 300,
    width: '80%',
    top: '-10%',
    opacity: 1,
    borderColor: colors.black,
    borderWidth: 5,
    borderRadius: 30,
    padding: 20,
    alignItems: 'center',
    paddingTop: '20%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#547260',
    paddingBottom: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#547260',
    backgroundColor: '#547260',
    borderRadius: 10,
    paddingHorizontal: 10,
    color: '#FFF',
  },
  button: {
    height: 45,
    width: 150,
    borderRadius: 10,
    marginBottom: 5,
    marginTop: 45,
    backgroundColor: '#76A689',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    paddingHorizontal: 10,
  },
});

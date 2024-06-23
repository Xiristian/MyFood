import React, { useState } from 'react';
import {
  StyleSheet,
  Alert,
  Pressable,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Text, View, TextInput } from '@/components/Themed';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import { register } from '@/backend/user';

const CadastroScreen = () => {
  const [image, setImage] = useState<string | null>(null);
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [altura, setAltura] = useState('');
  const [pesoAtual, setPesoAtual] = useState('');
  const [pesoMeta, setPesoMeta] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleCadastro = () => {
    if (!nome || !idade || !altura || !pesoAtual || !pesoMeta || !senha || !confirmarSenha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem. Por favor, tente novamente.');
      return;
    }

    register({
      name: nome,
      password: senha,
      age: parseInt(idade),
      goal: parseFloat(pesoMeta),
      weight: parseFloat(pesoAtual),
      height: parseFloat(altura),
    });
    console.log('Dados de cadastro:', {
      nome,
      idade,
      altura,
      pesoAtual,
      pesoMeta,
      senha,
    });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container} lightColor="#FFFCEB" darkColor="#3C3C3C">
          <Pressable style={styles.imageContainer} onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <FontAwesome name="camera" size={40} color="#547260" />
            )}
          </Pressable>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nome</Text>
            <TextInput style={styles.input} value={nome} onChangeText={setNome} />
          </View>

          <View
            style={[styles.row, styles.inputContainer]}
            lightColor="#FFFCEB"
            darkColor="#3C3C3C">
            <View style={styles.halfWidthContainer}>
              <Text style={styles.label}>Idade</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={idade}
                onChangeText={setIdade}
              />
            </View>
            <View style={styles.halfWidthContainer}>
              <Text style={styles.label}>Altura (cm)</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={altura}
                onChangeText={setAltura}
              />
            </View>
          </View>

          <View
            style={[styles.row, styles.inputContainer]}
            lightColor="#FFFCEB"
            darkColor="#3C3C3C">
            <View style={styles.halfWidthContainer}>
              <Text style={styles.label}>Peso Atual (kg)</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={pesoAtual}
                onChangeText={setPesoAtual}
              />
            </View>
            <View style={styles.halfWidthContainer}>
              <Text style={styles.label}>Peso Meta (kg)</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={pesoMeta}
                onChangeText={setPesoMeta}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Senha</Text>
            <TextInput style={styles.input} secureTextEntry value={senha} onChangeText={setSenha} />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirmar Senha</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleCadastro}>
            <Text>ENTRAR</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    color: '#FFF',
    marginBottom: 5,
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
  halfWidthContainer: {
    width: '48%',
  },
  button: {
    height: 45,
    width: 150,
    borderRadius: 15,
    marginBottom: 5,
    marginTop: 30,
    backgroundColor: '#76A689',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    marginTop: 20,
    alignSelf: 'center',
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#76A689',
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 50,
  },
});

export default CadastroScreen;

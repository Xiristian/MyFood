import React, { useState } from 'react';
import { StyleSheet, Alert, Pressable } from 'react-native';
import { Text, View, TextInput } from '@/components/Themed';

const CadastroScreen = () => {
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

    console.log('Dados de cadastro:', {
      nome,
      idade,
      altura,
      pesoAtual,
      pesoMeta,
      senha,
    });
  };

  return (
    <View style={styles.container} lightColor="#FFFCEB" darkColor="#3C3C3C">
      <TextInput style={styles.input} placeholder="Idade" value={nome} onChangeText={setNome} />
      <View style={styles.row} lightColor="#FFFCEB" darkColor="#3C3C3C">
        <TextInput
          style={[styles.input, styles.halfWidth]}
          placeholder="Idade"
          keyboardType="numeric"
          value={idade}
          onChangeText={setIdade}
        />
      </View>
      <View style={styles.row} lightColor="#FFFCEB" darkColor="#3C3C3C">
        <TextInput
          style={[styles.input, styles.halfWidth]}
          placeholder="Altura (cm)"
          keyboardType="numeric"
          value={altura}
          onChangeText={setAltura}
        />
      </View>
      <View style={styles.row} lightColor="#FFFCEB" darkColor="#3C3C3C">
        <TextInput
          style={[styles.input, styles.halfWidth]}
          placeholder="Peso Atual (kg)"
          keyboardType="numeric"
          value={pesoAtual}
          onChangeText={setPesoAtual}
        />
      </View>
      <View style={styles.row} lightColor="#FFFCEB" darkColor="#3C3C3C">
        <TextInput
          style={[styles.input, styles.halfWidth]}
          placeholder="Peso Meta (kg)"
          keyboardType="numeric"
          value={pesoMeta}
          onChangeText={setPesoMeta}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        secureTextEntry
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
      />
      <Pressable style={styles.button} onPress={handleCadastro} />
    </View>
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
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#547260',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 35,
  },
  halfWidth: {
    width: '48%',
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
});

export default CadastroScreen;

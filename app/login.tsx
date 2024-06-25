import { useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import LoginButton from '../components/loginButton';
import axios from 'axios';
import { useDatabaseConnection } from '@/database/DatabaseConnection';
import Logo from '../components/Logo';
import { login } from '@/backend/user';
import { useNavigation } from 'expo-router';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { Text, TextInput, TouchableOpacity, View } from '@/components/Themed';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const { userRepository } = useDatabaseConnection();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  type RootStackParamList = { 'user-register': LoginPageProps };
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogin = async () => {
    try {
      const response = await login({ email: email, password });

      if (response?.email) {
        await userRepository.create(response);
        onLogin();
      } else {
        Alert.alert('Erro', 'Credenciais inválidas. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      Alert.alert('Erro', 'Algo deu errado. Por favor, tente novamente mais tarde.');
    }
  };

  return (
    <View style={styles.container} lightColor="#FFFCEB" darkColor="#3C3C3C">
      <Logo />
      <View style={styles.formContainer} >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#FFFCEB"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry={true}
            placeholderTextColor="#FFFCEB"
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </View>
      <LoginButton onPress={handleLogin} />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('user-register', {onLogin});
        }}
        >
      <Text style={styles.text}>Não tem cadastro ainda? 
      <Text style={styles.underline}> Cadastre-se</Text>
      </Text>       
       </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '90%',
    paddingHorizontal: '5%',
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    height: 45,
    borderRadius: 10,
    backgroundColor: '#76A689',
    color: '#FFFCEB',
    paddingLeft: 10,
  },
  signUpText: {
    color: '#76A689',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  text: {
    marginTop:20,
    fontSize: 16,
    color: '#000',
  },
  underline: {
    textDecorationLine: 'underline',
    color: '#76A689',
  },
  

});

export default LoginPage;

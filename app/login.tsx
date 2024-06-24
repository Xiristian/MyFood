import { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
} from 'react-native';
import LoginButton from '../components/loginButton';
import axios from 'axios';
import { useDatabaseConnection } from '@/database/DatabaseConnection';
import FloatingSVG from '../components/loginImg';
import { login } from '@/backend/user';
import { useNavigation } from 'expo-router';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';

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
    /* if (email === 'usuario' && password === 'senha123') {
      console.log('Login realizado com sucesso!');
      onLogin();
    } else {
      Alert.alert('Erro', 'Credenciais inválidas. Por favor, tente novamente.');
    }
  };*/
    try {
      const response = await login({ name: email, password });

      if (response?.name) {
        console.log('Login realizado com sucesso!');

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
    <View style={styles.container}>
      <View style={styles.formContainer}>
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
      <Text style={styles.underline}>Cadastra-se</Text>
      </Text>       
       </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFCEB',
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
    fontSize: 16,
    color: '#000',
  },
  underline: {
    textDecorationLine: 'underline',
    color: '#76A689',
  },

});

export default LoginPage;

/* signUpText: {
    color: '#76A689',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
   </View>
        <Pressable onPress={handleSignUp}>
          <Text style={styles.signUpText}>Não possui cadastro? Cadastrar-se</Text>
        </Pressable>
      </View>
      */

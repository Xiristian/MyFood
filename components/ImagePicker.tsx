import * as DefaultImagePicker from 'expo-image-picker';
import { View, Text } from './Themed';
import { readFoodsFromImage } from '@/backend/read-foods-from-image';
import { Feather } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { FoodDTO } from '@/backend/get-foods';
import { useState } from 'react';

export default function ImagePicker({
  setImage,
  setFoods,
  setError,
  goBack,
}: {
  setImage: React.Dispatch<React.SetStateAction<string>>;
  setFoods: React.Dispatch<React.SetStateAction<FoodDTO[]>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  goBack: any;
}) {
  const [loading, setLoading] = useState(false);

  const pickImageFromLibrary = async () => {
    try {
      const imagePickerOptions: DefaultImagePicker.ImagePickerOptions = {
        mediaTypes: DefaultImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      };
      let imagePicked = await DefaultImagePicker.launchImageLibraryAsync(imagePickerOptions);

      if (!imagePicked.canceled) {
        setLoading(true);
        const result = await readFoodsFromImage(imagePicked.assets[0].uri);
        setFoods(result);
        goBack();
      }
    } finally {
      setLoading(false);
    }
  };

  const takePhotoWithCamera = async () => {
    try {
      const imagePickerOptions: DefaultImagePicker.ImagePickerOptions = {
        allowsEditing: true,
        quality: 1,
      };
      let imagePicked = await DefaultImagePicker.launchCameraAsync(imagePickerOptions);

      if (!imagePicked.canceled) {
        setLoading(true);
        const result = await readFoodsFromImage(imagePicked.assets[0].uri);
        setFoods(result);
        setImage(imagePicked.assets[0].uri);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container} lightColor="#FFFCEB" darkColor="#3C3C3C">
      {loading ? (
        <Text>Carregando...</Text>
      ) : (
        <View style={styles.bottomButtons} lightColor="#FFFCEB" darkColor="#3C3C3C">
          <TouchableOpacity onPress={takePhotoWithCamera}>
            <View style={styles.iconWithText} lightColor="#FFFCEB" darkColor="#3C3C3C">
              <Feather name="camera" size={54} color="#76A689" style={styles.icon} />
              <Text style={styles.iconDescription}>Fotografar</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity onPress={pickImageFromLibrary}>
            <View style={styles.iconWithText} lightColor="#FFFCEB" darkColor="#3C3C3C">
              <Feather name="image" size={54} color="#76A689" style={styles.icon} />
              <Text style={styles.iconDescription}>Carregar foto</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomButtons: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Button: {
    width: '100%',
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginVertical: 10,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  icon: {
    marginBottom: 5,
  },
  iconWithText: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 20,
  },
  iconDescription: {
    fontSize: 18,
    color: '#76A689',
    marginTop: 5,
  },
  separator: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#76A689',
    marginVertical: 10,
  },
});

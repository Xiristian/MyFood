import * as DefaultImagePicker from "expo-image-picker";
import { Button, View, Text } from "./Themed";
import { readFoodsFromImage } from "@/backend/read-foods-from-image";
import { FoodDTO } from "@/backend/FoodDTO";
import { useEffect } from "react";
import { Feather } from '@expo/vector-icons';
import { Alert, StyleSheet, TouchableOpacity } from "react-native";

export default function ImagePicker({
  setImage,
  setFoods,
  setError,
}: {
  setImage: React.Dispatch<React.SetStateAction<string>>;
  setFoods: React.Dispatch<React.SetStateAction<FoodDTO[]>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
}) {
  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await DefaultImagePicker.requestCameraPermissionsAsync();
      const { status: mediaLibraryStatus } = await DefaultImagePicker.requestMediaLibraryPermissionsAsync();
      if (cameraStatus !== 'granted' || mediaLibraryStatus !== 'granted') {
        Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar a câmera e a galeria.');
      }
    })();
  }, []);

  const pickImageFromLibrary = async () => {
    const imagePickerOptions: DefaultImagePicker.ImagePickerOptions = {
      mediaTypes: DefaultImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    };
    let imagePicked = await DefaultImagePicker.launchImageLibraryAsync(
      imagePickerOptions
    );

    if (!imagePicked.canceled) {
      const result = await readFoodsFromImage(imagePicked.assets[0].uri);
      setError(result.error);
      setFoods(result.foods);
      setImage(imagePicked.assets[0].uri);
    }
  };

  const takePhotoWithCamera = async () => {
    const imagePickerOptions: DefaultImagePicker.ImagePickerOptions = {
      allowsEditing: true,
      quality: 1,
    };
    let imagePicked = await DefaultImagePicker.launchCameraAsync(
      imagePickerOptions
    );

    if (!imagePicked.canceled) {
      const result = await readFoodsFromImage(imagePicked.assets[0].uri);
      setError(result.error);
      setFoods(result.foods);
      setImage(imagePicked.assets[0].uri);
    }
  };

  return (
    <View style={styles.container} lightColor="#FFFCEB" darkColor="#3C3C3C">
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

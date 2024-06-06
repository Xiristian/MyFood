import { Pressable, StyleSheet, Image } from 'react-native';
import { Text, View } from '@/components/Themed';
import Header from '@/components/Header';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export default function TabOneScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

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
    <View style={styles.container}>
      <Header title="" />
      <View style={styles.container} lightColor="#FFFCEB" darkColor="#3C3C3C">
        <Pressable style={styles.imageContainer} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <FontAwesome name="camera" size={40} color="#547260" />
          )}
        </Pressable>
        <View style={styles.userInfo} lightColor="#FFFCEB" darkColor="#3C3C3C">
          <Text style={styles.userName}>Julia de Luca</Text>
          <Pressable onPress={() => setDropdownVisible(!dropdownVisible)}>
            <FontAwesome name={dropdownVisible ? "chevron-up" : "chevron-down"} size={24} color="#435B4D" />
          </Pressable>
        </View>
        {dropdownVisible && (
          <View style={styles.dropdown} lightColor="#FFFCEB" darkColor="#3C3C3C">
            <View style={styles.dropdownItem }lightColor="#FFFCEB" darkColor="#3C3C3C">
              <MaterialCommunityIcons name="view-dashboard" size={24} color="#435B4D" />
              <Text style={styles.dropdownItemText}>Dashboard</Text>
            </View>
            <View style={styles.dropdownItem} lightColor="#FFFCEB" darkColor="#3C3C3C">
              <MaterialCommunityIcons name="account-network" size={24} color="#435B4D" />
              <Text style={styles.dropdownItemText}>Minha Rede</Text>
            </View>
            <View style={styles.dropdownItem} lightColor="#FFFCEB" darkColor="#3C3C3C">
              <MaterialCommunityIcons name="bell" size={24} color="#435B4D" />
              <Text style={styles.dropdownItemText}>Notificações</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    flex: 1,
  },
  imageContainer: {
    marginTop: 20,
    alignSelf: 'center',
    width: 200,
    height: 200,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#547260',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 50,
  },
  userInfo: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  dropdown: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dropdownItemText: {
    marginLeft: 10,
    fontSize: 20,
  },
});

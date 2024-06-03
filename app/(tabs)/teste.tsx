import { Image, StyleSheet, ScrollView } from "react-native";
import { Text, View } from "@/components/Themed";
import { useState } from "react";
import ImagePicker from "@/components/ImagePicker";
import { FoodDTO } from "@/backend/FoodDTO";
import Header from '@/components/Header';

export default function TabTesteScreen() {
  const [image, setImage] = useState("");
  const [foods, setFoods] = useState<FoodDTO[]>([]);
  const [error, setError] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header title={''} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <ImagePicker
          setImage={setImage}
          setFoods={setFoods}
          setError={setError}
        />
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        {error ? (
          <Text>{error}</Text>
        ) : foods ? (
          foods.map((food) => (
            <View key={food.name}>
              <Text>
                {food.name} {food.quantity} {food.unit}
              </Text>
              <Text>
                {food.filling.length > 0
                  ? food.fillingIdentified
                    ? `Possíveis recheios: ${food.filling.join(", ")}`
                    : `Recheio: ${food.filling.join(", ")}`
                  : "Recheio não identificado"}
              </Text>
            </View>
          ))
        ) : null}
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        {image ? (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  scrollViewContent: {
    paddingTop: 60, // Ajuste conforme a altura do header
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

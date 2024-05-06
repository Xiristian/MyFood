import { Image, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { useState } from "react";
import ImagePicker from "@/components/ImagePicker";
import { FoodDTO } from "@/backend/FoodDTO";

export default function TabTesteScreen() {
  const [image, setImage] = useState("");
  const [foods, setFoods] = useState<FoodDTO[]>([]);
  const [error, setError] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Teste</Text>
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
        foods.map((food) => {
          return (
            <>
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
            </>
          );
        })
      ) : null}
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {image ? (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

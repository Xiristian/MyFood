import * as DefaultImagePicker from "expo-image-picker";
import { Button } from "./Themed";
import { readFoodsFromImage } from "@/backend/read-foods-from-image";
import { FoodDTO } from "@/backend/FoodDTO";

export default function ImagePicker({
  setImage,
  setFoods,
  setError,
}: {
  setImage: React.Dispatch<React.SetStateAction<string>>;
  setFoods: React.Dispatch<React.SetStateAction<FoodDTO[]>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
}) {
  const pickImage = async () => {
    const fromLib = true;
    const imagePickerOptions: DefaultImagePicker.ImagePickerOptions = {
      mediaTypes: DefaultImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    };
    let imagePicked: DefaultImagePicker.ImagePickerResult;
    if (fromLib) {
      imagePicked = await DefaultImagePicker.launchImageLibraryAsync(
        imagePickerOptions
      );
    } else {
      imagePicked = await DefaultImagePicker.launchCameraAsync(
        imagePickerOptions
      );
    }

    if (!imagePicked.canceled) {
      const result = await readFoodsFromImage(imagePicked.assets[0].uri);
      setError(result.error);
      setFoods(result.foods);
      setImage(imagePicked.assets[0].uri);
    }
  };

  return (
    <Button
      darkColor="purple"
      lightColor="black"
      title="Foto da galeria"
      onPress={pickImage}
    />
  );
}

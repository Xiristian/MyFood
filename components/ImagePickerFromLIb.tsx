import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { Button } from "./Themed";

export default function ImagePickerFromLib({ setImage, onPress }: { setImage: React.Dispatch<React.SetStateAction<string>>, onPress?: () => void }) {
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <Button darkColor="purple" lightColor="black" title="Foto da galeria" onPress={() => { pickImage; onPress; }} />
    );
}
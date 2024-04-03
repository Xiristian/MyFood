import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { Button } from "./Themed";

export default function ImagePickerFromCam() {
    const [image, setImage] = useState('');

    const pickImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <Button darkColor="purple" lightColor="black" title= "Foto da câmera" onPress = { pickImage } />
    );
}
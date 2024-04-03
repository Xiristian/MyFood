import { Image, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import ImagePickerFromLib from '@/components/ImagePickerFromLIb';
import ImagePickerFromCam from '@/components/ImagePickerFromCam';
import { useState } from 'react';

export default function TabTesteScreen() {
    const [image, setImage] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tab Teste</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <ImagePickerFromLib setImage={setImage} />
            <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <ImagePickerFromCam />
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <EditScreenInfo path="app/(tabs)/teste.tsx" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});

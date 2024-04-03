import React, { useState } from 'react';
import ImagePickerFromLib from '@/components/ImagePickerFromLIb';
import * as FileSystem from 'expo-file-system';
import { Text, View } from '@/components/Themed';
import { FlatList, Image } from 'react-native';
import OpenAI from 'openai';

const GPTResponse = `{
    "id": "chatcmpl-98YukVPDjhtb4YhQ9WwZ2VLZf7zOR",
    "object": "chat.completion",
    "created": 1711827862,
    "model": "gpt-4-1106-vision-preview",
    "choices": [
        {
            "index": 0,
            "message": {
                "role": "assistant",
                "content": "{\"alimentos\": [{\"nome\": \"Beterraba cozida\", \"confiabilidade\": \"alto\", \"recheio\": [], \"quantidade\": 1, \"unidade\": \"porção\"}, {\"nome\": \"Brócolis cozido\", \"confiabilidade\": \"alto\", \"recheio\": [], \"quantidade\": 1, \"unidade\": \"porção\"}, {\"nome\": \"Salada de repolho\", \"confiabilidade\": \"médio\", \"recheio\": [], \"quantidade\": 1, \"unidade\": \"porção\"}, {\"nome\": \"Feijão cozido\", \"confiabilidade\": \"alto\", \"recheio\": [], \"quantidade\": 1, \"unidade\": \"porção\"}, {\"nome\": \"Frango assado\", \"confiabilidade\": \"alto\", \"recheio\": [], \"quantidade\": 2, \"unidade\": \"porção\"}, {\"nome\": \"Banana frita\", \"confiabilidade\": \"alto\", \"recheio\": [], \"quantidade\": 2, \"unidade\": \"porção\"}, {\"nome\": \"Spaghetti com tomate\", \"confiabilidade\": \"médio\", \"recheio\": [], \"quantidade\": 1, \"unidade\": \"porção\"}]}"
            },
            "logprobs": null,
            "finish_reason": "stop"
        }
    ],
    "usage": {
        "prompt_tokens": 677,
        "completion_tokens": 282,
        "total_tokens": 959
    },
    "system_fingerprint": null
}`

const pergunta = `O que há nesta imagem? Por favor, identifique os alimentos presentes na imagem e me envie um JSON com as seguintes informações para cada alimento: {nome: string; recheio: string[]; identificouRecheio: boolean; quantidade: number; unidade: string;}. Nome (ex: pizza, macarrão, bolo), Recheio (Se identificado, caso não, informe recheios comuns para o alimento), Identificou recheio (Caso o recheio tenha sido identificado marque como 'true', caso não tenha sido identificado, mas tenha informado possíveis recheios marque 'false', caso não tenha sido informado recheios, marque 'false'), Quantidade (ex: 1, 1.5, 2), Unidade (ex: fatia, prato, porção, unidade). Exemplo de JSON: {'alimentos': [{'nome': 'Pizza',  'recheio': ['queijo', 'presunto'], identificouRecheio: true, 'quantidade': 1, 'unidade': 'fatia'}, {'nome': 'Macarrão', 'recheio': [], identificouRecheio: false, 'quantidade': 1, 'unidade': 'prato'}, {'nome': 'Bolo', 'recheio': ['chocolate'], identificouRecheio: false, 'quantidade': 2, 'unidade': 'fatia'}]} A resposta deve conter apenas o JSON com as informações sem formatação`;

interface AlimentoDTO {
    nome: string;
    recheio: string[];
    identificouRecheio: boolean;
    quantidade: number;
    unidade: string;
}

const ChatGPTScreen = () => {
    const [selectedImage, setSelectedImage] = useState('');
    const [imageInfo, setImageInfo] = useState<AlimentoDTO[]>();

    const sendImageToChatGPT = async (imageUri: string) => {
        const openai = new OpenAI();
        try {
            let base64Image = await FileSystem.readAsStringAsync(imageUri, { encoding: FileSystem.EncodingType.Base64 });
            const response = await openai.chat.completions.create({
                model: 'gpt-4-vision-preview',
                messages: [
                    {
                        role: 'user',
                        content: [
                            {
                                type: "text",
                                text: pergunta
                            },
                            {
                                type: "text",
                                text: base64Image
                            }
                        ]
                    }
                ]
            })
            if (response.choices[0].message.content) {
                const alimentos = JSON.parse(response.choices[0].message.content).alimentos;
                setImageInfo(alimentos);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View>
            <ImagePickerFromLib setImage={setSelectedImage} onPress={() => { sendImageToChatGPT(selectedImage) }} />
            {selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />}
            <FlatList
                data={imageInfo}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.nome}</Text>
                        <Text>{item.recheio}</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default ChatGPTScreen;

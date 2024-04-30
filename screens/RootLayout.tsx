import React from 'react';
import { StatusBar, SafeAreaView, Text, View } from 'react-native';

const RootLayout: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Welcome to Your App!</Text>
        {/* Aqui você pode adicionar elementos comuns a todas as telas */}
      </View>
    </SafeAreaView>
  );
};

export default RootLayout;

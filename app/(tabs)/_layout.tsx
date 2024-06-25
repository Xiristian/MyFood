import React, { useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import LoginPage from '../login';
import { Pressable, View, StyleSheet, PressableProps, GestureResponderEvent } from 'react-native';
import Logo from '@/components/Logo';

interface CustomTabBarButtonProps extends PressableProps {
  children: React.ReactNode;
  setSelectedTab: (name: string) => void;
  selectedTab: string;
  name: string;
}

function CustomTabBarButton({
  children,
  setSelectedTab,
  selectedTab,
  name,
  ...props
}: CustomTabBarButtonProps) {
  return (
    <Pressable
      {...props}
      style={styles.button}
      onPress={(e: GestureResponderEvent) => {
        setSelectedTab(name);
        if (props.onPress) props.onPress(e);
      }}>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: selectedTab === name ? '#547260' : '#76A689',
          },
        ]}>
        {children}
      </View>
    </Pressable>
  );
}

export default function TabLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedTab, setSelectedTab] = useState('user');

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <View style={styles.container}>
      {isAuthenticated ? (
        <Tabs
          screenOptions={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarStyle: styles.tabBar,
          }}>
          <Tabs.Screen
            name="index"
            options={{
              tabBarButton: (props) => (
                <CustomTabBarButton
                  {...props}
                  setSelectedTab={setSelectedTab}
                  selectedTab={selectedTab}
                  name="meals">
                  <MaterialCommunityIcons name="carrot" size={40} color="white" />
                </CustomTabBarButton>
              ),
            }}
          />
          <Tabs.Screen
            name="user"
            options={{
              tabBarButton: (props) => (
                <CustomTabBarButton
                  {...props}
                  setSelectedTab={setSelectedTab}
                  selectedTab={selectedTab}
                  name="user">
                  <FontAwesome name="user" size={30} color="white" />
                </CustomTabBarButton>
              ),
            }}
          />
        </Tabs>
      ) : null}
      {!isAuthenticated && <LoginPage onLogin={handleLogin} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#FFFCEB',
  },
  tabBar: {
    flex: 1,
    backgroundColor: '#FFFCEB',
    maxHeight: '10%',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

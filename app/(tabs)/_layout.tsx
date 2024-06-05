import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Pressable, View, StyleSheet, PressableProps } from 'react-native';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  size?: number;
}) {
  return <FontAwesome size={props.size ?? 28} {...props} />;
}

interface CustomTabBarButtonProps extends PressableProps {
  children: React.ReactNode;
}

function CustomTabBarButton({ children, ...props }: CustomTabBarButtonProps) {
  return (
    <Pressable {...props} style={styles.button}>
      {children}
    </Pressable>
  );
}

export default function TabLayout() {
  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
          tabBarStyle: styles.tabBar,
        }}>
        <Tabs.Screen
          name="user"
          options={{
            title: 'Perfil',
            tabBarIcon: () => (
              <TabBarIcon name="user" color="white" size={24} />
            ),
            tabBarButton: (props) => (
              <CustomTabBarButton {...props}>
                <View style={[styles.iconContainer, { backgroundColor: '#76A689' }]}>
                  <FontAwesome name="user" size={30} color="white" />
                </View>
              </CustomTabBarButton>
            ),
          }}
        />
        <Tabs.Screen
          name="meals"
          options={{
            title: 'Refeições',
            tabBarIcon: () => (
              <MaterialCommunityIcons name="carrot" size={24} color="white" />
            ),
            tabBarButton: (props) => (
              <CustomTabBarButton {...props}>
                <View style={[styles.iconContainer, { backgroundColor: '#547260' }]}>
                  <MaterialCommunityIcons name="carrot" size={40} color="white" />
                </View>
              </CustomTabBarButton>
            ),
          }}
        />
        <Tabs.Screen
          name="teste"
          options={{
            title: 'Escanear',
            tabBarIcon: () => (
              <MaterialCommunityIcons name="camera" size={24} color="white" />
            ),
            tabBarButton: (props) => (
              <CustomTabBarButton {...props}>
                <View style={[styles.iconContainer, { backgroundColor: '#76A689' }]}>
                  <MaterialCommunityIcons name="camera" size={30} color="white" />
                </View>
              </CustomTabBarButton>
            ),
          }}
        />
      </Tabs>
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
    backgroundColor: '#FFFCEB',
    borderTopWidth: 0,
    height: 100,
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

import { Tabs } from 'expo-router';

import Ionicons from '@expo/vector-icons/Ionicons';

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { RootStackParamList } from '../types/Navigation';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Tabs
        screenOptions={{
        }}
      >
        <Tabs.Screen
          name="[pokemon]"
          options={{
          tabBarIcon: ({ color, size }) => <Ionicons color={color} name="book" size={size}/>,
          tabBarLabel: "",
          title: "Details",
        }}/>
        <Tabs.Screen
          name="index"
          options={{
          tabBarIcon: ({ color, size }) => <Ionicons color={color} name="grid" size={size}/>,
          tabBarLabel: "",
          title: "Pokédex",
        }}/>
        <Tabs.Screen
          name="liked"
          options={{
          tabBarIcon: ({ color,  size }) => <Ionicons color={color} name="heart" size={size}/>,
          tabBarLabel: "",
          title: "Liked",
        }}/>
      </Tabs>
    </SafeAreaProvider>
  );
}

import { Tabs } from 'expo-router';

import Ionicons from '@expo/vector-icons/Ionicons';

import { Providers } from '@/components/Providers';

export default function RootLayout() {
  return (
    <Providers>
      <Tabs>
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
    </Providers>
  );
}

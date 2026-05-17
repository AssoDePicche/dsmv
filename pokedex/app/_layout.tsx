import { Tabs } from 'expo-router';

import { StyleSheet, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { Providers } from '@/components/Providers';

export default function RootLayout() {
  return (
    <Providers>
      <Tabs screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
      }}>
        <Tabs.Screen
          name="[pokemon]/index"
          options={{
            href: null,
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

const styles = StyleSheet.create({
  tabBar: {
    alignItems: 'center',
    alignSelf: 'center',
    borderTopWidth: 0,
    flexDirection: 'row',
    height: 65,
    paddingBottom: 0,
  }
});

import { Tabs } from "expo-router";

import Ionicons from "@expo/vector-icons/Ionicons";

export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{
        tabBarIcon: ({ color, size }) => <Ionicons color={color} name="grid" size={size}/>,
        tabBarLabel: "",
        title: "Pokédex",
      }}/>
    </Tabs>
  );
}

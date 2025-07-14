import { Tabs } from "expo-router";

import Colors from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.colors.primary,
        tabBarInactiveTintColor: Colors.colors.secondary,
        headerShown: false,
        tabBarLabelStyle: {
          fontWeight: "bold",
          marginBottom: 3,
        },
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
          headerRight: () => [],
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

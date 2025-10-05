import { Drawer } from "expo-router/drawer";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { red } from "react-native-reanimated/lib/typescript/Colors";

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: "#000",
        drawerLabelStyle: { fontSize: 16 },
        headerRight: () => (
          <View style={{ flexDirection: "row", gap: 16, marginRight: 12 }}>
            {/* Notifications */}
            <TouchableOpacity onPress={() => {}}>
              <Ionicons name="notifications-outline" size={24} color="#000" />
            </TouchableOpacity>

            {/* Profile */}
            <TouchableOpacity onPress={() => {}}>
              <Ionicons name="person-circle-outline" size={26} color="#000" />
            </TouchableOpacity>
            {/* emergency */}
            <TouchableOpacity onPress={() => {}}>
              <AntDesign name="alert" size={26} color="red" />
            </TouchableOpacity>
          </View>
        ),
      }}
    >
      <Drawer.Screen
        name="home/index"
        options={{
          title: "",
          drawerIcon: ({ color, size }) => (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
            >
              <Ionicons name="home-outline" size={size} color="red" />
              <Text>Home</Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="wellbeing-calendar/index"
        options={{
          title: "",
          drawerIcon: ({ color, size }) => (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
            >
              <Ionicons name="medkit-outline" size={size} color="red" />
              <Text>Well-being Calendar</Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="profile/index"
        options={{
          title: "",
          drawerIcon: ({ color, size }) => (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
            >
              <Ionicons name="person-outline" size={size} color="red" />
              <Text>Profile</Text>
            </View>
          ),
        }}
      />

      <Drawer.Screen
        name="settings/index"
        options={{
          title: "",
          drawerIcon: ({ color, size }) => (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
            >
              <Ionicons name="settings-outline" size={size} color="red" />
              <Text>Settings</Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="journal/index"
        options={{
          title: "",
          drawerIcon: ({ color, size }) => (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
            >
              <MaterialCommunityIcons
                name="book-edit"
                size={size}
                color="red"
              />
              <Text>Journal</Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="history-tracker/index"
        options={{
          title: "",
          drawerIcon: ({ color, size }) => (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
            >
              <MaterialIcons name="history" size={size} color="red" />
              <Text>History Tracker</Text>
            </View>
          ),
        }}
      />
    </Drawer>
  );
}

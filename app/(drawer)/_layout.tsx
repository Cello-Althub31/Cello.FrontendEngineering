import { Drawer } from "expo-router/drawer";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import { Text, TouchableOpacity, View, Image, ScrollView } from "react-native";
import { router } from "expo-router";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import type { DrawerContentComponentProps } from "@react-navigation/drawer";

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      {/* Profile Header */}
      <TouchableOpacity
        onPress={() => router.push("/profile-info")}
        style={{
          paddingHorizontal: 16,
          paddingVertical: 20,
          borderBottomWidth: 1,
          borderBottomColor: "#e0e0e0",
          marginBottom: 16,
        }}
      >
        <View style={{ alignItems: "center" }}>
          {/* Profile Image */}
          <Image
            source={require("@/assets/images/profile.png")} // Help with image placement using context API so users can upload their own images
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              marginBottom: 12,
              backgroundColor: "#ddd",
            }}
          />

          {/* User Name */}
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              marginBottom: 4,
              color: "#000",
            }}
          >
            Ruth Okwuokenye
          </Text>

          {/* View Profile Link */}
          <Text
            style={{
              fontSize: 14,
              color: "#dc2626",
              fontWeight: "500",
            }}
          >
            View Profile
          </Text>
        </View>
      </TouchableOpacity>

      {/* Rest of Drawer Items */}
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
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
            <TouchableOpacity onPress={() => router.push("/profile")}>
              <Ionicons name="person-circle-outline" size={26} color="#000" />
            </TouchableOpacity>

            {/* Emergency */}
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
              <MaterialCommunityIcons
                name="pill-multiple"
                size={size}
                color="red"
              />
              <Text>Manage Medication</Text>
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
        name="journal/index"
        options={{
          title: "",
          drawerIcon: ({ color, size }) => (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
            >
              <MaterialCommunityIcons
                name="notebook-edit"
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
    </Drawer>
  );
}

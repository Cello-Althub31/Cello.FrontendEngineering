import { Drawer } from "expo-router/drawer";
import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: "#2563eb",
        drawerLabelStyle: { fontSize: 16 },
        headerRight: () => (
          <View style={{ flexDirection: "row", gap: 16, marginRight: 12 }}>
            {/* Notifications */}
            <TouchableOpacity
              onPress={() => {}}
            >
              <Ionicons name="notifications-outline" size={24} color="#000" />
            </TouchableOpacity>

            {/* Profile */}
            <TouchableOpacity onPress={() => {}}>
              <Ionicons name="person-circle-outline" size={26} color="#000" />
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
              <Ionicons name="home-outline" size={size} color={color} />
              <Text>Home</Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="medication-reminder/index"
        options={{
          title: "",
          drawerIcon: ({ color, size }) => (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
            >
              <Ionicons name="medkit-outline" size={size} color={color} />
              <Text>Medication Reminder</Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="active-reminder/index"
        options={{
          title: "",
          drawerIcon: ({ color, size }) => (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
            >
              <Ionicons name="checkmark-circle-outline" size={size} color={color} />
              <Text>Active Reminder</Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="hydration-reminder/index"
        options={{
          title: "",
          drawerIcon: ({ color, size }) => (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
            >
              <Ionicons name="water-outline" size={size} color={color} />
              <Text>Hydration Reminder</Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="doctors-appointment/index"
        options={{
          title: "",
          drawerIcon: ({ color, size }) => (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
            >
              <Ionicons name="person-outline" size={size} color={color} />
              <Text >Doctors Appointment</Text>
            </View>
          ),
        }}
      />

      {/* Add more drawer screens here */}
    </Drawer>
  );
}

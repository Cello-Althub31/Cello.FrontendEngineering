import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

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
        name="profile/index"
        options={{
          title: "",
          drawerIcon: ({ color, size }) => (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
            >
              <Ionicons name="person-outline" size={size} color={color} />
              <Text>Profile</Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
  name="wellbeing-calendar/index"
  options={{
    title: "",
    drawerIcon: ({ color, size }) => (
      <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
        <Ionicons name="calendar-outline" size={size} color={color} />
        <Text>Wellbeing Calendar</Text>
      </View>
    ),
  }}
/>
    

<Drawer.Screen
  name="journal/index"
  options={{
    title: "",
    drawerIcon: ({ color, size }) => (
      <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
        <Ionicons name="book-outline" size={size} color={color} />
        <Text>Journal</Text>
      </View>
    ),
  }}
/>

<Drawer.Screen
  name="history/index"
  options={{
    title: "",
    drawerIcon: ({ color, size }) => (
      <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
        <Ionicons name="time-outline" size={size} color={color} />
        <Text>History</Text>
      </View>
    ),
  }}
/>
<Drawer.Screen
  name="notifications/index"
  options={{
    title: "",
    drawerIcon: ({ color, size }) => (
      <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
        <Ionicons name="notifications-outline" size={size} color={color} />
        <Text>Notifications</Text>
      </View>
    ),
  }}
/>
<Drawer.Screen
  name="settings/index"
  options={{
    title: "",
    drawerIcon: ({ color, size }) => (
      <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
        <Ionicons name="settings-outline" size={size} color={color} />
        <Text>Settings</Text>
      </View>
    ),
  }}
/>
    </Drawer>
  );
}


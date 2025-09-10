import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router"; 


export default function ManageNotificationScreen() {
  const [selected, setSelected] = useState<string[]>([]);
  const navigation = useNavigation();

  const reminders = [
  {
    key: "medication",
    title: "Medication Reminder",
    description: "Never miss a dose—get gentle nudges at the right time.",
    icon: "pill",
  },
  {
    key: "hydration",
    title: "Hydration Reminders",
    description: "Keep your body refreshed—let Cello help you stay hydrated.",
    icon: "water-droplet",
  },
  {
    key: "appointments",
    title: "Doctor Appointments",
    description: "Get alerts before your appointments.",
    icon: "doctor",
  },
  ];
  const getIconSource = (iconName: string) => {
  switch (iconName) {
    case 'pill':
      return require('@/assets/icons/pill.png');
    case 'water-droplet':
      return require('@/assets/icons/water-droplet.png');
    case 'doctor':
      return require('@/assets/icons/doctor.png');
  };
};



  const toggleReminder = (type: string) => {
    setSelected((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const requestPermissions = async () => {
    if (Device.isDevice) {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "Enable notifications in settings.");
      }
    } else {
      Alert.alert("Must use physical device for notifications");
    }
  };

  const scheduleNotification = async (type: string) => {
    let body = "";
    switch (type) {
      case "medication":
        body = "Time to take your medication 💊";
        break;
      case "hydration":
        body = "Stay hydrated! Drink some water 💧";
        break;
      case "appointments":
        body = "Reminder: You have a doctor appointment 📅";
        break;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Cello Reminder",
        body: body,

      },
      trigger: null, 
    });

    // Alternative trigger 
    
    // For time-based trigger (5 seconds from now):
    // trigger: { seconds: 5 } as Notifications.TimeIntervalTriggerInput,
    
    // For daily trigger (specific time):
    // trigger: { 
    //   hour: 9, 
    //   minute: 0, 
    //   repeats: true 
    // } as Notifications.DailyTriggerInput,
    
    // For date-based trigger:
    // trigger: { 
    //   date: new Date(Date.now() + 5 * 1000) 
    // } as Notifications.DateTriggerInput,

    // For weekly-based trigger:
    // trigger: {
    //   weekday: 1, // 1 = Sunday, 2 = Monday, etc.
    //   hour: 9,
    //   minute: 0,
    //   repeats: true
    // } as Notifications.WeeklyTriggerInput
  };

  const saveReminders = async () => {
    try {
      await AsyncStorage.setItem("selectedReminders", JSON.stringify(selected));
      await requestPermissions();

      for (const type of selected) {
        await scheduleNotification(type);
      }

      Alert.alert("Reminders Set", "Your notifications are scheduled.");
      
      
      router.push("/home"); 
    } catch (error) {
      Alert.alert("Error", "Failed to save reminders.");
    }
  };

  const navigateToHome = () => {
 
    router.push("/home");
  };

  return (
    <ScrollView className="flex-1 bg-white p-5">
      <Text className="text-2xl font-bold mb-5">Wellbeing Calendar</Text>
      <View className="mb-6 flex-row items-center">

        <Image
    source={require('@/assets/icons/megaphone.png')}
    style={{ width: 24, height: 24, marginRight: 8 }}
    resizeMode="contain"
  />
        <Text className="text-xl font-semibold mb-1">Stay one step Ahead</Text>
        </View>
      <View className="mb-4">
        <Text className="text-gray-600">
          Choose what you want Cello to remind you about. You can always adjust
          this later in Settings.
        </Text>
      </View>

      <View className="bg-white p-4 rounded-lg mb-6">
        <Text className="text-xl font-bold mb-1">
          Recommended for you
        </Text>
        <Text className="text-zinc-900">Watch some tutorials</Text>
        <Image source={require('@/assets/icons/videoplay.png')} style={{ width: 24, height: 24, marginRight: 8, position: 'absolute', right: 16, top: 16 }}
    resizeMode="contain"
  />
      </View>

      {reminders.map((item) => (
        <TouchableOpacity
          key={item.key}
          onPress={() => toggleReminder(item.key)}
          className={`flex-row items-start p-4 mb-4 rounded-lg border ${
            selected.includes(item.key)
              ? "border-primary bg-primary/10"
              : "border-gray-300"
          }`}
        >
     <Image
  source={getIconSource(item.icon)}
  style={{
    width: 24,
    height: 24,
    marginRight: 12,
    tintColor: selected.includes(item.key) ? undefined : '#888',
  }}
  resizeMode="contain"
/>

          <View className="flex-1">
            <Text className="font-semibold text-base mb-1">{item.title}</Text>
            <Text className="text-gray-600 text-sm">{item.description}</Text>
          </View>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        onPress={navigateToHome}
        className="bg-red-500 p-4 rounded-lg mb-3"
      >
        <Text className="text-white text-center font-semibold">
          You can always set up reminders later
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        disabled={selected.length === 0}
        onPress={saveReminders}
        className={`p-4 rounded-lg ${
          selected.length === 0
            ? "bg-gray-300 opacity-50"
            : "bg-primary"
        }`}
      >
        <Text className="text-white text-center font-semibold">
          Select at least one reminder
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
import { StyleSheet, Text, View } from "react-native";
import MedicationReminderScreen from "@/screens/medication-reminder/medication-reminder.screen";
import Drawer from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";

const MedicationReminder = () => {
  return (
    <>
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
      />
      <MedicationReminderScreen />
      <StatusBar style="dark" />
    </>
  );
};

export default MedicationReminder;

const styles = StyleSheet.create({});

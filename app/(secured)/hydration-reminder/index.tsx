import { StyleSheet, Text, View } from 'react-native'
import HydrationReminderScreen from "@/screens/hydration-reminder/hydration-reminder.screen";
import Drawer from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";

const HydrationReminder = () => {
  return (
    <>
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
      />
      <HydrationReminderScreen />
      <StatusBar style="dark" />
    </>
  );
};

export default HydrationReminder;

const styles = StyleSheet.create({})
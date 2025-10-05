import { StyleSheet, Text, View } from 'react-native'
import ActiveReminderScreen from "@/screens/active-reminder/active-reminder.screen";
import Drawer from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";


const ActiveReminder = () => {
  return (
    <>
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
      />
      <ActiveReminderScreen />
      <StatusBar style="dark" />
    </>
  );
};

export default ActiveReminder;

const styles = StyleSheet.create({})
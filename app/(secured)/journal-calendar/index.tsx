import { StyleSheet } from "react-native";
import JournalCalendar from "@/screens/journal/calendar.screen";
import Drawer from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";

const JournalCalendarScreen = () => {
  return (
    <>
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
      />
      <JournalCalendar />
      <StatusBar style="dark" />
    </>
  );
};

export default JournalCalendarScreen;

const styles = StyleSheet.create({});
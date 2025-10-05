import { StyleSheet } from "react-native";
import JournalEntryScreen from "@/screens/journal-entry/journal-entry.screen";
import Drawer from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";

const JournalEntry = () => {
  return (
    <>
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
      />
      <JournalEntryScreen />
      <StatusBar style="dark" />
    </>
  );
};

export default JournalEntry;

const styles = StyleSheet.create({})
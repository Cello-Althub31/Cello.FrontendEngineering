import { StyleSheet } from "react-native";
import Journal from "@/screens/journal/journal.Screen";
import Drawer from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";

const JournalScreen = () => {
  return (
    <>
      <Drawer.Screen />
      <Journal />
      <StatusBar style="dark" />
    </>
  );
};

export default JournalScreen;

const styles = StyleSheet.create({});

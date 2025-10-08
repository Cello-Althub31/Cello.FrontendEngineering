import { StyleSheet } from "react-native";
import Journal from "@/screens/journal/journal.Screen";
import Drawer from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";

const MedicationIntakesScreen = () => {
  return (
    <>
      <Drawer.Screen />
      <MedicationIntakesScreen />
      <StatusBar style="dark" />
    </>
  );
};

export default MedicationIntakesScreen;

const styles = StyleSheet.create({});

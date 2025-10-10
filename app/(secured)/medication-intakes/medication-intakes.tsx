import { StyleSheet } from "react-native";
import MedicationIntakes from "@/screens/medication-intakes/medication-intakes.screen";
import Drawer from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";

const MedicationIntakesScreen = () => {
  return (
    <>
      <Drawer.Screen />
      <MedicationIntakes />
      <StatusBar style="dark" />
    </>
  );
};

export default MedicationIntakesScreen;

const styles = StyleSheet.create({});

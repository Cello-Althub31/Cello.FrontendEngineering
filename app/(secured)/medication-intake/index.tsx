import { StyleSheet, Text, View } from "react-native";
import Drawer from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";
import MedicationIntakesScreen from "@/screens/medication-intakes/medication-intakes";

const MedicationReminder = () => {
  return (
    <>
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
      />
      <MedicationIntakesScreen />
      <StatusBar style="dark" />
    </>
  );
};

export default MedicationReminder;

const styles = StyleSheet.create({});

import { StyleSheet } from "react-native";
import MedicationDetailsScreen from "@/screens/medication-details/medication-details.screen";
import Drawer from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";

const MedicationDetails = () => {
  return (
    <>
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
      />
      <MedicationDetailsScreen />
      <StatusBar style="dark" />
    </>
  );
};

export default MedicationDetails;

const styles = StyleSheet.create({})
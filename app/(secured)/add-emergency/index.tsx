import EmergencyContactScreen from "@/screens/emergency-contact/emergency-contact.screen";
import { StyleSheet, Text, View } from "react-native";
import Drawer from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";

const EmergencyContact = () => {
  return (
    <>
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
      />
      <EmergencyContactScreen />
      <StatusBar style="dark" />
    </>
  );
};

export default EmergencyContact;

const styles = StyleSheet.create({});
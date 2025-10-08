import { StyleSheet } from "react-native";
import Drawer from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";
import AddNewContact from "@/screens/add-emergency-contact/add-emergency-contact.screen";

const EmergencyContact = () => {
  return (
    <>
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
      />
      <AddNewContact />
      <StatusBar style="dark" />
    </>
  );
};

export default EmergencyContact;

const styles = StyleSheet.create({});
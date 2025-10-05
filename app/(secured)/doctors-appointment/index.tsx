import { StyleSheet, Text, View } from 'react-native'
import AppointmentScreen from "@/screens/doctors-appointments/doctors-appointments.screen";
import Drawer from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";


const DoctorsAppointment = () => {
  return (
    <>
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
      />
      <AppointmentScreen />
      <StatusBar style="dark" />
    </>
  );
};

export default DoctorsAppointment;

const styles = StyleSheet.create({})
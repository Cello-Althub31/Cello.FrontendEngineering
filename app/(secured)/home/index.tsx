import { StyleSheet, Text, View } from 'react-native'
import Drawer from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";
import HomeScreen from '@/screens/home/home.screen';


const ActiveReminder = () => {
  return (
    <>
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
      />
      <HomeScreen />
      <StatusBar style="dark" />
    </>
  );
};

export default ActiveReminder;

const styles = StyleSheet.create({})
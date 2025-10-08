import { StyleSheet, Text, View } from "react-native";
import Notification from "@/screens/notifications/notification.screen";
import Drawer from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";

const NotificationScreen = () => {
  return (
    <>
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
      />
      <Notification />
      <StatusBar style="dark" />
    </>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({});

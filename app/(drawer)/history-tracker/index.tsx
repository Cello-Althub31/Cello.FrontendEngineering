import Drawer from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import HistoryTrackerScreen from "@/screens/history-tracker/history-tracker.screen";

const HistoryTracker = () => {
  return (
    <>
      <Drawer.Screen />
      <HistoryTrackerScreen />
      <StatusBar style="dark" />
    </>
  );
};

export default HistoryTracker;

const styles = StyleSheet.create({});
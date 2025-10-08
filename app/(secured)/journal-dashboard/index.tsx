import Drawer from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";
import DashboardScreen from "@/screens/journal/dashboard.screen";

const JournalEntry = () => {
  return (
    <>
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
      />
      <DashboardScreen />
      <StatusBar style="dark" />
    </>
  );
};

export default JournalEntry;
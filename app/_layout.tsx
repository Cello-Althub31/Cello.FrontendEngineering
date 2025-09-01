import { Provider as ReduxProvider } from "react-redux";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "@/styles/global.css";
import "react-native-reanimated";
import { useColorScheme } from "nativewind";
import { reduxStore } from "@/lib/store/reduxStore";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { rehydrateAuth } from "@/lib/auth/authSlice";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(routes)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <ReduxProvider store={reduxStore}>
      <RootLayoutNav />
    </ReduxProvider>
  );
}

function RootLayoutNav() {
  const { colorScheme } = useColorScheme();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    dispatch(rehydrateAuth()).finally(() => setHydrated(true));
  }, [dispatch]);

  if (!hydrated) {
    return null; // or splash/loading screen
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="(drawer)" />
      ) : (
        <Stack.Screen name="(routes)" />
      )}
    </Stack>
  );
}

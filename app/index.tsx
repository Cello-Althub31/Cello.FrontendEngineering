import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Redirect } from "expo-router";
import { rehydrateAuth } from "@/lib/auth/authSlice";

export default function Index() {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(rehydrateAuth());
  }, [dispatch]);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <ActivityIndicator size="large" color="#D9534F" />
      </View>
    );
  }

  if (user) {
    return <Redirect href="/home" />;
  }

  return <Redirect href="/welcome" />;
}

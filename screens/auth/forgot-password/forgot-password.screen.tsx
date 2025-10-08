import Header from "@/components/Header";
import GradientBackground from "@/components/shared/gradient-bg";
import KeyboardAvoidingWrapper from "@/components/shared/keyboard-avoiding-wrapper";
import Button from "@/components/ui/Button";
import TextInputWithLabel from "@/components/ui/TextInputWithLabel";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, Alert, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { forgotPassword } from "@/lib/auth/authSlice";
import Toast from "react-native-toast-message";

export default function ForgotPasswordScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState("");

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      Alert.alert("Email required", "Please enter your email address.");
      return;
    }

    try {
      await dispatch(forgotPassword({ email })).unwrap();

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Password reset email sent successfully.",
      });

      router.push({
        pathname: "/auth/verify",
        params: { route: "forgot-password", email },
      });
    } catch (error: any) {
      let message = "Something went wrong.";
      if (typeof error === "string") message = error;
      else if (error?.message) message = error.message;

      Alert.alert("Error", message);
    }
  };

  return (
    <KeyboardAvoidingWrapper>
      <GradientBackground colors={["#FFFFFF", "#F3AAAA"]}>
        <View style={{ paddingTop: insets.top }} className="px-8">
          <Header title="" />
          <View className="mt-4 mb-6">
            <Text className="text-xl font-semibold font-poppins-semibold mb-10">
              Forgot password?
            </Text>
            <Text className="text-base font-poppins">
              Don't worry! It happens. Please enter the email associated with
              your account.
            </Text>
          </View>

          <TextInputWithLabel
            props={{
              label: "Email address",
              placeholder: "Enter your email address here",
              keyboardType: "email-address",
              value: email,
              onChangeText: setEmail,
              labelFontFamily: "poppins-medium",
              labelFontSize: 14,
              labelErrorColor: "#EF4444",
            }}
          />

          <Button
            onPress={handleForgotPassword}
            disabled={isLoading}
            className={`mt-4 ${isLoading ? "opacity-70" : "bg-primary"}`}
            title={isLoading ? "Sending..." : "Send code"}
            style={{ paddingVertical: 16, borderRadius: 8 }}
            loading={isLoading}
          />
        </View>
      </GradientBackground>
    </KeyboardAvoidingWrapper>
  );
}
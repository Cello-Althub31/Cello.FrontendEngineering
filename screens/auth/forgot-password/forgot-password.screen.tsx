import Header from "@/components/Header";
import GradientBackground from "@/components/shared/gradient-bg";
import KeyboardAvoidingWrapper from "@/components/shared/keyboard-avoiding-wrapper";
import Button from "@/components/ui/Button";
import TextInputWithLabel from "@/components/ui/TextInputWithLabel";
import { useRouter } from "expo-router";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ForgotPasswordScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleForgotPassword = async () => {
    router.push({
      pathname: "/(routes)/auth/verify",
      params: { route: "forgot-password" },
    });
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
              keyboardType: "ascii-capable",
              labelFontFamily: "poppins-medium",
              labelFontSize: 14,
              labelErrorColor: "#EF4444",
              onChangeText: (text) => console.log(text),
            }}
          />

          <Button
            onPress={handleForgotPassword}
            className="bg-primary mt-4"
            title="Send code"
            style={{ paddingVertical: 16, borderRadius: 8 }}
          />
        </View>
      </GradientBackground>
    </KeyboardAvoidingWrapper>
  );
}

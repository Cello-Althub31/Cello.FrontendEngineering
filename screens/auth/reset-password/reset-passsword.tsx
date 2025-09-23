import Header from "@/components/Header";
import GradientBackground from "@/components/shared/gradient-bg";
import KeyboardAvoidingWrapper from "@/components/shared/keyboard-avoiding-wrapper";
import Button from "@/components/ui/Button";

import TextInputWithLabel from "@/components/ui/TextInputWithLabel";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ResetPasswordScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [isNewPasswordShown, setIsNewPasswordShown] = useState(false);
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false);

  return (
    <KeyboardAvoidingWrapper>
      <GradientBackground colors={["#FFFFFF", "#F3AAAA"]}>
        <View style={{ paddingTop: insets.top }} className="px-8">
          <Header title="" />
          <View className="flex-1 gap-4 mt-4 mb-6">
            <Text className="text-xl font-semibold font-poppins-semibold mb-4">
              Reset password
            </Text>
            <Text className="text-base font-poppins mb-2">
              Please type something you'll remember
            </Text>
            <View className="relative">
              <TextInputWithLabel
                props={{
                  label: "New Password",
                  placeholder: "Password",
                  keyboardType: "ascii-capable",
                  secureTextEntry: !isNewPasswordShown,
                  labelFontFamily: "poppins-medium",
                  labelFontSize: 14,
                  labelErrorColor: "#EF4444",
                  onChangeText: (text) => console.log(text),
                }}
              />
              <TouchableOpacity
                style={{ position: "absolute", right: 10, top: 35 }}
                onPress={() => setIsNewPasswordShown(!isNewPasswordShown)}
              >
                <FontAwesome5
                  name={!isNewPasswordShown ? "eye-slash" : "eye"}
                  size={20}
                  color="#A1A1AA"
                />
              </TouchableOpacity>
            </View>
            <View className="relative">
              <TextInputWithLabel
                props={{
                  label: "Confirm Password",
                  placeholder: "Confirm Password",
                  keyboardType: "ascii-capable",
                  secureTextEntry: !isConfirmPasswordShown,
                  labelFontFamily: "poppins-medium",
                  labelFontSize: 14,
                  labelErrorColor: "#EF4444",
                  onChangeText: (text) => console.log(text),
                }}
              />
              <TouchableOpacity
                style={{ position: "absolute", right: 10, top: 35 }}
                onPress={() =>
                  setIsConfirmPasswordShown(!isConfirmPasswordShown)
                }
              >
                <FontAwesome5
                  name={!isConfirmPasswordShown ? "eye-slash" : "eye"}
                  size={20}
                  color="#A1A1AA"
                />
              </TouchableOpacity>
            </View>
            <Button
              title="Save"
              onPress={() =>
                router.push({
                  pathname: "/success",
                  params: {
                    route: "forgot-password",
                    title: "Password Changed",
                    info: "Your password has been changed successfully.",
                    routeName: "Back to login",
                  },
                })
              }
              className="w-full"
            />
          </View>
        </View>
      </GradientBackground>
    </KeyboardAvoidingWrapper>
  );
}

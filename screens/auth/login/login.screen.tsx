import React, { useEffect } from "react";
import Header from "@/components/Header";
import GradientBackground from "@/components/shared/gradient-bg";
import KeyboardAvoidingWrapper from "@/components/shared/keyboard-avoiding-wrapper";
import Button from "@/components/ui/Button";
import TextInputWithLabel from "@/components/ui/TextInputWithLabel";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { isValidEmail, isValidPassword } from "@/lib/utils/validators";
import { login } from "@/lib/auth/authSlice";

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.auth.isLoading);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // clear error while user starts typing
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleLogin = async () => {
    const errors: Record<string, string> = {};

    if (!isValidEmail(formData.email)) {
      errors.email = "Please enter a valid email";
    }

    const passwordError = isValidPassword(formData.password);
    if (passwordError) {
      errors.password = passwordError;
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const resultAction = await dispatch(login(formData));

      if (login.fulfilled.match(resultAction)) {
        router.push("/(routes)/home");
      } else {
        alert(resultAction.payload || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <KeyboardAvoidingWrapper>
      <GradientBackground colors={["#FFFFFF", "#F3AAAA"]}>
        <View style={{ paddingTop: insets.top }} className="px-8">
          <Header title="Login" />
          <View className="flex-row gap-4 mt-4">
            <Button
              onPress={() => console.log("Image Button")}
              image={require("@/assets/icons/apple.png")}
              imageClassName="w-6 h-6"
              className="bg-white border-slate-500 flex-1"
              variant="outline"
              style={{ borderWidth: 1, borderColor: "#D8DADC" }}
            />
            <Button
              onPress={() => console.log("Image Button")}
              image={require("@/assets/icons/google.png")}
              imageClassName="w-6 h-6"
              className="bg-white flex-1"
              variant="outline"
              style={{ borderWidth: 1, borderColor: "#D8DADC" }}
            />
          </View>
          <View className="flex-row items-center justify-center gap-4 mt-4">
            <View
              style={{
                borderBottomWidth: 2,
                borderColor: "#D8DADC",
                marginVertical: 20,
                flex: 1,
              }}
            />
            <Text className="font-poppins text-sm">or</Text>
            <View
              style={{
                borderBottomWidth: 2,
                borderColor: "#D8DADC",
                marginVertical: 20,
                flex: 1,
              }}
            />
          </View>
          <TextInputWithLabel
            props={{
              label: "Email",
              placeholder: "email address",
              keyboardType: "ascii-capable",
              labelFontFamily: "poppins-medium",
              labelFontSize: 14,
              labelErrorColor: "#EF4444",
              autoCapitalize: "none",
              value: formData.email,
              onChangeText: (text) => handleInputChange("email", text),
              labelError: formErrors.email,
            }}
          />
          <View className="relative">
            <TextInputWithLabel
              props={{
                label: "Password",
                placeholder: "Input password",
                keyboardType: "ascii-capable",
                secureTextEntry: !isPasswordShown,
                labelFontFamily: "poppins-medium",
                labelFontSize: 14,
                labelErrorColor: "#EF4444",
                value: formData.password,
                onChangeText: (text) => handleInputChange("password", text),
                labelError: formErrors.password,
              }}
            />
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 12,
                top: "50%",
                transform: [{ translateY: -10 }],
                padding: 4,
              }}
              onPress={() => setIsPasswordShown(!isPasswordShown)}
            >
              <FontAwesome5
                name={!isPasswordShown ? "eye-slash" : "eye"}
                size={18}
                color="#A1A1AA"
              />
            </TouchableOpacity>
          </View>
          <Pressable
            onPress={() => router.push("/(routes)/auth/forgot-password")}
          >
            <Text className="text-grey font-poppins text-sm text-right">
              Forget Password?
            </Text>
          </Pressable>

          <Button
            onPress={handleLogin}
            className="bg-primary mt-4"
            title={isLoading ? "Logging in..." : "Login"}
            disabled={isLoading}
            style={{ paddingVertical: 16, borderRadius: 8 }}
          />
          <Text className="text-center text-sm mt-4 font-poppins">
            Don't have an account?{" "}
            <Text
              className="text-black font-semibold"
              onPress={() => router.push("/(routes)/auth/register")}
            >
              Sign up
            </Text>
          </Text>
        </View>
      </GradientBackground>
    </KeyboardAvoidingWrapper>
  );
}

import Header from "@/components/Header";
import GradientBackground from "@/components/shared/gradient-bg";
import KeyboardAvoidingWrapper from "@/components/shared/keyboard-avoiding-wrapper";
import Button from "@/components/ui/Button";
import TextInputWithLabel from "@/components/ui/TextInputWithLabel";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { signup } from "@/lib/auth/authSlice";
import { isValidEmail, isValidPassword } from "@/lib/utils/validators";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function RegisterScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false);

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.auth.isLoading);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // clear error while user starts typing
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSignup = async () => {
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
      const resultAction = await dispatch(signup(formData));

      if (signup.fulfilled.match(resultAction)) {
        router.push({
          pathname: "/auth/verify",
          params: { route: "register", email: formData.email },
        });
      } else {
        const errorMessage =
          resultAction.payload && typeof resultAction.payload === "object" && "message" in resultAction.payload
            ? (resultAction.payload as { message?: string }).message
            : undefined;
        alert(errorMessage || "Signup failed");
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
          <Header title="Sign Up" />
          <Text className="text-lg font-medium font-popins">
            Sign up with social
          </Text>
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
            <Text className="font-poppins text-sm">or register with</Text>
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
                label: "Create a password",
                placeholder: "must be 8 characters or more",
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
              style={{ position: "absolute", right: 10, top: 35 }}
              onPress={() => setIsPasswordShown(!isPasswordShown)}
            >
              <FontAwesome5
                name={!isPasswordShown ? "eye-slash" : "eye"}
                size={20}
                color="#A1A1AA"
              />
            </TouchableOpacity>
          </View>
          <View className="relative">
            <TextInputWithLabel
              props={{
                label: "Confirm password",
                placeholder: "repeat password",
                keyboardType: "ascii-capable",
                secureTextEntry: !isConfirmPasswordShown,
                labelFontFamily: "poppins-medium",
                labelFontSize: 14,
                labelErrorColor: "#EF4444",
                value: formData.confirmPassword,
                onChangeText: (text) =>
                  handleInputChange("confirmPassword", text),
                labelError: formErrors.confirmPassword,
              }}
            />
            <TouchableOpacity
              style={{ position: "absolute", right: 10, top: 35 }}
              onPress={() => setIsConfirmPasswordShown(!isConfirmPasswordShown)}
            >
              <FontAwesome5
                name={!isConfirmPasswordShown ? "eye-slash" : "eye"}
                size={20}
                color="#A1A1AA"
              />
            </TouchableOpacity>
          </View>
          <Button
            onPress={handleSignup}
            className="bg-primary mt-4"
            title={isLoading ? "Signing in..." : "Sign Up"}
            disabled={isLoading}
            style={{ paddingVertical: 16, borderRadius: 8 }}
          />
          <Text className="text-center text-sm mt-4 font-poppins">
            Already have an account?{" "}
            <Text
              className="text-black font-semibold"
              onPress={() => router.push("/auth/login")}
            >
              Log in
            </Text>
          </Text>
        </View>
      </GradientBackground>
    </KeyboardAvoidingWrapper>
  );
}

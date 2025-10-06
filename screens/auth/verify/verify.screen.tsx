import { View, Text, TextInput, Alert, Pressable } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import Header from "@/components/Header";
import KeyboardAvoidingWrapper from "@/components/shared/keyboard-avoiding-wrapper";
import GradientBackground from "@/components/shared/gradient-bg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";

export default function VerifyScreen() {
  const { route } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const intervalRef = useRef<number | null>(null);
  const inputRef = useRef<TextInput[]>([]);
  const [OTP, setOTP] = useState<string[]>(["", "", "", "", "", ""]);
  const [countSeconds, setCountSeconds] = useState(120);

  const handleTextChange = (text: string, index: number) => {
    const updated = [...OTP];
    updated[index] = text;
    setOTP(updated);

    // Focus next
    if (text && index < 5) {
      inputRef.current[index + 1]?.focus();
    }

    // Focus previous on delete
    if (!text && index > 0) {
      inputRef.current[index - 1]?.focus();
    }

    // Check completion
    const isComplete = updated.every((digit) => digit.length === 1);
    if (isComplete) {
      const joined = updated.join("");
      onComplete(joined);
    }
  };

  const onComplete = (pin: string) => {
    const VALID_OTP = "123456";

    if (pin === VALID_OTP) {
      if (route?.toString() === "forgot-password") {
        router.push("/auth/reset-password");
      } else {
        router.push({
          pathname: "/success",
          params: {
            route: "register",
            title: "Account Created",
            info: "Your account has been created successfully",
            routeName: "Go Home",
          },
        });
      }
    } else {
      Alert.alert("Invalid OTP", "Please try again.");
      setOTP(["", "", "", ""]);
      setTimeout(() => inputRef.current[0]?.focus(), 150);
    }
  };

  // Start or restart timer
  const startTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setCountSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Start timer on mount
  useEffect(() => {
    startTimer();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const resendOtp = () => {
    if (countSeconds === 0) {
      Alert.alert("Sending OTP", "Waiting for backend API...");
      setCountSeconds(120);
      startTimer(); // <-- Restart the countdown
    }
  };

  const handleChangeEmail = () => {
    if (route?.toString() === "register") {
      router.push("/auth/register");
    } else {
      router.push("/auth/forgot-password");
    }
  };

  return (
    <KeyboardAvoidingWrapper>
      <GradientBackground colors={["#FFFFFF", "#F3AAAA"]}>
        <View style={{ paddingTop: insets.top }} className="px-8">
          <Header title="Verification" />
          <View className="flex-1 items-center justify-center gap-4 mt-4">
            <Text className="text-xl font-poppins font-semibold">
              Enter OTP Code
            </Text>
            <Text className="text-wrap text-center text-sm font-poppins">
              Enter the 6-digit OTP that was sent to{" "}
              <Text className="font-poppins-semibold font-semibold">
                example@gmail.com
              </Text>
            </Text>

            <View className="w-full flex-row justify-center mt-4 gap-6">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <TextInput
                  key={index}
                  style={{
                    width: 40,
                    height: 46,
                    backgroundColor: Colors.colors.lightGrey,
                    textAlign: "center",
                    borderRadius: 10,
                    fontSize: 18,
                  }}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={OTP[index]}
                  onChangeText={(text) => handleTextChange(text, index)}
                  ref={(ref) => {
                    inputRef.current[index] = ref as TextInput;
                  }}
                />
              ))}
            </View>

            <View className="flex-row items-center justify-center gap-4 mt-4">
              <Feather
                name="alert-circle"
                size={24}
                color={Colors.colors.red}
              />
              <Text className="text-red-500 text-base font-poppins-semibold">
                OTP expires in <Text>{countSeconds}s</Text>
              </Text>
            </View>

            <View className="flex-row items-center justify-center gap-4">
              <Pressable onPress={resendOtp}>
                <Text className="text-grey font-poppins-semibold">
                  Resend OTP
                </Text>
              </Pressable>
              <Pressable onPress={handleChangeEmail}>
                <Text className="text-red-500 font-poppins-semibold">
                  Change Email
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </GradientBackground>
    </KeyboardAvoidingWrapper>
  );
}

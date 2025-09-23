import Button from "@/components/ui/Button";
import { useRouter } from "expo-router";
import { View, Text, ImageBackground, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function GetStartedScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <ImageBackground
      source={require("@/assets/images/get-started-bg.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View className="flex-1 justify-end px-8 pb-10">
        <Text className="text-[42px] font-medium text-white mb-10">
          Your health <Text className="font-extrabold">companion</Text> for
          sickle cell care
        </Text>

        <View className="gap-4">
          <Button
            title="Sign up"
            className="w-full bg-white"
            textClassName="text-black"
            onPress={() => router.push("/auth/register")}
          />
          <Button
            title="Log in"
            variant="outline"
            className="w-full border-white"
            textClassName="text-white"
            onPress={() => router.push("/auth/login")}
          />
        </View>

        {/* Handle Safe Area for iOS */}
        <View
          style={{
            height: insets.bottom || (Platform.OS === "android" ? 20 : 0),
          }}
        />
      </View>
    </ImageBackground>
  );
}
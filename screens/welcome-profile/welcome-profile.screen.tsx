import Button from "@/components/ui/Button";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  ImageBackground,
  Platform,
  Image,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function WelcomeProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <ImageBackground
      source={require("@/assets/images/backgroundImage.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1 items-center justify-center px-8">

        <View className="bg-white rounded-full items-center justify-center w-28 h-28 mb-8">
          <Image
            source={require("@/assets/icons/ios-light.png")}
            className="w-16 h-16"
            resizeMode="contain"
          />
        </View>


        <Text className="text-white text-[28px] font-bold mb-8">Welcome</Text>


        <View className="w-full">
          <Button
            title="Continue"
            className="bg-white rounded-full py-4 px-8"
            textClassName="text-black text-lg font-semibold"
            onPress={() => router.push("/(routes)/profile")}
          />
        </View>
      </SafeAreaView>


      <View
        style={{
          height: insets.bottom || (Platform.OS === "android" ? 20 : 0),
        }}
      />
    </ImageBackground>
  );
}

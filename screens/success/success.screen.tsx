import Header from "@/components/Header";
import GradientBackground from "@/components/shared/gradient-bg";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "@/components/ui/Button";
import Colors from "@/constants/Colors";

export default function SuccessScreen() {
  const { route, routeName, info, title } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  return (
    <GradientBackground colors={["#FFFFFF", "#F3AAAA"]}>
      <View style={{ paddingTop: insets.top, marginHorizontal: 32 }}>
        <Header title="" />
      </View>
      <View
        className="flex-1 justify-center items-center gap-6"
        style={{ marginHorizontal: 32 }}
      >
        <MaterialCommunityIcons
          name="check-circle"
          size={75}
          color={Colors.colors.primary}
        />
        <Text
          style={{ marginTop: 10 }}
          className="text-xl font-semibold font-poppins-semibold"
        >
          {title}
        </Text>
        <Text className="text-base font-normal max-w-xs text-center">
          {info}
        </Text>
        <Button
          onPress={() => {
            route?.toString() === "register"
              ? router.replace("/(routes)/(tabs)/home")
              : router.push("/(routes)/auth/login");
          }}
          className="bg-primary mt-4 w-full"
          title={routeName.toString()}
          style={{ paddingVertical: 16, borderRadius: 8 }}
        />
      </View>
    </GradientBackground>
  );
}

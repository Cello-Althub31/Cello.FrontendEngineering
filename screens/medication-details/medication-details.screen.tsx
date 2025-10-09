import React, {useState} from "react";
import { View, Text, Pressable, Image, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GradientBackground from "@/components/shared/gradient-bg";
import { useRouter, useLocalSearchParams } from "expo-router";
import Button from "@/components/ui/Button";
import { Ionicons, AntDesign, Fontisto } from "@expo/vector-icons";

// Fake medication database (you could later fetch from API)
const medications = [
  {
    id: "1",
    name: "Vitamin D",
    dosage: "1 Capsule, 1000mg",
    time: "9:41 PM, Friday",
    icon: require("@/assets/icons/pill3.png"),
  },
  {
    id: "2",
    name: "B12 Drops",
    dosage: "5 Drops, 1200mg",
    time: "7:30 AM, Monday",
    icon: require("@/assets/icons/pill3.png"),
  },
];

export default function MedicationDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const { id } = useLocalSearchParams();

  // Find medication by id
  const medication = medications.find((m) => m.id === id);

  if (!medication) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text className="text-lg font-semibold text-gray-600">
          Medication not found
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <GradientBackground colors={["#FFFFFF", "#F3AAAA"]}>
      <SafeAreaView className="flex-1 bg-[#FFF3F3] px-4 pt-4 ">
        <Pressable onPress={() => router.back()} className="mb-4">
          <AntDesign name="left-circle" size={30} color="black" />
        </Pressable>

        {/* Card */}
        <View className="bg-white rounded-3xl p-6 pt-8 shadow-md">
          <View className="flex-row justify-between mb-2">
            <View className="bg-yellow-100 w-8 h-8 rounded-full items-center justify-center">
              <Ionicons name="information" size={16} color="#C53030" />
            </View>
            <Pressable
              className="w-8 h-8 rounded-full bg-red-100 items-center justify-center"
              onPress={() => setDeleteModalVisible(true)}
            >
              <Ionicons name="trash" size={18} color="red" />
            </Pressable>
          </View>

          <Text className="text-red-700 text-xl mb-4">
            Did you take your Medication?
          </Text>

          <View className="items-center my-4">
            <Image
              source={medication.icon}
              className="w-32 h-32"
              resizeMode="contain"
            />
          </View>

          <Text className="text-red-700 text-2xl font-bold text-center mb-2">
            {medication.name}
          </Text>

          <View className="flex-row pt-8 items-center mb-2">
            <Ionicons name="calendar" size={18} color="#C53030" />
            <Text className="ml-2 text-lg text-gray-700">
              {" "}
              Scheduled For {medication.time}
            </Text>
          </View>
          <View className="flex-row pt-8 items-center mb-2">
            <Fontisto name="pills" size={18} color="#C53030" />
            <Text className="text-gray-700 ml-2 text-lg">
              {medication.dosage}
            </Text>
          </View>

          <View className="flex-row justify-between mt-4">
            <Pressable className="flex-1 bg-red-700 py-3 rounded-lg mr-2 items-center">
              <Text className="text-white font-bold">Take</Text>
            </Pressable>
            <Pressable className="flex-1 bg-pink-200 py-3 rounded-lg ml-2 items-center">
              <Text className="text-[#C86969] font-bold">Edit</Text>
            </Pressable>
          </View>
        </View>
        <Modal
          transparent
          visible={deleteModalVisible}
          animationType="fade"
          onRequestClose={() => setDeleteModalVisible(false)}
        >
          <View className="flex-1 bg-black/50 items-center justify-center">
            <View className="bg-white rounded-3xl p-6 w-80 shadow-lg">
              <Text className="text-lg font-semibold text-center mb-2">
                Deleting a Medicine
              </Text>
              <Text className="text-gray-700 text-center mb-6">
                Are you sure you want to delete this medicine?
              </Text>

              <View className="flex-row justify-between gap-4">
                <Pressable
                  onPress={() => setDeleteModalVisible(false)}
                  className="flex-1 py-3 rounded-md bg-gray-200 items-center"
                >
                  <Text className="text-red-700 font-semibold">No</Text>
                </Pressable>
                <Button
                  className="flex-1 py-3 rounded-md bg-red-700 items-center"
                  title="Yes"
                  onPress={() =>
                    router.push({
                      pathname: "/medication-intakes/medication-intakes",
                      params: {
                        route: "medicine-intakes",
                        title: "Medicine Deleted",
                        info: "Your Medicine has been deleted successfully.",
                        routeName: "Back to home",
                      },
                    })
                  }
                />
                {/* <Pressable
                  onPress={() => {
                    setDeleteModalVisible(false);
                  }}
                  className="flex-1 py-3 rounded-md bg-red-700 items-center"
                >
                  <Text className="text-white font-semibold">Yes</Text>
                </Pressable> */}
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </GradientBackground>
  );
}

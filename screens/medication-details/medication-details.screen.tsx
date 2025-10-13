import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  Modal,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GradientBackground from "@/components/shared/gradient-bg";
import { useRouter, useLocalSearchParams } from "expo-router";
import Button from "@/components/ui/Button";
import { Ionicons, AntDesign, Fontisto } from "@expo/vector-icons";
import remindersApi from "@/lib/api/reminders";
import axios from "axios";

export default function MedicationDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [medication, setMedication] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMedicationDetail = async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await remindersApi.getMedicationsById(id as string);
      console.log(response.data.data)
      const data = response.data?.data;

      if (!data) throw new Error("No data received");

      setMedication(data);
      setLogs(data.logs || []);
      setSummary(data.summary || {});
    } catch (err: any) {
      console.error("Error fetching medication details:", err);
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data?.message || "Failed to fetch details");
      } else {
        setError("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchMedicationDetail();
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#C53030" />
        <Text className="text-gray-600 mt-3">Loading medication details...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white px-6">
        <Text className="text-red-500 text-center mb-4">{error}</Text>
        <Button title="Retry" onPress={fetchMedicationDetail} />
      </SafeAreaView>
    );
  }

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
      <SafeAreaView className="flex-1 bg-[#FFF3F3] px-4 pt-4">
        <Pressable onPress={() => router.back()} className="mb-4">
          <AntDesign name="left-circle" size={30} color="black" />
        </Pressable>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Card */}
          <View className="bg-white rounded-3xl p-6 pt-8 shadow-md mb-8">
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
                source={require("@/assets/icons/pill3.png")}
                className="w-32 h-32"
                resizeMode="contain"
              />
            </View>

            <Text className="text-red-700 text-2xl font-bold text-center mb-2">
              {medication.name}
            </Text>

            <View className="flex-row pt-4 items-center mb-2">
              <Ionicons name="calendar" size={18} color="#C53030" />
              <Text className="ml-2 text-lg text-gray-700">
                Scheduled Times: {medication.times?.join(", ") || "N/A"}
              </Text>
            </View>

            {summary?.today && (
              <View className="bg-[#FFF5F5] rounded-xl p-4 mt-4">
                <Text className="text-[#B94B4B] font-bold mb-2 text-center">
                  Today’s Summary
                </Text>
                <Text className="text-gray-700 text-center">
                  Scheduled: {summary.today.scheduled} | Taken:{" "}
                  {summary.today.taken} | Missed: {summary.today.missed}
                </Text>
                <Text className="text-gray-700 text-center mt-1">
                  Adherence: {(summary.today.adherence * 100).toFixed(0)}%
                </Text>
              </View>
            )}

            <View className="flex-row justify-between mt-4">
              <Pressable className="flex-1 bg-red-700 py-3 rounded-lg mr-2 items-center">
                <Text className="text-white font-bold">Take</Text>
              </Pressable>
              <Pressable className="flex-1 bg-pink-200 py-3 rounded-lg ml-2 items-center">
                <Text className="text-[#C86969] font-bold">Edit</Text>
              </Pressable>
            </View>
          </View>

          {/* Logs Section */}
          <View className="bg-white rounded-3xl p-6 shadow-md mb-8">
            <Text className="text-xl font-bold text-[#B94B4B] mb-4">
              Recent Logs
            </Text>
            {logs.length > 0 ? (
              logs.map((log, index) => (
                <View
                  key={index}
                  className="flex-row justify-between border-b border-gray-100 py-3"
                >
                  <Text className="text-gray-700 capitalize">{log.status}</Text>
                  <Text className="text-gray-500">{log.dose_time}</Text>
                </View>
              ))
            ) : (
              <Text className="text-gray-500 text-center">
                No logs available.
              </Text>
            )}
          </View>
        </ScrollView>

        {/* Delete Modal */}
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
                      pathname: "/medication-intakes",
                      params: {
                        route: "medicine-intakes",
                        title: "Medicine Deleted",
                        info: "Your Medicine has been deleted successfully.",
                        routeName: "Back to home",
                      },
                    })
                  }
                />
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </GradientBackground>
  );
}

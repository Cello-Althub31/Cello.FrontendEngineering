import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  View,
  Text,
  Pressable,
  FlatList,
  Image,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import GradientBackground from "@/components/shared/gradient-bg";
import { useRouter } from "expo-router";
import Button from "@/components/ui/Button";
import axios from "axios";
import remindersApi from "@/lib/api/reminders";

export default function HomeScreen() {
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [medications, setMedications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const DAY_MS = 24 * 60 * 60 * 1000;

  const startOfWeek = (d: Date) => {
    const date = new Date(d);
    const day = (date.getDay() + 6) % 7;
    date.setHours(0, 0, 0, 0);
    return new Date(date.getTime() - day * DAY_MS);
  };

  const formatDayLabel = (date: Date) =>
    date.toLocaleDateString(undefined, { weekday: "short" }).toUpperCase();

  const formatMonth = (date: Date) =>
    date.toLocaleDateString(undefined, { month: "long" });

  const monthName = formatMonth(selectedDate);

  const week = useMemo(() => {
    const start = startOfWeek(selectedDate);
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(start.getTime() + i * DAY_MS);
      return {
        key: d.toISOString(),
        date: d,
        dayNum: d.getDate(),
        label: formatDayLabel(d),
      };
    });
  }, [selectedDate]);

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const fetchMedications = useCallback(async () => {
    try {
      setError(null);
      const response = await remindersApi.getMedications();
      setMedications(response.data?.data || []);
    } catch (err) {
      console.error("Error fetching medications:", err);
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data?.message || "Failed to fetch medications");
      } else {
        setError("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchMedications();
  }, [fetchMedications]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchMedications();
  };

  const renderMedicationItem = ({ item }: { item: any }) => (
    <View className="bg-white rounded-xl p-4 mb-4 mx-4 shadow-sm border border-gray-100">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-lg font-semibold text-black">{item.name}</Text>
        {item.is_active ? (
          <Text className="text-green-600 text-sm font-medium">Active</Text>
        ) : (
          <Text className="text-gray-400 text-sm font-medium">Inactive</Text>
        )}
      </View>
      <Text className="text-gray-600 text-sm mb-1">
        Frequency: {item.frequency}x per day
      </Text>
      <Text className="text-gray-600 text-sm">
        Times: {item.times?.join(", ")}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <GradientBackground colors={["#FFFFFF", "#F3AAAA"]}>
        <SafeAreaView className="flex-1 justify-center items-center bg-white">
          <ActivityIndicator size="large" color="#E64646" />
          <Text className="text-gray-500 mt-3">Loading medications...</Text>
        </SafeAreaView>
      </GradientBackground>
    );
  }

  if (error) {
    return (
      <GradientBackground colors={["#FFFFFF", "#F3AAAA"]}>
        <SafeAreaView className="flex-1 justify-center items-center bg-white px-6">
          <Text className="text-red-500 text-center mb-4">{error}</Text>
          <Button title="Retry" onPress={fetchMedications} />
        </SafeAreaView>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground colors={["#FFFFFF", "#F3AAAA"]}>
      <SafeAreaView className="flex-1 bg-white pb-16">
        {/* Header */}
        <View className="px-4">
          <Text className="text-xl font-poppins font-bold text-black">
            Manage Medication
          </Text>
          <View className="flex-row justify-between py-4 items-center mt-1">
            <Text className="text-lg text-black">Today</Text>
            <Pressable className="flex-row items-center border border-gray-300 rounded-full px-3 py-1 space-x-2">
              <Text className="text-sm text-black">{monthName}</Text>
              <EvilIcons name="calendar" size={16} color="#111" />
            </Pressable>
          </View>
        </View>

        <FlatList
          horizontal
          data={week}
          keyExtractor={(i) => i.key}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, marginTop: 8 }}
          renderItem={({ item }) => {
            const active = isSameDay(item.date, selectedDate);
            return (
              <Pressable
                onPress={() => setSelectedDate(item.date)}
                className={`w-14 h-14 items-center rounded-xl border mx-1 py-2 ${active
                  ? "border-primary"
                  : "border-gray-200"
                  }`}
              >
                <Text
                  className={`text-base font-semibold ${active ? "text-primary" : "text-black"
                    }`}
                >
                  {item.dayNum}
                </Text>
                <Text
                  className={`text-[11px] mt-1 ${active ? "text-primary font-bold" : "text-gray-500"
                    }`}
                >
                  {item.label}
                </Text>
              </Pressable>
            );
          }}
        />

        {medications.length > 0 ? (
          <FlatList
            data={medications}
            keyExtractor={(item) => item._id}
            renderItem={renderMedicationItem}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={{ paddingVertical: 20 }}
          />
        ) : (
          <View className="flex-1 items-center py-32 justify-center">
            <Image
              source={require("@/assets/icons/Vector (1).png")}
              className="w-32 h-32 mb-4"
              resizeMode="contain"
            />
            <Text className="text-gray-500 font-bold text-lg text-center">
              You do not have any medication.
            </Text>
          </View>
        )}

        {/* Create Button */}
        <View className="px-6 pt-6 pb-8">
          <Button
            title="Create Medication"
            className="bg-primary rounded-full py-4 px-8"
            textClassName="text-white text-lg font-semibold"
            onPress={() =>
              router.push("/(secured)/medication-intakes/medication-intakes")
            }
          />
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
}

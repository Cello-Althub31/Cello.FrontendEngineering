import React, { useEffect, useMemo, useState } from "react";
import { View, Text, Pressable, FlatList, Image } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Button from "@/components/ui/Button";
import profileApi from "@/lib/api/profile";
import axios from "axios";

export default function HomeScreen() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const DAY_MS = 24 * 60 * 60 * 1000;

  function startOfWeek(d: Date) {
    const date = new Date(d);
    const day = (date.getDay() + 6) % 7; // Monday-first
    date.setHours(0, 0, 0, 0);
    return new Date(date.getTime() - day * DAY_MS);
  }

  function formatDayLabel(date: Date) {
    return date
      .toLocaleDateString(undefined, { weekday: "short" })
      .toUpperCase();
  }

  function formatMonth(date: Date) {
    return date.toLocaleDateString(undefined, { month: "long" });
  }
  const monthName = formatMonth(selectedDate);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await profileApi.getById("68d2cf147e02163afb512c78");
        console.log("User profile data:", response.data);
      } catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
          const apiMessage =
            error.response.data?.message || "Something went wrong";
          console.log("Error", apiMessage);
        } else {
          console.log("Error", "Unexpected error occurred");
        }
      }
    };

    getUser();
  }, []);

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

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Title + Month */}
      <View className="px-4">
        <Text className="text-xl font-poppins font-bold text-black">
          Manage Medication
        </Text>
        <View className="flex-row justify-between py-4 items-center mt-1">
          <Text className="text-lg text-black">Today</Text>
          <Pressable className="flex-row items-center border border-white rounded-full px-3 py-1 space-x-2">
            <Text className="text-sm text-black">{monthName}</Text>
            <EvilIcons name="calendar" size={16} color="#111" />
          </Pressable>
        </View>
      </View>

      {/* Date strip */}
      <FlatList
        horizontal
        data={week}
        keyExtractor={(i) => i.key}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, marginTop: 16 }}
        renderItem={({ item }) => {
          const active = isSameDay(item.date, selectedDate);
          return (
            <Pressable
              onPress={() => setSelectedDate(item.date)}
              className={`w-14 h-14 items-center rounded-xl border mx-1 py-2 ${
                active ? "border-primary" : "border-white"
              }`}
            >
              <Text
                className={`text-base font-semibold ${
                  active ? "text-primary" : "text-black"
                }`}
              >
                {item.dayNum}
              </Text>
              <Text
                className={`text-[11px] mt-1 ${
                  active ? "text-primary font-bold" : "text-grey"
                }`}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        }}
      />

      {/* Empty state */}
      <View className="flex-1 items-center py-32 justify-center">
        <Image
          source={require("@/assets/icons/Vector (1).png")}
          className="w-32 h-32 mb-4"
          resizeMode="contain"
        />
        <Text className="text-grey font-bold text-lg text-center">
          You do not have any medication.
        </Text>
      </View>

      {/* Button — navigation exactly like WelcomeProfileScreen */}
      <View className="px-6 pt-16 pb-8">
        <Button
          title="Create Medication"
          className="bg-primary rounded-full py-4 px-8"
          textClassName="text-white text-lg font-semibold"
          onPress={() => router.push("/")}
        />
      </View>
    </SafeAreaView>
  );
}

import React, { useMemo, useState } from "react";
import { View, Text, Pressable, FlatList, Image } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MedicationIntakesScreen() {
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

  const intakes = [
    {
      id: "1",
      name: "Vitamin D",
      dosage: "1 Capsule, 1000mg",
      time: "09:41",
    },
    {
      id: "2",
      name: "B12 Drops",
      dosage: "5 Drops, 1200mg",
      time: "09:41",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Title + Month */}
      <View className="px-4">
        <Text className="text-xl font-poppins text-bold text-black">
          Manage Medication
        </Text>
        <View className="flex-row justify-between py-4 items-center mt-1">
          <Text className="text-lg text-black">Today</Text>
          <Pressable className="flex-row items-center border border-white rounded-full px-3 py-1 space-x-2">
            <Text className="text-sm text-black">March</Text>
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
        contentContainerStyle={{ paddingHorizontal: 16, marginTop: 8 }}
        renderItem={({ item }) => {
          const active = isSameDay(item.date, selectedDate);
          return (
            <Pressable
              onPress={() => setSelectedDate(item.date)}
              className={`w-14 h-14 items-center rounded-xl border mx-1 py-2 ${
                active ? "border-primary bg-primary/10" : "border-white"
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

      {/* Intakes summary circle */}
      <View className="flex items-center justify-center mt-8">
        <View className="w-40 h-40 rounded-full bg-pink-100 items-center justify-center">
          <Image
            source={require("@/assets/icons/pill.png")} // replace with your pill icon
            className="w-6 h-6 mb-1"
            resizeMode="contain"
          />
          <Text className="text-red-600 text-2xl font-bold">0/2</Text>
          <Text className="text-sm text-grey">Wednesday</Text>
        </View>
        <Text className="text-xl font-bold text-red-600 mt-6">Intakes</Text>
      </View>

      {/* Intake list */}
      <View className="px-4 mt-8 space-y-3">
        {intakes.map((item) => (
          <View
            key={item.id}
            className="flex-row justify-between items-center bg-white shadow-sm rounded-xl border px-4 py-3"
          >
            <View>
              <Text className="text-black font-semibold">{item.name}</Text>
              <Text className="text-grey text-sm">{item.dosage}</Text>
            </View>
            <View className="bg-red-600 px-3 py-1 rounded-md">
              <Text className="text-white text-sm font-bold">{item.time}</Text>
            </View>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

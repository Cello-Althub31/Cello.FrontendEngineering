import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

const JournalCalendar = () => {
  const { folderId } = useLocalSearchParams<{ folderId: string }>();
  const [selectedDate, setSelectedDate] = useState("");

  const onDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleNewEntry = () => {
    if (selectedDate) {
      router.push({
        pathname: "/journal-entry",
        params: { folderId, selectedDate },
      });
    }
  };

  return (
    <LinearGradient
      colors={["#FFFDFD00", "#FFFDFD00", "#E64646"]}
      locations={[0.09, 0.45, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} className="pt-6">
          <View style={styles.inner}>
            <TouchableOpacity onPress={handleGoBack}>
              <AntDesign name="left-circle" size={30} color="black" />
            </TouchableOpacity>

            <Text style={styles.headerText}>Journal Calendar</Text>
            <Text style={styles.subHeader}>
              Select a date to create a journal entry
            </Text>

            <Calendar
              onDayPress={onDayPress}
              markedDates={
                selectedDate
                  ? {
                    [selectedDate]: {
                      selected: true,
                      selectedColor: "#00adf5",
                    },
                  }
                  : {}
              }
              style={styles.calendar}
            />

            <TouchableOpacity
              style={[
                styles.newEntryButton,
                selectedDate && styles.disabledButton,
              ]}
              onPress={handleNewEntry}
              disabled={!selectedDate}
            >
              <Text style={styles.newEntryText}>New Entry</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default JournalCalendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  scrollContent: {
    flexGrow: 1,
  },
  inner: {
    flex: 1,
    paddingHorizontal: 15,
    gap: 10,
  },
  backButton: {
    alignSelf: "flex-start",
  },

  headerText: {
    marginTop: 15,
    marginBottom: 10,
    fontSize: 26,
    fontWeight: "600",
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 400,
    color: "#555",
    marginBottom: 20,
  },
  calendar: {
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
  },
  newEntryButton: {
    marginTop: 30,
    backgroundColor: "#C86969",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: "center",
  },
  newEntryText: {
    color: "#fff",
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: "#B22222",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#C86969",
    padding: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

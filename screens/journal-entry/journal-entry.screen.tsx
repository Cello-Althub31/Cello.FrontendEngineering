import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, router } from "expo-router";

const moods = ["😁", "🙂", "😐", "😢", "😠"];
const frequencyOptions = [
  { label: "Once", value: "once" },
  { label: "Twice", value: "twice" },
  { label: "Thrice", value: "thrice" },
  { label: "Custom", value: "custom" },
];
const placeholder = { label: "Select frequency", value: null };

const JournalEntryScreen = () => {
  const { selectedDate } = useLocalSearchParams();
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [mood, setMood] = useState("");
  const [frequency, setFrequency] = useState("");

  const handleSave = async () => {
    const entry = {
      date: selectedDate,
      time: time.toLocaleTimeString(),
      title,
      note,
      mood,
      frequency,
    };

    try {
      const existing = await AsyncStorage.getItem("journalEntries");
      const entries = existing ? JSON.parse(existing) : [];
      entries.push(entry);
      await AsyncStorage.setItem("journalEntries", JSON.stringify(entries));
      // router.push("/journal-dashboard");
    } catch (error) {
      console.error("Error saving entry:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AntDesign name="left-circle" size={28} color="#333" />
        </TouchableOpacity>

        <Text style={styles.title}>Today's Journal</Text>
        <Text style={styles.subHeader}>John, how do you feel this morning?</Text>

        <View style={styles.moodRow}>
          {moods.map((m) => (
            <TouchableOpacity
              key={m}
              onPress={() => setMood(m)}
              style={[styles.moodIcon, mood === m && styles.selectedMood]}
            >
              <Text style={styles.moodText}>{m}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={[styles.input, styles.description]}
          placeholder="Write your description"
          value={note}
          onChangeText={setNote}
          multiline
        />

        <View style={styles.formContainer}>
          <View style={styles.formSection}>
            <TextInput style={styles.input} placeholder="Medication used (if any)" />
          </View>

          <View style={styles.formSection}>
            <Text style={styles.label}>Frequency</Text>
            <RNPickerSelect
              onValueChange={(value) => setFrequency(value)}
              items={frequencyOptions}
              placeholder={placeholder}
              style={{
                inputIOS: styles.dropdownText,
                inputAndroid: styles.dropdownText,
                iconContainer: { top: 10, right: 12 },
              }}
              Icon={() => <Ionicons name="chevron-down" size={20} color="#888" />}
            />
          </View>
        </View>

        <Text style={styles.label}>Time</Text>
        <TouchableOpacity style={styles.timePicker} onPress={() => setShowPicker(true)}>
          <Text style={styles.timeText}>
            {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            onChange={(event, selectedTime) => {
              setShowPicker(false);
              if (selectedTime) setTime(selectedTime);
            }}
          />
        )}

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default JournalEntryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  scrollContent: {
    padding: 24
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 10
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
    color: "#333"
  },
  subHeader: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#666"
  },
  moodRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30
  },
  moodIcon: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f2f2f2"
  },
  selectedMood: {
    backgroundColor: "#C86969"
  },
  moodText: {
    fontSize: 28,
    textAlign: "center"
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 20,
  },
  description: {
    height: 120,
    textAlignVertical: "top"
  },
  formContainer: {
    marginBottom: 20
  },
  formSection: {
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333"
  },
  dropdownText: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    color: "#333",
    backgroundColor: "#fff",
  },
  timePicker: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 10,
    marginBottom: 30,
  },
  timeText: { fontSize: 16, color: "#333" },
  saveButton: {
    backgroundColor: "#B22222",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600"
  },
});
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
  Alert,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams, router } from "expo-router";
import journalApi from "@/lib/api/journals";
import axios from "axios";
import { ActivityIndicator } from "react-native";

const moods = [
  { name: "Indifferent", emoji: "😑" },
  { name: "Happy", emoji: "😁" },
  { name: "Sad", emoji: "😢" },
  { name: "Shocked", emoji: "😳" },
  { name: "Frustrated", emoji: "😩" },
  { name: "Overwhelmed", emoji: "😰" },
  { name: "Sick", emoji: "🤢" }
];
const frequencyOptions = [
  { label: "Once", value: "once" },
  { label: "Twice", value: "twice" },
  { label: "Thrice", value: "thrice" },
  { label: "Custom", value: "custom" },
];
const placeholder = { label: "Select frequency", value: null };

const JournalEntryScreen = () => {
  const [loading, setLoading] = useState(false);
  const { folderId, selectedDate } = useLocalSearchParams<{ folderId: string, selectedDate: string }>();
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [mood, setMood] = useState("");
  const [frequency, setFrequency] = useState("");

  const handleSave = async () => {
    if (!title.trim() || !note.trim()) {
      Alert.alert("Missing Fields", "Please enter a title and a note before saving.");
      return;
    }

    const entry: IJournalEntry = {
      folderId,
      entryDate: selectedDate,
      timeOfDay: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      title: title.trim(),
      description: note.trim(),
      feeling: mood,
    };

    try {
      setLoading(true);

      const response = await journalApi.createJournal(entry);
      const data = response.data?.data;

      if (response.data?.success) {
        console.log("Journal created successfully:", data);
        Alert.alert("Success", "Journal entry created successfully!");
        router.push({
          pathname: "/journal-dashboard",
          params: { folderId: data.folderId, journalId: data._id },
        });
      } else {
        Alert.alert("Error", response.data?.message || "Failed to create journal entry");
      }
    } catch (error) {
      console.error("Error saving entry:", error);
      if (axios.isAxiosError(error)) {
        Alert.alert("Error", error.response?.data?.message || "Request failed");
      } else {
        Alert.alert("Error", "Something went wrong while saving your journal entry");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} className="pt-8">
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AntDesign name="left-circle" size={28} color="#333" />
        </TouchableOpacity>

        <Text style={styles.title}>Today's Journal</Text>
        <Text style={styles.subHeader}>
          John, how do you feel this morning?
        </Text>

        <View style={styles.moodRow}>
          {moods.map((m) => (
            <TouchableOpacity
              key={m.name}
              onPress={() => setMood(m.name)}
              style={[styles.moodIcon, mood === m.name && styles.selectedMood]}
            >
              <Text style={styles.moodText}>{m.emoji}</Text>
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
            <TextInput
              style={styles.input}
              placeholder="Medication used (if any)"
            />
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
              Icon={() => (
                <Ionicons name="chevron-down" size={20} color="#888" />
              )}
            />
          </View>
        </View>

        <Text style={styles.label}>Time</Text>
        <TouchableOpacity
          style={styles.timePicker}
          onPress={() => setShowPicker(true)}
        >
          <Text style={styles.timeText}>
            {time.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
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
          {loading ? (
            <View className='flex flex-row'>
              <ActivityIndicator color="#fff" />
              <Text className='ml-2 text-white'>Saving...</Text>
            </View>
          ) : (
            <Text style={styles.saveText}>Save</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default JournalEntryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    padding: 24,
  },
  backButton: {
    alignSelf: "flex-start",
    marginTop: 40,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },
  subHeader: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
  },
  moodRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
  },
  moodIcon: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f2f2f2",
  },
  selectedMood: {
    backgroundColor: "#C86969",
  },
  moodText: {
    fontSize: 28,
    textAlign: "center",
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
    textAlignVertical: "top",
  },
  formContainer: {
    marginBottom: 20,
  },
  formSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
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
  disabledButton: {
    backgroundColor: "#B22222",
  },
  saveText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

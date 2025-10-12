import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import RNPickerSelect from "react-native-picker-select";
import remindersApi from "@/lib/api/reminders";
import DateTimePicker from "@react-native-community/datetimepicker";

const MedicationReminderScreen = () => {
  const handleGoBack = () => router.back();

  const typeOptions = [
    { label: "A+", value: "A+" },
    { label: "A−", value: "A−" },
    { label: "B+", value: "B+" },
    { label: "B−", value: "B−" },
    { label: "AB+", value: "AB+" },
    { label: "AB−", value: "AB−" },
    { label: "O+", value: "O+" },
    { label: "O−", value: "O−" },
  ];

  const frequencyOptions = [
    { label: "Once daily", value: "Once daily" },
    { label: "Twice daily", value: "Twice daily" },
    { label: "Every 6 hours", value: "Every 6 hours" },
    { label: "Custom", value: "Custom" },
  ];

  const timeSlotOptions = [
    { label: "Morning", value: "morning" },
    { label: "Afternoon", value: "afternoon" },
    { label: "Evening", value: "evening" },
    { label: "Night", value: "night" },
  ];


  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [dose, setDose] = useState("");
  const [amount, setAmount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [frequency, setFrequency] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const startDateObj = startDate ? new Date(startDate) : new Date();
  const endDateObj = endDate ? new Date(endDate) : new Date();

  const handleAddSlot = () => {
    if (selectedSlot && !timeSlots.includes(selectedSlot)) {
      setTimeSlots([...timeSlots, selectedSlot]);
      setSelectedSlot("");
    }
  };

  const handleCreateMedication = async () => {
    if (!name || !dose || !amount || !startDate || !endDate || !frequency || !type) {
      Alert.alert("Missing Fields", "Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name,
        type,
        dose,
        amount: parseInt(amount, 10),
        start_date: new Date(startDate).toISOString(),
        end_date: new Date(endDate).toISOString(),
        frequency,
        timeSlot: timeSlots[0] || "morning",
      };

      console.log("Sending payload:", payload);
      const response = await remindersApi.createMedicationReminder(payload);
      console.log("Medication Created:", response.data);

      Alert.alert("Success", "Medication reminder created successfully!");
      router.push("/home");
    } catch (error: any) {
      console.error("Error creating medication:", error.response?.data || error);
      Alert.alert("Error", error.response?.data?.message || "Failed to create medication.");
    } finally {
      setLoading(false);
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
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.inner}>
            <TouchableOpacity onPress={handleGoBack}>
              <AntDesign name="left-circle" size={30} color="black" />
            </TouchableOpacity>

            <Text style={styles.headerText}>Medication Reminder</Text>
            <Text style={styles.subHeader}>
              Never miss a dose—get gentle nudges at the right time.
            </Text>

            <View style={styles.formContainer}>
              <View style={styles.formSection}>
                <Text style={styles.label}>Medication Name*</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. Ibuprofen"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              <View style={styles.formSection}>
                <Text style={styles.label}>Blood Type*</Text>
                <RNPickerSelect
                  onValueChange={setType}
                  items={typeOptions}
                  placeholder={{ label: "Select type", value: null }}
                  style={{
                    inputIOS: styles.dropdownText,
                    inputAndroid: styles.dropdownText,
                  }}
                  Icon={() => <Ionicons name="chevron-down" size={20} color="#888" />}
                />
              </View>

              <View style={styles.formSection}>
                <Text style={styles.label}>Dose*</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. 500mg"
                  value={dose}
                  onChangeText={setDose}
                />
              </View>

              <View style={styles.formSection}>
                <Text style={styles.label}>Dosage Amount*</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. 2"
                  keyboardType="numeric"
                  value={amount}
                  onChangeText={setAmount}
                />
              </View>

              <View style={styles.dateRow}>
                <View style={styles.dateInputContainer}>
                  <Text style={styles.label}>Start Date*</Text>
                  <TouchableOpacity
                    style={styles.datePickerButton}
                    onPress={() => setShowStartPicker(true)}
                  >
                    <Text style={styles.dateText}>
                      {startDate ? new Date(startDate).toLocaleDateString() : "Select start date"}
                    </Text>
                    <Ionicons name="calendar" size={20} color="#E64646" />
                  </TouchableOpacity>

                  {showStartPicker && (
                    <DateTimePicker
                      value={startDateObj}
                      mode="date"
                      display={Platform.OS === "ios" ? "spinner" : "default"}
                      onChange={(event, selectedDate) => {
                        setShowStartPicker(false);
                        if (selectedDate) setStartDate(selectedDate.toISOString());
                      }}
                    />
                  )}
                </View>
                <View style={styles.dateInputContainer}>
                  <Text style={styles.label}>End Date*</Text>
                  <TouchableOpacity
                    style={styles.datePickerButton}
                    onPress={() => setShowEndPicker(true)}
                  >
                    <Text style={styles.dateText}>
                      {endDate ? new Date(endDate).toLocaleDateString() : "Select end date"}
                    </Text>
                    <Ionicons name="calendar" size={20} color="#E64646" />
                  </TouchableOpacity>

                  {showEndPicker && (
                    <DateTimePicker
                      value={endDateObj}
                      mode="date"
                      display={Platform.OS === "ios" ? "spinner" : "default"}
                      onChange={(event, selectedDate) => {
                        setShowEndPicker(false);
                        if (selectedDate) setEndDate(selectedDate.toISOString());
                      }}
                    />
                  )}
                </View>
              </View>

              <View style={styles.formSection}>
                <Text style={styles.label}>Frequency*</Text>
                <RNPickerSelect
                  onValueChange={setFrequency}
                  items={frequencyOptions}
                  placeholder={{ label: "Select frequency", value: null }}
                  style={{
                    inputIOS: styles.dropdownText,
                    inputAndroid: styles.dropdownText,
                  }}
                  Icon={() => <Ionicons name="chevron-down" size={20} color="#888" />}
                />
              </View>

              <View style={styles.formSection}>
                <Text style={styles.label}>Time Slots</Text>
                <RNPickerSelect
                  onValueChange={setSelectedSlot}
                  items={timeSlotOptions}
                  placeholder={{ label: "Select time slot", value: null }}
                  style={{
                    inputIOS: styles.dropdownText,
                    inputAndroid: styles.dropdownText,
                  }}
                  Icon={() => <Ionicons name="chevron-down" size={20} color="#888" />}
                />

                <TouchableOpacity style={styles.addSlotsButton} onPress={handleAddSlot}>
                  <Ionicons name="add" size={18} color="#E64646" />
                  <Text style={styles.addSlotsText}>Add Slot</Text>
                </TouchableOpacity>

                {timeSlots.length > 0 && (
                  <View style={styles.slotList}>
                    {timeSlots.map((slot, index) => (
                      <Text key={index} style={styles.slotItem}>
                        • {slot}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.nextButton, loading && { opacity: 0.6 }]}
                onPress={handleCreateMedication}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.nextButtonText}>Done</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40 },
  scrollContent: { flexGrow: 1 },
  inner: { flex: 1, paddingHorizontal: 15, gap: 10 },
  headerText: { marginTop: 15, fontSize: 26, fontWeight: "600" },
  subHeader: { fontSize: 16, color: "#555", marginBottom: 20 },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    gap: 15,
  },
  formSection: { marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 8, color: "black" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  dateRow: { flexDirection: "row", justifyContent: "space-between", gap: 10 },
  dateInputContainer: { flex: 1 },
  dropdownText: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    color: "black",
  },
  addSlotsButton: { flexDirection: "row", alignItems: "center", marginTop: 10, gap: 6 },
  addSlotsText: { color: "#E64646", fontSize: 16, fontWeight: "500" },
  slotList: { marginTop: 10, paddingLeft: 10 },
  slotItem: { fontSize: 14, color: "#555", marginBottom: 4 },
  buttonContainer: { marginTop: 20, marginBottom: 40 },
  nextButton: {
    backgroundColor: "#B22222",
    paddingVertical: 18,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  nextButtonText: { color: "white", fontSize: 18, fontWeight: "bold" },
  datePickerButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
});

export default MedicationReminderScreen;

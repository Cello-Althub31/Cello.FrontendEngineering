import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import RNPickerSelect from "react-native-picker-select";

const MedicationReminderScreen = () => {
  const handleGoBack = () => {
    router.back();
  };
  const bloodTypeOptions = [
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
    { label: "Once daily", value: "once" },
    { label: "Twice daily", value: "twice" },
    { label: "Every 6 hours", value: "6hr" },
    { label: "Custom", value: "custom" },
  ];

  const timeSlotOptions = [
    { label: "Morning", value: "morning" },
    { label: "Afternoon", value: "afternoon" },
    { label: "Evening", value: "evening" },
    { label: "Night", value: "night" },
  ];
  const [bloodType, setBloodType] = useState("");
  const [dose, setDose] = useState("");
  const [amount, setAmount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [frequency, setFrequency] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [timeSlots, setTimeSlots] = useState<string[]>([]);

  const handleAddSlot = () => {
    if (selectedSlot && !timeSlots.includes(selectedSlot)) {
      setTimeSlots([...timeSlots, selectedSlot]);
      setSelectedSlot("");
    }
  };

  const handleNext = () => {
    router.push("/home");
  };
  const handleScreen = () => {
    router.push("/doctors-appointment");
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
                <Text style={styles.label}>Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Name (e.g. Ibuprofen)"
                />
              </View>

              <View style={styles.formSection}>
                <Text style={styles.label}>Type*</Text>
                <RNPickerSelect
                  onValueChange={setBloodType}
                  items={bloodTypeOptions}
                  placeholder={{ label: "Select blood type", color: "black", value: null }}
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

              <View style={styles.formSection}>
                <Text style={styles.label}>Dosage</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Dose (e.g. 100mg)"
                  value={dose}
                  onChangeText={setDose}
                />
              </View>

              <View style={styles.formSection}>
                <Text style={styles.label}>Amount</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Amount (e.g. 3)"
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="numeric"
                />
              </View>

              <Text style={styles.remindersTitle}>Reminders</Text>

              <View style={styles.dateRow}>
                <View style={styles.dateInputContainer}>
                  <Text style={styles.label}>Start Date</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="dd/mm/yy"
                    value={startDate}
                    onChangeText={setStartDate}
                  />
                </View>
                <View style={styles.dateInputContainer}>
                  <Text style={styles.label}>End Date</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="dd/mm/yy"
                    value={endDate}
                    onChangeText={setEndDate}
                  />
                </View>
              </View>

              <View style={styles.formSection}>
                <Text style={styles.label}>Frequency</Text>
                <RNPickerSelect
                  onValueChange={setFrequency}
                  items={frequencyOptions}
                  placeholder={{ label: "Select frequency", value: null }}
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

              <View style={styles.formSection}>
                <Text style={styles.label}>Time Slots</Text>
                <RNPickerSelect
                  onValueChange={setSelectedSlot}
                  items={timeSlotOptions}
                  placeholder={{ label: "Select time slot", value: null }}
                  style={{
                    inputIOS: styles.dropdownText,
                    inputAndroid: styles.dropdownText,
                    iconContainer: { top: 10, right: 12 },
                  }}
                  Icon={() => (
                    <Ionicons name="chevron-down" size={20} color="#888" />
                  )}
                />

                <TouchableOpacity
                  style={styles.addSlotsButton}
                  onPress={handleAddSlot}
                >
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
              <TouchableOpacity style={styles.nextButton1} onPress={handleNext}>
                <Text style={styles.nextButtonText1}>
                  {" "}
                  💡 You can always set up reminders later.
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.nextButton}
                onPress={handleScreen}
              >
                <Text style={styles.nextButtonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

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
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    gap: 15,
  },
  formSection: {
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "black",
    fontWeight: "300",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
  },
  remindersTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 20,
    color: "#E64646",
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 20,
  },
  dateInputContainer: {
    flex: 1,
  },
  dropdownText: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    color: "black",
    backgroundColor: "fff",
  },
  addSlotsButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 6,
  },
  addSlotsText: {
    color: "#E64646",
    fontSize: 16,
    fontWeight: "500",
  },
  slotList: {
    marginTop: 10,
    paddingLeft: 10,
  },
  slotItem: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },

  buttonContainer: {
    width: "100%",
    alignSelf: "center",
    marginBottom: 40,
    marginTop: 20,
    gap: 15,
  },
  nextButton1: {
    backgroundColor: "#C86969",
    paddingVertical: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  nextButton: {
    backgroundColor: "#B22222",
    paddingVertical: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  nextButtonText1: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  nextButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
export default MedicationReminderScreen;

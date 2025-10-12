import {
   View,
   Text,
   KeyboardAvoidingView,
   Platform,
   StyleSheet,
   ScrollView,
   TouchableOpacity,
   TextInput,
   Alert,
   ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import DateTimePicker, {
   DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import remindersApi from "@/lib/api/reminders";

const HydrationScreen = () => {
   const handleGoBack = () => router.back();

   const [loading, setLoading] = useState(false);

   const [targetLiters, setTargetLiters] = useState("2.5");
   const [reminderInterval, setReminderInterval] = useState("120");
   const [cupVolume, setCupVolume] = useState("250");
   const [reminderEnabled, setReminderEnabled] = useState(true);

   const [startTime, setStartTime] = useState(new Date());
   const [endTime, setEndTime] = useState(new Date(new Date().setHours(22, 0, 0)));
   const [showStartPicker, setShowStartPicker] = useState(false);
   const [showEndPicker, setShowEndPicker] = useState(false);

   const [showFrequencyModal, setShowFrequencyModal] = useState(false);
   const frequencyOptions = ["Once a day", "Twice a day", "Every 3 hours", "Custom"];
   const [selectedFrequency, setSelectedFrequency] = useState(frequencyOptions[2]);

   const handleSubmit = async () => {
      if (!targetLiters || !reminderInterval || !cupVolume) {
         Alert.alert("Missing Fields", "Please fill in all required fields.");
         return;
      }

      const payload = {
         target_liters: parseFloat(targetLiters),
         reminder_interval: parseInt(reminderInterval, 10),
         time_range: {
            start: startTime.toTimeString().slice(0, 5),
            end: endTime.toTimeString().slice(0, 5),
         },
         cup_volume_ml: parseInt(cupVolume, 10),
         reminder_enabled: reminderEnabled,
      };

      try {
         setLoading(true);
         const res = await remindersApi.hydrationReminder(payload);
         console.log("Hydration goal created:", res.data);

         Alert.alert("Success", "Hydration goal created successfully!", [
            { text: "OK", onPress: () => router.push("/active-reminder") },
         ]);
      } catch (error: any) {
         console.error("Error creating hydration goal:", error.response?.data || error);
         Alert.alert(
            "Error",
            error.response?.data?.message || "Failed to create hydration goal."
         );
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
            <ScrollView contentContainerStyle={styles.scrollContent} className="pt-6">
               <View style={styles.inner}>
                  <TouchableOpacity onPress={handleGoBack}>
                     <AntDesign name="left-circle" size={30} color="black" />
                  </TouchableOpacity>

                  <Text style={styles.headerText}>Hydration Reminders</Text>
                  <Text style={styles.subHeader}>
                     Keep your body refreshed—let Cello help you stay hydrated.
                  </Text>

                  <View style={styles.formContainer}>
                     <View style={styles.formSection}>
                        <Text style={styles.label}>Daily Target (Liters)*</Text>
                        <TextInput
                           style={styles.input}
                           keyboardType="numeric"
                           placeholder="e.g. 2.5"
                           value={targetLiters}
                           onChangeText={setTargetLiters}
                        />
                     </View>

                     <View style={styles.formSection}>
                        <Text style={styles.label}>Reminder Interval (minutes)*</Text>
                        <TextInput
                           style={styles.input}
                           keyboardType="numeric"
                           placeholder="e.g. 120"
                           value={reminderInterval}
                           onChangeText={setReminderInterval}
                        />
                     </View>

                     <View style={styles.formSection}>
                        <Text style={styles.label}>Cup Volume (ml)*</Text>
                        <TextInput
                           style={styles.input}
                           keyboardType="numeric"
                           placeholder="e.g. 250"
                           value={cupVolume}
                           onChangeText={setCupVolume}
                        />
                     </View>

                     <View style={styles.formSection}>
                        <Text style={styles.label}>Start Time*</Text>
                        <TouchableOpacity
                           style={styles.input}
                           onPress={() => setShowStartPicker(true)}
                        >
                           <Text>
                              {startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                           </Text>
                        </TouchableOpacity>

                        {showStartPicker && (
                           <DateTimePicker
                              value={startTime}
                              mode="time"
                              is24Hour={false}
                              display="default"
                              onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
                                 setShowStartPicker(false);
                                 if (selectedDate) setStartTime(selectedDate);
                              }}
                           />
                        )}
                     </View>

                     <View style={styles.formSection}>
                        <Text style={styles.label}>End Time*</Text>
                        <TouchableOpacity
                           style={styles.input}
                           onPress={() => setShowEndPicker(true)}
                        >
                           <Text>
                              {endTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                           </Text>
                        </TouchableOpacity>

                        {showEndPicker && (
                           <DateTimePicker
                              value={endTime}
                              mode="time"
                              is24Hour={false}
                              display="default"
                              onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
                                 setShowEndPicker(false);
                                 if (selectedDate) setEndTime(selectedDate);
                              }}
                           />
                        )}
                     </View>
                  </View>

                  <View style={styles.buttonContainer}>
                     <TouchableOpacity
                        style={styles.nextButton1}
                        onPress={() => router.push("/home")}
                        disabled={loading}
                     >
                        <Text style={styles.nextButtonText1}>
                           💡 You can always set up reminders later.
                        </Text>
                     </TouchableOpacity>

                     <TouchableOpacity
                        style={[styles.nextButton, loading && { opacity: 0.6 }]}
                        onPress={handleSubmit}
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

export default HydrationScreen;

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
   formSection: { marginBottom: 15 },
   label: { fontSize: 16, marginBottom: 8, color: "black" },
   input: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 10,
      padding: 12,
      fontSize: 16,
   },
   buttonContainer: { marginTop: 20, marginBottom: 40, gap: 15 },
   nextButton1: {
      backgroundColor: "#C86969",
      paddingVertical: 18,
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
      paddingVertical: 18,
      borderRadius: 10,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 8,
   },
   nextButtonText1: { color: "white", fontSize: 16, fontWeight: "500" },
   nextButtonText: { color: "white", fontSize: 18, fontWeight: "bold" },
});

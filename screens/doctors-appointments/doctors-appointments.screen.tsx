import React, { useState } from "react";
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
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import apiClient from "@/lib/utils/apiClient";
import remindersApi from "@/lib/api/reminders";

const AppointmentScreen = () => {
   const [doctorName, setDoctorName] = useState("");
   const [hospitalName, setHospitalName] = useState("");
   const [location, setLocation] = useState("");
   const [dateTime, setDateTime] = useState<Date | null>(null);
   const [notificationTimes, setNotificationTimes] = useState<Date[]>([]);
   const [showDatePicker, setShowDatePicker] = useState(false);
   const [showNotificationPicker, setShowNotificationPicker] = useState(false);
   const [loading, setLoading] = useState(false);

   const handleGoBack = () => router.back();

   const handleNext = () => router.push("/home");

   const addNotificationTime = (time: Date) => {
      setNotificationTimes((prev) => [...prev, time]);
   };

   const removeNotificationTime = (index: number) => {
      setNotificationTimes((prev) => prev.filter((_, i) => i !== index));
   };

   const handleSubmit = async () => {
      if (!doctorName || !hospitalName || !location || !dateTime) {
         Alert.alert("Missing fields", "Please fill in all required fields.");
         return;
      }

      try {
         setLoading(true);

         const payload = {
            doctor_name: doctorName,
            hospital_name: hospitalName,
            location,
            date_time: dateTime.toISOString(),
            notification_times: notificationTimes.map((t) => t.toISOString()),
         };

         const response = await remindersApi.doctorAppointmentReminder(payload);

         console.log("Doctor Appointment Created:", response.data);
         Alert.alert("Success", "Appointment created successfully!");
         router.push("/wellbeing-calendar");
      } catch (error: any) {
         console.error("Error creating appointment:", error.response?.data || error);
         Alert.alert("Error", error.response?.data?.message || "Failed to create appointment.");
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
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
         >
            <ScrollView contentContainerStyle={styles.scrollContent} className="pt-6">
               <View style={styles.inner}>
                  <TouchableOpacity onPress={handleGoBack}>
                     <AntDesign name="left-circle" size={30} color="black" />
                  </TouchableOpacity>

                  <Text style={styles.headerText}>Doctor Appointment</Text>
                  <Text style={styles.subHeader}>Get alerts before your appointments.</Text>

                  <View style={styles.formContainer}>
                     <View style={styles.formSection}>
                        <Text style={styles.label}>Doctor's Name</Text>
                        <TextInput
                           style={styles.input}
                           placeholder="Name of physician"
                           value={doctorName}
                           onChangeText={setDoctorName}
                        />
                     </View>

                     <View style={styles.formSection}>
                        <Text style={styles.label}>Hospital Name</Text>
                        <TextInput
                           style={styles.input}
                           placeholder="Hospital or Clinic"
                           value={hospitalName}
                           onChangeText={setHospitalName}
                        />
                     </View>

                     <View style={styles.formSection}>
                        <Text style={styles.label}>Location</Text>
                        <TextInput
                           style={styles.input}
                           placeholder="Address or City"
                           value={location}
                           onChangeText={setLocation}
                        />
                     </View>

                     <View style={styles.formSection}>
                        <Text style={styles.label}>Date & Time</Text>
                        <TouchableOpacity
                           style={styles.dateButton}
                           onPress={() => setShowDatePicker(true)}
                        >
                           <Text style={styles.dateButtonText}>
                              {dateTime
                                 ? dateTime.toLocaleString()
                                 : "Select Date and Time"}
                           </Text>
                        </TouchableOpacity>

                        {showDatePicker && (
                           <DateTimePicker
                              value={dateTime || new Date()}
                              mode="datetime"
                              display="default"
                              minimumDate={new Date()}
                              onChange={(event, selectedDate) => {
                                 setShowDatePicker(false);
                                 if (selectedDate) setDateTime(selectedDate);
                              }}
                           />
                        )}
                     </View>

                     <View style={styles.formSection}>
                        <Text style={styles.label}>Notification Times</Text>

                        {notificationTimes.length > 0 ? (
                           notificationTimes.map((time, index) => (
                              <View
                                 key={index}
                                 style={styles.notificationRow}
                              >
                                 <Text style={{ flex: 1 }}>{time.toLocaleString()}</Text>
                                 <TouchableOpacity
                                    onPress={() => removeNotificationTime(index)}
                                 >
                                    <AntDesign name="close-circle" size={20} color="#E64646" />
                                 </TouchableOpacity>
                              </View>
                           ))
                        ) : (
                           <Text style={styles.placeholderText}>
                              No notification times added yet.
                           </Text>
                        )}

                        <TouchableOpacity
                           style={styles.addButton}
                           onPress={() => setShowNotificationPicker(true)}
                        >
                           <Text style={styles.addButtonText}>+ Add Notification Time</Text>
                        </TouchableOpacity>

                        {showNotificationPicker && (
                           <DateTimePicker
                              value={new Date()}
                              mode="datetime"
                              display="default"
                              minimumDate={new Date()}
                              onChange={(event, selectedDate) => {
                                 setShowNotificationPicker(false);
                                 if (selectedDate) addNotificationTime(selectedDate);
                              }}
                           />
                        )}
                     </View>
                  </View>

                  <View style={styles.buttonContainer}>
                     <TouchableOpacity style={styles.nextButton1} onPress={handleNext}>
                        <Text style={styles.nextButtonText1}>
                           💡You can always set up reminders later.
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
   headerText: {
      marginTop: 15,
      marginBottom: 10,
      fontSize: 26,
      fontWeight: "600",
   },
   subHeader: {
      fontSize: 20,
      fontWeight: "400",
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
      gap: 8,
   },
   label: {
      fontSize: 16,
      fontWeight: "600",
      color: "#333",
   },
   input: {
      height: 50,
      borderRadius: 10,
      paddingHorizontal: 15,
      borderWidth: 1,
      borderColor: "#eee",
   },
   dateButton: {
      height: 50,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#eee",
      justifyContent: "center",
      paddingHorizontal: 15,
   },
   dateButtonText: {
      color: "#444",
   },
   notificationRow: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#f8f8f8",
      borderRadius: 8,
      padding: 10,
      marginBottom: 5,
   },
   placeholderText: {
      color: "#888",
      fontStyle: "italic",
   },
   addButton: {
      backgroundColor: "#E64646",
      paddingVertical: 10,
      borderRadius: 8,
      marginTop: 10,
   },
   addButtonText: {
      color: "#fff",
      textAlign: "center",
      fontWeight: "600",
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

export default AppointmentScreen;

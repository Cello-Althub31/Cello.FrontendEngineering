import React, { useEffect, useState, useCallback } from "react";
import {
   View,
   Text,
   TouchableOpacity,
   ScrollView,
   StyleSheet,
   ActivityIndicator,
   RefreshControl,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import axios from "axios";
import remindersApi from "@/lib/api/reminders";

interface Reminder {
   type: string;
   title: string;
   subtitle?: string;
   scheduledFor: string;
   metadata?: Record<string, any>;
}

const ActiveScreen = () => {
   const [reminders, setReminders] = useState<Reminder[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   const [refreshing, setRefreshing] = useState(false);

   const handleGoBack = () => {
      router.back();
   };

   const fetchReminders = async () => {
      try {
         if (!refreshing) setLoading(true);
         const res = await remindersApi.getActiveReminder();
         const data = res.data || [];

         if (Array.isArray(data)) {
            setReminders(data);
         } else {
            setReminders([]);
         }
         setError(null);
      } catch (err: any) {
         console.error("Error fetching active reminders:", err);
         if (axios.isAxiosError(err)) {
            const message =
               err.response?.data?.message || "Failed to load active reminders";
            setError(message);
         } else {
            setError("Unexpected error occurred");
         }
      } finally {
         setLoading(false);
         setRefreshing(false);
      }
   };

   useEffect(() => {
      fetchReminders();
   }, []);

   const onRefresh = useCallback(() => {
      setRefreshing(true);
      fetchReminders();
   }, []);

   const formatDate = (isoString: string) => {
      const date = new Date(isoString);
      return date.toLocaleDateString(undefined, {
         weekday: "short",
         year: "numeric",
         month: "short",
         day: "numeric",
      });
   };

   const formatTime = (isoString: string) => {
      const date = new Date(isoString);
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
   };

   return (
      <LinearGradient
         colors={["#FFFDFD00", "#FFFDFD00", "#E64646"]}
         locations={[0.09, 0.45, 1]}
         start={{ x: 0, y: 0 }}
         end={{ x: 1, y: 1 }}
         style={styles.container}
      >
         <ScrollView
            contentContainerStyle={styles.scrollContent}
            refreshControl={
               <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={["#E64646"]}
                  tintColor="#E64646"
               />
            }
         >
            <View style={styles.inner}>
               <TouchableOpacity onPress={handleGoBack}>
                  <AntDesign name="left-circle" size={30} color="black" />
               </TouchableOpacity>

               <Text style={styles.headerText}>Active Reminders</Text>
               <Text style={styles.subHeader}>
                  Get alerts before your appointments, medication, and hydration goals.
               </Text>

               {/* Loading State */}
               {loading && !refreshing && (
                  <View style={styles.centerContent}>
                     <ActivityIndicator size="large" color="#E64646" />
                     <Text style={{ color: "#555", marginTop: 10 }}>
                        Loading reminders...
                     </Text>
                  </View>
               )}

               {/* Error State */}
               {error && !loading && (
                  <View style={styles.centerContent}>
                     <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>
                     <TouchableOpacity
                        onPress={fetchReminders}
                        style={styles.retryButton}
                     >
                        <Text style={{ color: "white", fontWeight: "600" }}>Retry</Text>
                     </TouchableOpacity>
                  </View>
               )}

               {/* Empty State */}
               {!loading && !error && reminders.length === 0 && (
                  <View style={styles.centerContent}>
                     <Text style={{ color: "#888" }}>No active reminders found.</Text>
                  </View>
               )}

               {/* Reminders List */}
               {!loading &&
                  !error &&
                  reminders.map((item, index) => (
                     <View key={index} style={styles.cardContainer}>
                        <View
                           style={[
                              styles.header,
                              {
                                 backgroundColor:
                                    item.type === "medication"
                                       ? "#38A756"
                                       : item.type === "hydration"
                                          ? "#3498db"
                                          : "#E64646",
                              },
                           ]}
                        >
                           <View style={styles.headerLeft}>
                              <Feather name="flag" size={16} color="white" />
                              <Text style={styles.headerText1}>
                                 {item.type.charAt(0).toUpperCase() +
                                    item.type.slice(1)}{" "}
                                 Reminder
                              </Text>
                           </View>
                           <Feather name="more-horizontal" size={24} color="white" />
                        </View>

                        <View style={styles.content}>
                           <View style={styles.contentTop}>
                              <Feather
                                 name={
                                    item.type === "hydration"
                                       ? "droplet"
                                       : item.type === "appointment"
                                          ? "calendar"
                                          : "check-circle"
                                 }
                                 size={24}
                                 color="#333"
                              />
                              <Text style={styles.doseText}>{item.title}</Text>
                           </View>

                           {item.subtitle && (
                              <Text style={styles.subtitleText}>{item.subtitle}</Text>
                           )}

                           <View style={styles.contentBottom}>
                              <View style={styles.dateTimeContainer}>
                                 <Feather name="clock" size={16} color="#E64646" />
                                 <Text style={styles.timeText}>
                                    {formatTime(item.scheduledFor)}
                                 </Text>
                              </View>
                              <Text style={styles.dateText}>
                                 {formatDate(item.scheduledFor)}
                              </Text>
                           </View>
                        </View>
                     </View>
                  ))}
            </View>
         </ScrollView>
      </LinearGradient>
   );
};

export default ActiveScreen;

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
      fontSize: 26,
      fontWeight: "600",
   },
   subHeader: {
      fontSize: 18,
      color: "#555",
      marginBottom: 20,
   },
   centerContent: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 40,
   },
   retryButton: {
      backgroundColor: "#E64646",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
   },
   cardContainer: {
      width: "100%",
      backgroundColor: "#fff",
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 5,
      marginVertical: 10,
   },
   header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 10,
      paddingHorizontal: 15,
   },
   headerLeft: {
      flexDirection: "row",
      alignItems: "center",
   },
   headerText1: {
      color: "white",
      marginLeft: 5,
      fontWeight: "bold",
   },
   content: {
      paddingVertical: 20,
      paddingHorizontal: 15,
   },
   contentTop: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
   },
   doseText: {
      fontSize: 18,
      fontWeight: "bold",
      marginLeft: 10,
      flex: 1,
   },
   subtitleText: {
      fontSize: 14,
      color: "#777",
      marginBottom: 8,
      marginLeft: 35,
   },
   contentBottom: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: 10,
      borderTopWidth: 1,
      borderTopColor: "#f0f0f0",
   },
   dateTimeContainer: {
      flexDirection: "row",
      alignItems: "center",
   },
   timeText: {
      marginLeft: 5,
      fontSize: 16,
      fontWeight: "bold",
      color: "#E64646",
   },
   dateText: {
      fontSize: 14,
      color: "#888",
   },
});

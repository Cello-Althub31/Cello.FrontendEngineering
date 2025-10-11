import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function ProfileChangeSuccessScreen() {
  const handleBackToProfile = () => {
    router.push("./profile-info");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.successCircle}>
          <Image
            source={require("@/assets/icons/red-check.png")}
            style={{ width: 60, height: 60 }}
          />
        </View>

        <Text style={styles.title}>Profile Change Successful</Text>

        <Text style={styles.description}>
          Your profile details have been 
          </Text>
          <Text style={styles.description}>
          changed successfully.
        </Text>

        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackToProfile}
        >
          <Text style={styles.backButtonText}>Back to Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomPadding} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  successCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    marginBottom: 27,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 5,
    lineHeight: 20,
  },
  backButton: {
    backgroundColor: "#dc2626",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginTop: 30,
    width: 230,
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  bottomPadding: {
    height: 40,
  },
});
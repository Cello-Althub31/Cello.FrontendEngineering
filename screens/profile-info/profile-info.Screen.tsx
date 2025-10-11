import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

interface UserProfile {
  name: string;
  role: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  bloodType: string;
}

export default function ProfileScreen() {
  const [userProfile] = useState<UserProfile>({
    name: "Kemi Adeloko",
    role: "Doctor",
    email: "victoriaheart@gmail.com",
    phone: "+234 0805098335",
    dateOfBirth: "10th March",
    bloodType: "Sickle Cell",
  });

  const handleEditProfile = () => {
    router.push("/profile");
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Profile Image Section */}
      <View style={styles.profileImageContainer}>
        <View>
          <Image
            source={require("../../assets/images/profile.png")}
            style={styles.profileImage}
          />
          {/* Red status indicator */}
          <View style={styles.statusIndicator} />
        </View>
        <Text style={styles.userName}>{userProfile.name}</Text>
        <Text style={styles.userRole}>{userProfile.role}</Text>
      </View>

      {/* Personal Information Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>

        {/* Email */}
        <View style={styles.infoCard}>
          <View style={styles.infoCardContent}>
            <Ionicons name="mail" size={20} color="#fff" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{userProfile.email}</Text>
            </View>
          </View>
        </View>

        {/* Phone */}
        <View style={styles.infoCard}>
          <View style={styles.infoCardContent}>
            <Ionicons name="call" size={20} color="#fff" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>{userProfile.phone}</Text>
            </View>
          </View>
        </View>

        {/* Date of Birth */}
        <View style={styles.infoCard}>
          <View style={styles.infoCardContent}>
            <Ionicons name="calendar" size={20} color="#fff" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Date of Birth</Text>
              <Text style={styles.infoValue}>{userProfile.dateOfBirth}</Text>
            </View>
          </View>
        </View>

        {/* Blood Type / Genotype */}
        <View style={styles.infoCard}>
          <View style={styles.infoCardContent}>
            <MaterialCommunityIcons name="water-opacity" size={20} color="#fff" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Genotype</Text>
              <Text style={styles.infoValue}>{userProfile.bloodType}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Edit Profile Button */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={handleEditProfile}
      >
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      {/* Bottom spacing */}
      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  profileImageContainer: {
    alignItems: "center",
    paddingVertical: 24,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#e0d9f8",
    marginBottom: 12,
  },
  statusIndicator: {
    position: "absolute",
    bottom: 10,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#dc2626",
    borderWidth: 3,
    borderColor: "#fff",
  },
  userName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  userRole: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#dc2626",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  infoCard: {
    backgroundColor: "#dc2626",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  infoCardContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  infoTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "500",
    opacity: 0.9,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "600",
  },
  editButton: {
    backgroundColor: "#dc2626",
    marginHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "@/lib/store/reduxStore";
import profileApi from "@/lib/api/profile";

interface UserProfile {
  fullName: string;
  role?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  genotype?: string;
  diagnosis?: string;
  gender?: string;
  profileImage?: string;
}

export default function ProfileScreen() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const handleEditProfile = () => {
    router.push("./profile-edit");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!user?._id) {
          console.log("User ID is undefined, cannot fetch profile.");
          setLoading(false);
          return;
        }

        const response = await profileApi.getById();
        console.log("Fetched profile:", response.data);

        if (response.data?.data) {
          setUserProfile(response.data.data);
        } else {
          setUserProfile(null);
        }
      } catch (error: any) {
        console.error("Error fetching profile:", error);
        if (axios.isAxiosError(error) && error.response) {
          Alert.alert("Error", error.response.data?.message || "Failed to load profile");
        } else {
          Alert.alert("Error", "Unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user?._id]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#dc2626" />
      </View>
    );
  }

  if (!userProfile) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={{ color: "#555", fontSize: 16, textAlign: "center" }}>
          No profile found. Please set up your profile.
        </Text>
        <TouchableOpacity
          style={[styles.editButton, { marginTop: 20 }]}
          onPress={handleEditProfile}
        >
          <Text style={styles.editButtonText}>Create Profile</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
          {userProfile.profileImage ? (
            <Image source={{ uri: userProfile.profileImage }} style={styles.profileImage} />
          ) : (
            <Image
              source={require("@/assets/images/profile.png")}
              style={styles.profileImage}
            />
          )}
          <Image
            source={require("@/assets/icons/edit.png")}
            style={styles.editIcon}
          />
        </View>
        <Text style={styles.userName}>{userProfile.fullName}</Text>
        <Text style={styles.userRole}>{userProfile.role || "User"}</Text>
      </View>

      {/* Personal Information Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>

        {/* Email */}
        {userProfile.email && (
          <View style={styles.infoCard}>
            <View style={styles.infoCardContent}>
              <Ionicons name="mail" size={20} color="#fff" />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>{userProfile.email}</Text>
              </View>
            </View>
          </View>
        )}

        {/* Phone */}
        {userProfile.phone && (
          <View style={styles.infoCard}>
            <View style={styles.infoCardContent}>
              <Ionicons name="call" size={20} color="#fff" />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Phone</Text>
                <Text style={styles.infoValue}>{userProfile.phone}</Text>
              </View>
            </View>
          </View>
        )}

        {/* Date of Birth */}
        <View style={styles.infoCard}>
          <View style={styles.infoCardContent}>
            <Ionicons name="calendar" size={20} color="#fff" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Date of Birth</Text>
              <Text style={styles.infoValue}>
                {userProfile.dateOfBirth
                  ? new Date(userProfile.dateOfBirth).toDateString()
                  : "N/A"}
              </Text>
            </View>
          </View>
        </View>

        {/* Gender */}
        <View style={styles.infoCard}>
          <View style={styles.infoCardContent}>
            <Ionicons name="person" size={20} color="#fff" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Gender</Text>
              <Text style={styles.infoValue}>{userProfile.gender || "N/A"}</Text>
            </View>
          </View>
        </View>

        {/* Genotype */}
        <View style={styles.infoCard}>
          <View style={styles.infoCardContent}>
            <MaterialCommunityIcons name="water-opacity" size={20} color="#fff" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Genotype</Text>
              <Text style={styles.infoValue}>{userProfile.genotype || "N/A"}</Text>
            </View>
          </View>
        </View>

        {/* Diagnosis */}
        <View style={styles.infoCard}>
          <View style={styles.infoCardContent}>
            <MaterialCommunityIcons name="hospital-box" size={20} color="#fff" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Diagnosis</Text>
              <Text style={styles.infoValue}>{userProfile.diagnosis || "N/A"}</Text>
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

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 40,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: { fontSize: 18, fontWeight: "600", color: "#000" },
  profileImageContainer: { alignItems: "center", paddingVertical: 24 },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#e0d9f8",
    marginBottom: 12,
  },
  editIcon: { bottom: 30, left: 70 },
  userName: { fontSize: 20, fontWeight: "600", color: "#000", marginBottom: 4 },
  userRole: { fontSize: 14, color: "#666", fontWeight: "500" },
  section: { paddingHorizontal: 16, marginBottom: 24 },
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
  infoCardContent: { flexDirection: "row", alignItems: "center", flex: 1 },
  infoTextContainer: { marginLeft: 12, flex: 1 },
  infoLabel: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "500",
    opacity: 0.9,
    marginBottom: 2,
  },
  infoValue: { fontSize: 14, color: "#fff", fontWeight: "600" },
  editButton: {
    backgroundColor: "#dc2626",
    marginHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  editButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

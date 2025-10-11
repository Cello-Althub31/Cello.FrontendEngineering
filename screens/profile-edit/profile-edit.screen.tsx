import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

interface UserProfile {
  name: string;
  phone: string;
  dateOfBirth: string;
  genotype: string;
  address: string;
}

export default function EditProfileScreen() {
  const [profile, setProfile] = useState<UserProfile>({
    name: "Kemi Adeloko",
    phone: "+234 9012345678",
    dateOfBirth: "12th March",
    genotype: "Sickle Cell",
    address: "Ikeja, Lagos",
  });

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDeletePhoto = () => {
    Alert.alert("Delete Photo", "Are you sure you want to delete this photo?", [
      { text: "Cancel", onPress: () => {} },
      {
        text: "Delete",
        onPress: () => {
          // Handle photo deletion
          console.log("Photo deleted");
        },
        style: "destructive",
      },
    ]);
  };

  const handleSave = () => {
    Alert.alert("Success", "Profile updated successfully!", [
      {
        text: "OK",
        onPress: () => router.push("./profile-update"),
      },
    ]);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
      </View>

      {/* Profile Image Section */}
      <View style={styles.profileImageContainer}>
        <Image
          source={require("@/assets/images/profile.png")}
          style={styles.profileImage}
        />
        <Image
          source={require("@/assets/icons/edit.png")}
          style={styles.editIcon}
        />

        {/* Delete Photo Button */}
        <TouchableOpacity
          style={styles.deletePhotoButton}
          onPress={handleDeletePhoto}
        >
          <MaterialIcons name="delete-outline" size={16} color="#dc2626" />
          <Text style={styles.deletePhotoText}>Delete photo</Text>
        </TouchableOpacity>
      </View>

      {/* Form Section */}
      <View style={styles.formSection}>
        {/* Name Field */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#999"
            value={profile.name}
            onChangeText={(value) => handleInputChange("name", value)}
          />
        </View>

        {/* Phone Number Field */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter phone number"
            placeholderTextColor="#999"
            value={profile.phone}
            onChangeText={(value) => handleInputChange("phone", value)}
            keyboardType="phone-pad"
          />
        </View>

        {/* Date of Birth Field */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Date of Birth</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter date of birth"
            placeholderTextColor="#999"
            value={profile.dateOfBirth}
            onChangeText={(value) => handleInputChange("dateOfBirth", value)}
          />
        </View>

        {/* Genotype Field */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Genotype</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter genotype"
            placeholderTextColor="#999"
            value={profile.genotype}
            onChangeText={(value) => handleInputChange("genotype", value)}
          />
        </View>

        {/* Address Field */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={[styles.input, styles.addressInput]}
            placeholder="Enter address"
            placeholderTextColor="#999"
            value={profile.address}
            onChangeText={(value) => handleInputChange("address", value)}
            multiline
            numberOfLines={2}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
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
    alignItems: "center",
    marginTop: 40,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  cancelText: {
    fontSize: 16,
    color: "#dc2626",
    fontWeight: "500",
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
  editIcon: {
    bottom: 30,
    left: 30,
  },
  deletePhotoButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 12,
  },
  deletePhotoText: {
    fontSize: 14,
    color: "#dc2626",
    fontWeight: "500",
  },
  formSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e5e5e5",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: "#000",
    backgroundColor: "#f9f9f9",
  },
  addressInput: {
    minHeight: 80,
    textAlignVertical: "top",
    paddingTop: 12,
  },
  saveButton: {
    backgroundColor: "#dc2626",
    marginHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
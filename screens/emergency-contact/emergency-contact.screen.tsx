import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

// ---------- Props Type for ConsentSentModal ----------
type ConsentSentModalProps = {
  visible: boolean;
  onClose: () => void;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
};

const ConsentSentModal = ({
  visible,
  onClose,
  contactName,
  contactEmail,
  contactPhone,
}: ConsentSentModalProps) => {
  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={modalStyles.centeredView}>
        <LinearGradient
          colors={["#ffffff", "#ffffff", "#E64646"]}
          locations={[0.09, 0.45, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={modalStyles.modalGradient}
        >
          <View style={modalStyles.checkmarkCircle}>
            <Ionicons name="checkmark" size={60} color="white" />
          </View>
          <Text style={modalStyles.modalTitle}>Consent Request Sent</Text>
          <Text style={modalStyles.modalText}>
            We've sent a consent request to{" "}
            <Text style={modalStyles.boldText}>{contactName}</Text> at{" "}
            <Text style={modalStyles.boldText}>{contactEmail}</Text> and{" "}
            <Text style={modalStyles.boldText}>{contactPhone}</Text>
          </Text>

          <View style={modalStyles.whatsNextBox}>
            <Text style={modalStyles.whatsNextTitle}>What's Next?</Text>
            <Text style={modalStyles.whatsNextText}>
              <Text style={modalStyles.boldText}>{contactName}</Text> will
              receive a message explaining that you'd like to add them as an
              emergency contact.
            </Text>
            <Text style={modalStyles.whatsNextText}>
              Once they respond, you'll receive a notification letting you know
              their decision.
            </Text>
          </View>
        </LinearGradient>
      </View>
    </Modal>
  );
};

const AddNewContact = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [relationship, setRelationship] = useState("");
  const [isRelationshipDropdownOpen, setIsRelationshipDropdownOpen] =
    useState(false);
  const [isConsentModalVisible, setIsConsentModalVisible] = useState(false);

  const relationships = ["Father", "Mother", "Sibling", "Friend", "Other"];

  const handleNext = () => {
    if (!fullName || !phoneNumber || !emailAddress || !relationship) {
      alert("Please fill all fields.");
      return;
    }
    console.log("New Contact Data:", {
      fullName,
      phoneNumber,
      emailAddress,
      relationship,
    });
    setIsConsentModalVisible(true);

    setTimeout(() => {
      setIsConsentModalVisible(false);
      // router.back();
    }, 3000);
  };

  const handleSelectRelationship = (selectedRelationship: string) => {
    setRelationship(selectedRelationship);
    setIsRelationshipDropdownOpen(false);
  };

  const handleGoBack = () => {
    router.back();
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
        <ScrollView contentContainerStyle={styles.scrollContent} className="pt-8">
          <View style={styles.inner}>
            {/* Header */}
            <View style={styles.headerContainer}>
              <TouchableOpacity onPress={handleGoBack}>
                <AntDesign name="left-circle" size={30} color="black" />
              </TouchableOpacity>
              <Text style={styles.headerText}>Add New Contact</Text>
            </View>
            

            {/* Avatar */}
            <View style={styles.avatarContainer}>
              <View style={styles.avatarCircle}>
                <Feather name="user" size={60} color="white" />
              </View>
            </View>

            {/* Form */}
            <View style={styles.formContainer}>
              <View style={styles.inputWrapper}>
                <Feather
                  name="user"
                  size={20}
                  color="#777"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  placeholderTextColor="#999"
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>

              <View style={styles.inputWrapper}>
                <Feather
                  name="phone"
                  size={20}
                  color="#777"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Phone Number"
                  placeholderTextColor="#999"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.inputWrapper}>
                <Feather
                  name="mail"
                  size={20}
                  color="#777"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Email address"
                  placeholderTextColor="#999"
                  value={emailAddress}
                  onChangeText={setEmailAddress}
                  keyboardType="email-address"
                />
              </View>

              {/* Relationship Dropdown */}
              <TouchableOpacity
                style={styles.dropdownWrapper}
                onPress={() =>
                  setIsRelationshipDropdownOpen(!isRelationshipDropdownOpen)
                }
                activeOpacity={0.7}
              >
                <Feather
                  name="heart"
                  size={20}
                  color="#777"
                  style={styles.inputIcon}
                />
                <Text
                  style={
                    relationship
                      ? styles.dropdownText
                      : styles.dropdownPlaceholder
                  }
                >
                  {relationship || "Relationship"}
                </Text>
                <AntDesign
                  name={isRelationshipDropdownOpen ? "up" : "down"}
                  size={16}
                  color="#777"
                  style={styles.dropdownIcon}
                />
              </TouchableOpacity>

              {/* Relationship Modal */}
              <Modal
                animationType="fade"
                transparent={true}
                visible={isRelationshipDropdownOpen}
                onRequestClose={() => setIsRelationshipDropdownOpen(false)}
              >
                <Pressable
                  style={styles.modalOverlay}
                  onPress={() => setIsRelationshipDropdownOpen(false)}
                >
                  <View style={styles.modalContent}>
                    {relationships.map((rel, index) => (
                      <Pressable
                        key={index}
                        style={styles.dropdownItem}
                        onPress={() => handleSelectRelationship(rel)}
                      >
                        <Text style={styles.dropdownItemText}>{rel}</Text>
                      </Pressable>
                    ))}
                  </View>
                </Pressable>
              </Modal>
            </View>

            {/* Next Button */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.nextButtonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Consent Modal */}
      <ConsentSentModal
        visible={isConsentModalVisible}
        onClose={() => setIsConsentModalVisible(false)}
        contactName={fullName}
        contactEmail={emailAddress}
        contactPhone={phoneNumber}
      />
    </LinearGradient>
  );
};

export default AddNewContact;

// ---------- Styles ----------
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 50,
    paddingBottom: 60,
  },
  inner: {
    width: "90%",
    alignSelf: "center",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginBottom: 40,
  },
  headerText: {
    fontSize: 26,
    fontWeight: "600",
  },
  avatarContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 40,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    gap: 20,
    marginBottom: 30,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  inputIcon: {
    marginRight: 15,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  dropdownWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    position: "relative",
  },
  dropdownText: {
    flex: 1,
    fontSize: 16,
    color: "black",
  },
  dropdownPlaceholder: {
    flex: 1,
    fontSize: 16,
    color: "#999",
  },
  dropdownIcon: {
    marginLeft: "auto",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingTop: "45%",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  dropdownItem: {
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  dropdownItemText: {
    fontSize: 16,
    color: "black",
  },
  buttonContainer: {
    width: "90%",
    alignSelf: "center",
    marginBottom: 40,
    marginTop: 30,
  },
  nextButton: {
    backgroundColor: "#E64646",
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  nextButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

// ---------- Modal Styles ----------
const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalGradient: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  checkmarkCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#16A34A",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  boldText: {
    fontWeight: "bold",
  },
  whatsNextBox: {
    backgroundColor: "#FEE2E2",
    borderWidth: 1,
    borderColor: "#EF4444",
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    width: "100%",
  },
  whatsNextTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#EF4444",
    marginBottom: 10,
  },
  whatsNextText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
});

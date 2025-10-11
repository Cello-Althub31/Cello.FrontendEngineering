import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
  Modal,
  Image,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  AntDesign,
  FontAwesome6,
  Fontisto,
  Ionicons,
  Feather,
} from "@expo/vector-icons";
import { router } from "expo-router";
import { logout } from "@/lib/auth/authSlice";

interface MenuItemProps {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  alert?: boolean;
  toggle?: boolean;
  action?: () => void;
}

const SettingsScreen = () => {
  const [isFaceIdEnabled, setIsFaceIdEnabled] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const toggleFaceIdSwitch = () =>
    setIsFaceIdEnabled((previousState) => !previousState);

  const handleNavigation = () => {
    router.push("/emergency-contacts");
  };

  const handleLogoutPress = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    logout();
    router.push("/auth/login");
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  const handleHelpSupport = () => {
    router.push("/help-support");
  };

  const handleAboutApp = () => {
    router.push("/about-app");
  };

  const menuItems: MenuItemProps[] = [
    {
      id: "myAccount",
      title: "My Account",
      subtitle: "Make changes to your account",
      icon: <AntDesign name="user" size={30} color="black" />,
      alert: true,
    },
    {
      id: "emergencyContact",
      title: "Emergency Contact",
      subtitle: "Add an Emergency Contact",
      icon: <Ionicons name="person-circle-outline" size={38} color="black" />,
      action: () => handleNavigation(),
    },
    {
      id: "faceId",
      title: "Face ID / Touch ID",
      subtitle: "Manage your device security",
      icon: <Fontisto name="locked" size={24} color="black" />,
      toggle: true,
    },
    {
      id: "twoFactor",
      title: "Two-Factor Authentication",
      subtitle: "Further secure your account for safety",
      icon: <Feather name="shield" size={26} color="black" />,
    },
    {
      id: "logOut",
      title: "Log Out",
      subtitle: "Further secure your account for safety",
      icon: <AntDesign name="logout" size={26} color="black" />,
      action: () => handleLogoutPress(),
    },
  ];

  const moreItems: MenuItemProps[] = [
    {
      id: "help",
      title: "Help & Support",
      icon: <Feather name="bell" size={26} color="black" />,
      action: () => handleHelpSupport(),
    },
    {
      id: "about",
      title: "About App",
      icon: <Feather name="heart" size={26} color="black" />,
      action: () => handleAboutApp(),
    },
  ];

  const renderMenuItem = (item: MenuItemProps) => (
    <TouchableOpacity
      key={item.id}
      style={styles.menuItem}
      onPress={item.action}
      activeOpacity={0.7}
    >
      <View style={styles.menuItemContent}>
        <View style={styles.menuIconContainer}>
          <View style={styles.iconBackground}>{item.icon}</View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.menuTitle}>{item.title}</Text>
          {item.subtitle && (
            <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
          )}
        </View>
      </View>
      <View style={styles.rightContainer}>
        {item.alert && (
          <AntDesign
            name="warning"
            size={20}
            color="red"
            style={styles.alertIcon}
          />
        )}
        {item.toggle ? (
          <Switch
            trackColor={{ false: "#767577", true: "#B22222" }}
            thumbColor={isFaceIdEnabled ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleFaceIdSwitch}
            value={isFaceIdEnabled}
          />
        ) : (
          <AntDesign name="right" size={20} color="black" />
        )}
      </View>
    </TouchableOpacity>
  );

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
            <Text style={styles.header}>Settings</Text>
            <View style={styles.userProfile}>
              <View style={styles.profileWrapper}>
                <View style={styles.userImg}>
                  <FontAwesome6 name="user-large" size={40} color="#B22222" />
                </View>
                <View>
                  <Text style={styles.profileName}>John Doe</Text>
                  <Text style={styles.profileHandle}>@johndoe</Text>
                </View>
              </View>
            </View>

            <View style={styles.menuList}>{menuItems.map(renderMenuItem)}</View>

            <Text style={styles.moreHeader}>More</Text>
            <View style={styles.menuList}>
              {moreItems.map(renderMenuItem)}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Logout Confirmation Modal */}
      <Modal
        visible={showLogoutModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancelLogout}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Icon Container */}
            <View style={styles.iconContainer}>
              <Image
                source={require("@/assets/icons/logout-icon.png")}
                style={styles.logoutIcon}
              />
            </View>

            {/* Modal Title */}
            <Text style={styles.modalTitle}>Are you sure you want to log out?</Text>

            {/* Modal Subtitle */}
            <Text style={styles.modalSubtitle}>
              While logged out, you may miss critical notifications and reminders
            </Text>

            {/* Logout Button */}
            <TouchableOpacity
              style={styles.logoutConfirmButton}
              onPress={handleConfirmLogout}
              activeOpacity={0.8}
            >
              <Text style={styles.logoutConfirmButtonText}>Log out</Text>
            </TouchableOpacity>

            {/* Cancel Button */}
            <TouchableOpacity
              style={styles.cancelConfirmButton}
              onPress={handleCancelLogout}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelConfirmButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

export default SettingsScreen;

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
    paddingHorizontal: 20,
    gap: 10,
  },
  backButton: {
    alignSelf: "flex-start",
  },
  header: {
    fontSize: 25,
    fontWeight: "600",
    marginBottom: 10,
  },
  userProfile: {
    width: "100%",
    backgroundColor: "#B22222",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  profileWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  userImg: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  profileName: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  profileHandle: {
    color: "#D3D3D3",
    fontSize: 10,
  },
  menuList: {
    marginTop: 20,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  menuIconContainer: {
    width: 40,
    alignItems: "center",
  },
  iconBackground: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "lightgrey",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flexShrink: 1,
  },
  menuTitle: {
    fontSize: 12,
    fontWeight: "500",
  },
  menuSubtitle: {
    fontSize: 13,
    color: "gray",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  alertIcon: {
    marginRight: 5,
  },
  moreHeader: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: -10,
  },
  // Logout Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 16,
    paddingVertical: 40,
    paddingHorizontal: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  iconContainer: {
    marginBottom: 24,
  },
  logoutIcon: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  modalSubtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },
  logoutConfirmButton: {
    width: "100%",
    backgroundColor: "#B22222",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 12,
  },
  logoutConfirmButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelConfirmButton: {
    width: "100%",
    borderWidth: 1.5,
    borderColor: "#B22222",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },
  cancelConfirmButtonText: {
    color: "#B22222",
    fontSize: 16,
    fontWeight: "600",
  },
});
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, Feather } from "@expo/vector-icons";
import { router } from "expo-router";

const AboutAppScreen = () => {
  const handleGoBack = () => {
    router.back();
  };

  const appInfo = [
    {
      id: 1,
      label: "App Version",
      value: "1.0.0",
    },
    {
      id: 2,
      label: "Build Number",
      value: "2025.10.11",
    },
    {
      id: 3,
      label: "Last Updated",
      value: "October 11, 2025",
    },
    {
      id: 4,
      label: "Developer",
      value: "Team 31 - Althub",
    },
  ];

  const aboutItems = [
    {
      id: "privacy",
      title: "Privacy Policy",
      icon: <Feather name="shield" size={24} color="black" />,
    },
    {
      id: "terms",
      title: "Terms & Conditions",
      icon: <Feather name="file-text" size={24} color="black" />,
    },
    {
      id: "contact",
      title: "Contact Us",
      icon: <Feather name="mail" size={24} color="black" />,
    },
  ];

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
            <View style={styles.header}>
              <TouchableOpacity onPress={handleGoBack}>
                <AntDesign name="left" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>About App</Text>
              <View style={{ width: 24 }} />
            </View>


            <View style={styles.logoSection}>
              <View style={styles.logoContainer}>
                <Image
                  source={require("@/assets/icons/adaptive-icon.png")}
                  style={styles.appLogo}
                />
              </View>
              <Text style={styles.appName}>Cello</Text>
              <Text style={styles.appTagline}>Your Health Companion</Text>
            </View>

    
            <View style={styles.infoCard}>
              {appInfo.map((item) => (
                <View key={item.id} style={styles.infoItem}>
                  <Text style={styles.infoLabel}>{item.label}</Text>
                  <Text style={styles.infoValue}>{item.value}</Text>
                </View>
              ))}
            </View>
            <View style={styles.descriptionCard}>
              <Text style={styles.descriptionTitle}>About Cello</Text>
              <Text style={styles.descriptionText}>
                Cello is your comprehensive health management app designed to help you
                manage your health records, appointments, and emergency contacts all in
                one secure place. Stay organized and connected with your healthcare
                journey.
              </Text>
            </View>


            <View style={styles.linksCard}>
              {aboutItems.map((item) => (
                <TouchableOpacity key={item.id} style={styles.linkItem} activeOpacity={0.7}>
                  <View style={styles.linkContent}>
                    <View style={styles.linkIconContainer}>
                      <View style={styles.linkIconBackground}>{item.icon}</View>
                    </View>
                    <Text style={styles.linkTitle}>{item.title}</Text>
                  </View>
                  <AntDesign name="right" size={20} color="black" />
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>© 2025 Althub. All rights reserved.</Text>
              <Text style={styles.footerText}>Made by Team 31</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default AboutAppScreen;

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
    gap: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "black",
  },
  logoSection: {
    alignItems: "center",
    marginVertical: 20,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  appLogo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  appName: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },
  appTagline: {
    fontSize: 14,
    color: "#999",
  },
  infoCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#f0f0f0",
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  descriptionCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
  },
  linksCard: {
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  linkItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#f0f0f0",
  },
  linkContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  linkIconContainer: {
    width: 40,
    alignItems: "center",
  },
  linkIconBackground: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  linkTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  footer: {
    alignItems: "center",
    paddingVertical: 20,
    marginTop: 10,
  },
  footerText: {
    fontSize: 12,
    color: "#999",
    marginVertical: 4,
  },
});
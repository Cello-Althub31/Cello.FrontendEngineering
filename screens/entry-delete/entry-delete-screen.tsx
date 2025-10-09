import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

const EntryDeleteScreen = () => {
  const handleDeleteEntry = () => {
    router.push("../journal-delete");
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <AntDesign name="leftcircle" size={28} color="#333" />
      </TouchableOpacity>

      <View style={styles.container}>
        <Image
          source={require("@/assets/icons/journalHero.png")}
          style={styles.image}
        />
        <Text style={styles.message}>You sure</Text>
        <Text style={styles.message}>about this?</Text>
        <TouchableOpacity style={styles.button} onPress={handleDeleteEntry}>
          <Text style={styles.buttonText}>Delete this entry</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EntryDeleteScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    alignSelf: "flex-start",
    marginTop: 70,
    marginLeft: 20,
  },
  image: {
    width: 270,
    height: 200,
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#D9534F",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
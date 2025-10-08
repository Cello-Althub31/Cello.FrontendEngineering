import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

const JournalDeleteScreen = () => {
  
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <AntDesign name="leftcircle" size={28} color="#333" />
      </TouchableOpacity>

    <View style={styles.container}>
      <Image source={require('@/assets/icons/journalHero.png')} style={styles.image} />
      <Text style={styles.message}>You sure</Text>
      <Text style={styles.message}>about this?</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/')}>
        <Text style={styles.buttonText}>Deleted</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};

export default JournalDeleteScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  backButton: {
    alignSelf: "flex-start",
    marginTop: 70,
    marginLeft: 20,
  },

  image: {
    width: 270,
    height: 200,
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#222",
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
    color: "#333",
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#D9534F',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
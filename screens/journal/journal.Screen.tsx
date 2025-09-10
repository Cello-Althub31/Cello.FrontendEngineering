import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';

const JournalScreen = () => {
  const handleCreateFolder = () => {
    router.push('/journal-calendar'); 
  };

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/icons/folder.png')} style={styles.image} />
      <Text style={styles.message}>You do not have any folder.</Text>
      <TouchableOpacity style={styles.button} onPress={handleCreateFolder}>
        <Text style={styles.buttonText}>Create Folder</Text>
      </TouchableOpacity>
    </View>
  );
};

export default JournalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#222',
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
    color: '#333',
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
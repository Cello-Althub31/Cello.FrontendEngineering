import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import axios from 'axios';
import journalApi from '@/lib/api/journals';

type FolderType = 'journal' | 'quick_notes' | 'goal_setting';

const folderTypes: { label: string; value: FolderType }[] = [
  // { label: 'Journal', value: 'journal' },
  // { label: 'Quick Notes', value: 'quick_notes' },
  // { label: 'Goal Setting', value: 'goal_setting' },
];

const JournalScreen = () => {
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<FolderType>('journal');

  const handleCreateFolder = async () => {
    try {
      setLoading(true);

      const response = await journalApi.createFolder({ type: selectedType });

      const folder = response.data.data;
      console.log(folder)
      const folderId = folder._id;

      if (!folderId) {
        throw new Error('Folder ID not found in response.');
      }

      router.push({
        pathname: '/journal-calendar',
        params: { folderId },
      });
    } catch (error) {
      console.error('Error creating folder:', error);
      if (axios.isAxiosError(error)) {
        Alert.alert('Error', error.response?.data?.message || 'Failed to create folder');
      } else {
        Alert.alert('Error', 'Something went wrong while creating the folder');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/icons/folder.png')} style={styles.image} />
      <Text style={styles.message}>You do not have any folder.</Text>

      <View style={styles.selectorContainer}>
        {folderTypes.map((item) => (
          <TouchableOpacity
            key={item.value}
            style={[
              styles.typeButton,
              selectedType === item.value && styles.typeButtonSelected,
            ]}
            onPress={() => setSelectedType(item.value)}
          >
            <Text
              style={[
                styles.typeButtonText,
                selectedType === item.value && styles.typeButtonTextSelected,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={handleCreateFolder}
        disabled={loading}
      >
        {loading ? (
          <View className='flex flex-row'>
            <ActivityIndicator color="#fff" />
            <Text className='ml-2 text-white'>Creating...</Text>
          </View>
        ) : (
          <Text style={styles.buttonText}>Create Folder</Text>
        )}
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
  selectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  typeButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D9534F',
    marginHorizontal: 4,
  },
  typeButtonSelected: {
    backgroundColor: '#D9534F',
  },
  typeButtonText: {
    color: '#D9534F',
    fontSize: 14,
  },
  typeButtonTextSelected: {
    color: '#fff',
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
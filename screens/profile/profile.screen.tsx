import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import AntDesign from '@expo/vector-icons/AntDesign'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker'
import { router } from 'expo-router';

const StatusModal = ({
  visible,
  onClose,
  type,
  title,
  message,
  onPrimaryButtonPress,
  primaryButtonText = "OK"
}) => {
  const isSuccess = type === 'success';
  const iconName = isSuccess ? 'checkcircle' : 'warning-outline';
  const iconColor = 'white';
  const titleColor = 'black';
  const buttonColor = '#B22222';
  const buttonTextColor = 'white';

  return (
    <Modal
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <LinearGradient
        colors={['#FFFDFD00', '#FFFDFD00', '#E64646']}
        locations={[0.09, 0.45, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={modalStyles.fullScreenContainer}
      >
        <View style={modalStyles.modalView}>
          <View style={modalStyles.iconBackground}>
            <AntDesign name="checkcircle" size={80} color={iconColor} style={modalStyles.icon} />
          </View>
          <Text style={modalStyles.modalTitle}>{title}</Text>
          <Text style={modalStyles.modalText}>{message}</Text>
          {onPrimaryButtonPress && (
            <Pressable
              style={[modalStyles.button, { backgroundColor: buttonColor }]}
              onPress={onPrimaryButtonPress}
            >
              <Text style={[modalStyles.textStyle, { color: buttonTextColor }]}>{primaryButtonText}</Text>
            </Pressable>
          )}
        </View>
      </LinearGradient>
    </Modal>
  );
};

const ProfileScreen = () => {
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [genderDropdownVisible, setGenderDropdownVisible] = useState(false)
  const [gender, setGender] = useState("")
  const [genotypeDropdownVisible, setGenotypeDropdownVisible] = useState(false)
  const [genotype, setGenotype] = useState("")
  const [profileImage, setProfileImage] = useState(null)

  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [modalType, setModalType] = useState('success');
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const genders = ['Male', 'Female', 'Other']
  const genotypes = ['AA', 'AS', 'SS', 'AC']

  const handleEditProfileImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      setModalType('error');
      setModalTitle('Image Error');
      setModalMessage("Failed to pick an image.");
      setStatusModalVisible(true);
      console.error(error);
    }
  };

  const handleSubmit = () => {
    if (!fullName || !dateOfBirth || !gender || !genotype || !diagnosis || !profileImage) {
      // setModalType('error');
      // setModalTitle('Validation Error');
      // setStatusModalVisible(true);
      // setModalMessage("Please fill out all the required fields and select a profile image.");
      alert("Please fill out all the required fields and select a profile image.");
      return;
    }

    setModalType('success');
    setModalTitle('Successful');
    setModalMessage('Your Profile has been set up successfully');
    setStatusModalVisible(true);
  };

  const handleSuccessModalPress = () => {
    setStatusModalVisible(false);
    router.push("/(routes)/emergency-contact");
  }

  const handleGoBack = () => {
    router.back();
    // console.log('Go back button clicked');
  };

  return (
    <LinearGradient
      colors={['#FFFDFD00', '#FFFDFD00', '#E64646']}
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
            <TouchableOpacity onPress={handleGoBack}>
              <AntDesign name="leftcircleo" size={30} color="black" />
            </TouchableOpacity>
            <Text style={styles.header}>Update your profile</Text>
            <Text style={styles.subHeader}></Text>

            <View style={styles.avatarContainer}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
              ) : (
                <MaterialCommunityIcons name="account-circle" size={150} color="gray" style={styles.profileImage} />
              )}
              <TouchableOpacity
                style={styles.editIconContainer}
                onPress={handleEditProfileImage}
                activeOpacity={0.7}
              >
                <AntDesign name="edit" size={16} color="black" />
              </TouchableOpacity>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  placeholder="Enter your full name"
                  style={styles.input}
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Date of Birth</Text>
                <TextInput
                  placeholder="Enter your date of birth"
                  style={styles.input}
                  value={dateOfBirth}
                  onChangeText={setDateOfBirth}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Gender</Text>
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => setGenderDropdownVisible(!genderDropdownVisible)}
                  activeOpacity={0.7}
                >
                  <Text style={{ color: gender ? '#000' : '#aaa' }}>
                    {gender || '--Select--'}
                  </Text>
                  <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
                </TouchableOpacity>

                {genderDropdownVisible && (
                  <View style={styles.optionsContainer}>
                    {genders.map((option) => (
                      <TouchableOpacity
                        key={option}
                        onPress={() => {
                          setGender(option)
                          setGenderDropdownVisible(false)
                        }}
                        style={styles.option}
                        activeOpacity={0.7}
                      >
                        <Text>{option}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Genotype</Text>
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => setGenotypeDropdownVisible(!genotypeDropdownVisible)}
                  activeOpacity={0.7}
                >
                  <Text style={{ color: genotype ? '#000' : '#aaa' }}>
                    {genotype || '-- Choose Genotype --'}
                  </Text>
                  <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
                </TouchableOpacity>

                {genotypeDropdownVisible && (
                  <View style={styles.optionsContainer}>
                    {genotypes.map((option) => (
                      <TouchableOpacity
                        key={option}
                        onPress={() => {
                          setGenotype(option)
                          setGenotypeDropdownVisible(false)
                        }}
                        style={styles.option}
                        activeOpacity={0.7}
                      >
                        <Text>{option}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Diagnosis</Text>
                <TextInput
                  placeholder="Enter your diagnosis"
                  style={styles.input}
                  value={diagnosis}
                  onChangeText={setDiagnosis}
                />
              </View>
              <View style={styles.submitButtonWrapper}>
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmit}
                  activeOpacity={0.7}
                >
                  <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <StatusModal
        visible={statusModalVisible}
        onClose={() => setStatusModalVisible(false)}
        onPrimaryButtonPress={modalType === 'success' ? handleSuccessModalPress : () => setStatusModalVisible(false)}
        type={modalType}
        title={modalTitle}
        message={modalMessage}
        primaryButtonText={modalType === 'success' ? 'Go to Home' : 'OK'}
      />
    </LinearGradient>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 40,
  },
  inner: {
    width: '90%',
    paddingTop: 50,
    gap: 15,
  },
  header: {
    fontSize: 26,
    fontWeight: '600',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '400',
  },
  avatarContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    position: 'relative',
    alignSelf: 'center',
  },

  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
  },

  editIconContainer: {
    position: 'absolute',
    bottom: 20,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 8,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  formContainer: {
    width: '100%',
    gap: 20,
  },
  inputGroup: {
    width: '100%',
    position: 'relative',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  dropdown: {
    height: 45,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  arrow: {
    fontSize: 16,
    color: '#555',
  },
  optionsContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginTop: 5,
    backgroundColor: '#fff',
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  submitButtonWrapper: {
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
  },
  submitButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#B22222',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const modalStyles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    padding: 35,
    alignItems: "center",
    width: '80%',
  },
  iconBackground: {
    padding: 10,
    marginBottom: 15,
  },
  icon: {
    color: '#B22222',
    borderRadius: 50,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: "center",
    color: 'black',
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: 'black',
    fontWeight: '400',
    fontSize: 16
  },
  button: {
    backgroundColor: '#B22222',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 30,
    elevation: 2,
    width: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: "white",
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center"
  }
});

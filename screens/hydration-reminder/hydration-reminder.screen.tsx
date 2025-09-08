import { View, Text, KeyboardAvoidingView, Platform, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal, FlatList } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

const HydrationScreen = () => {
   const handleGoBack = () => {
      router.back();
   };
   const handleNext = () => {
      router.push("/active-reminder");
   };
   const handleScreen = () => {
      router.push("/hydration-reminder");
   };

   const [showTimePicker, setShowTimePicker] = React.useState(false);
   const [reminderTime, setReminderTime] = React.useState(new Date());

   const handleTimeChange = (
      event: DateTimePickerEvent,
      selectedDate?: Date | undefined
   ): void => {
      if (event.type === 'set' && selectedDate) {
         setReminderTime(selectedDate);
      }
      setShowTimePicker(false);
   };

   const frequencyOptions = [
      'Once a day',
      'Twice a day',
      'Every 3 hours',
      'Custom',
   ];

   const [showFrequencyModal, setShowFrequencyModal] = React.useState(false);
   const [selectedFrequency, setSelectedFrequency] = React.useState(frequencyOptions[0]);

   return (
      <LinearGradient
         colors={['#FFFDFD00', '#FFFDFD00', '#E64646']}
         locations={[0.09, 0.45, 1]}
         start={{ x: 0, y: 0 }}
         end={{ x: 1, y: 1 }}
         style={styles.container}
      >
         <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
         >
            <ScrollView contentContainerStyle={styles.scrollContent}>
               <View style={styles.inner}>
                  <TouchableOpacity onPress={handleGoBack}>
                     <AntDesign name="leftcircleo" size={30} color="black" />
                  </TouchableOpacity>
                  <Text style={styles.headerText}>Hydration Reminders</Text>
                  <Text style={styles.subHeader}>
                     Keep your body refreshed—let Cello help you stay hydrated.
                  </Text>
                    <View style={styles.formContainer}>
                      <View style={styles.formSection}>
                        <Text style={styles.label}>Remind me at</Text>
                        <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                           <TextInput
                              style={styles.input}
                              value={reminderTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              editable={false}
                              pointerEvents="none"
                           />
                        </TouchableOpacity>
                        {showTimePicker && (
                           <DateTimePicker
                              value={reminderTime}
                              mode="time"
                              is24Hour={false}
                              display="default"
                              onChange={handleTimeChange}
                           />
                        )}
                      </View>

                     <View style={styles.formSection}>
                        <Text style={styles.label}>Frequency</Text>
                        <TouchableOpacity
                          style={styles.dropdown}
                          onPress={() => setShowFrequencyModal(true)}
                          activeOpacity={0.7}
                        >
                          <Text style={styles.dropdownText}>{selectedFrequency}</Text>
                          <Ionicons name="chevron-down" size={20} color="#888" />
                        </TouchableOpacity>
                        <Modal
                          visible={showFrequencyModal}
                          transparent
                          animationType="slide"
                          onRequestClose={() => setShowFrequencyModal(false)}
                        >
                          <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0,0,0,0.3)'
                          }}>
                            <View style={{
                              backgroundColor: '#fff',
                              borderRadius: 10,
                              padding: 20,
                              width: '80%',
                            }}>
                              <FlatList
                                data={frequencyOptions}
                                keyExtractor={(item) => item}
                                renderItem={({ item }) => (
                                  <TouchableOpacity
                                    style={{ paddingVertical: 15 }}
                                    onPress={() => {
                                      setSelectedFrequency(item);
                                      setShowFrequencyModal(false);
                                    }}
                                  >
                                    <Text style={{ fontSize: 16 }}>{item}</Text>
                                  </TouchableOpacity>
                                )}
                              />
                              <TouchableOpacity
                                style={{ marginTop: 10, alignSelf: 'flex-end' }}
                                onPress={() => setShowFrequencyModal(false)}
                              >
                                <Text style={{ color: '#E64646', fontWeight: 'bold' }}>Cancel</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </Modal>
                     </View>
                  </View>

                  <View style={styles.buttonContainer}>
                     <TouchableOpacity style={styles.nextButton1} onPress={handleNext}>
                        <Text style={styles.nextButtonText1}> 💡 You can always set up reminders later.</Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={styles.nextButton} onPress={handleScreen}>
                        <Text style={styles.nextButtonText}>Next</Text>
                     </TouchableOpacity>
                  </View>
               </View>
            </ScrollView>
         </KeyboardAvoidingView>
      </LinearGradient>
   )
}

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
      paddingHorizontal: 15,
      gap: 10,
   },
   backButton: {
      alignSelf: 'flex-start',
   },

   headerText: {
      marginTop: 15,
      marginBottom: 10,
      fontSize: 26,
      fontWeight: '600',
   },
   subHeader: {
      fontSize: 20,
      fontWeight: 400,
      color: '#555',
      marginBottom: 20,
   },
   formContainer: {
      backgroundColor: '#fff',
      borderRadius: 10,
      paddingHorizontal: 20,
      paddingVertical: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 5,
      gap: 15,
   },
   formSection: {
      gap: 5,
   },
   label: {
      fontSize: 16,
      fontWeight: '600',
      color: '#333',
   },
   input: {
      height: 50,
      borderRadius: 10,
      paddingHorizontal: 15,
      borderWidth: 1,
      borderColor: '#eee',
   },
   dropdown: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 50,
      borderRadius: 10,
      paddingHorizontal: 15,
      borderWidth: 1,
      borderColor: '#eee',
   },
   dropdownText: {
      color: '#888',
   },
   remindersTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#E64646',
      marginTop: 10,
   },
   dateRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 10,
   },
   dateInputContainer: {
      flex: 1,
      gap: 5,
   },
   addSlotsButton: {
      flexDirection: 'row',
      alignSelf: 'flex-end',
      alignItems: 'center',
      marginTop: 10,
   },
   addSlotsText: {
      color: '#E64646',
      fontWeight: '600',
      marginLeft: 5,
   },
   buttonContainer: {
      width: '100%',
      alignSelf: 'center',
      marginBottom: 40,
      marginTop: 20,
      gap: 15,
   },
   nextButton1: {
      backgroundColor: '#C86969',
      paddingVertical: 20,
      borderRadius: 10,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 8,
   },
   nextButton: {
      backgroundColor: '#B22222',
      paddingVertical: 20,
      borderRadius: 10,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 8,
   },
   nextButtonText1: {
      color: 'white',
      fontSize: 16,
      fontWeight: '500',
   },
   nextButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
   },
})
export default HydrationScreen
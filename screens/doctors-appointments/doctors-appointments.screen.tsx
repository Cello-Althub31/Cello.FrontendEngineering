import { View, Text, KeyboardAvoidingView, Platform, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'

const AppointmentScreen = () => {
   const handleGoBack = () => {
      router.back();
   };
   const handleNext = () => {
      router.push("/hydration-reminder");
   }
   const handleScreen = () => {
      router.push("/doctors-appointment");
   }

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
                  <Text style={styles.headerText}>Doctor Appointment</Text>
                  <Text style={styles.subHeader}>
                     Get alerts before your appointments.
                  </Text>
                  <View style={styles.formContainer}>
                     <View style={styles.formSection}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput style={styles.input} placeholder="Name (e.g. Ibuprofen)" />
                     </View>

                     <View style={styles.formSection}>
                        <Text style={styles.label}>Type*</Text>
                        <View style={styles.dropdown}>
                           <Text style={styles.dropdownText}>Selected Option</Text>
                           <Ionicons name="chevron-down" size={20} color="#888" />
                        </View>
                     </View>

                     <View style={styles.formSection}>
                        <Text style={styles.label}>Doctors name</Text>
                        <TextInput style={styles.input} placeholder="Dose (e.g. 100mg)" />
                     </View>

                     <View style={styles.formSection}>
                        <Text style={styles.label}>Time</Text>
                        <TextInput style={styles.input} placeholder="8:00am" />
                     </View>
                     <View style={styles.formSection}>
                        <Text style={styles.label}>Date</Text>
                        <TextInput style={styles.input} placeholder="8:00am" />
                     </View>
                  </View>

                  <View style={styles.buttonContainer}>
                     <TouchableOpacity style={styles.nextButton1} onPress={handleNext}>
                        <Text style={styles.nextButtonText1}> 💡You can always set up reminders later.</Text>
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
export default AppointmentScreen
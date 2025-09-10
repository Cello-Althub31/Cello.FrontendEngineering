import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { AntDesign, Feather } from '@expo/vector-icons'
import { router } from 'expo-router'

const ActiveScreen = () => {
   const handleGoBack = () => {
      router.back();
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
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
         >
            <ScrollView contentContainerStyle={styles.scrollContent}>
               <View style={styles.inner}>
                  <TouchableOpacity onPress={handleGoBack}>
                     <AntDesign name="leftcircleo" size={30} color="black" />
                  </TouchableOpacity>
                  <Text style={styles.headerText}>Active Reminders</Text>
                  <Text style={styles.subHeader}>
                     Get alerts before your appointments.
                  </Text>
                  <View style={styles.remindersContainer}>
                     <View style={styles.cardContainer}>
                        <View style={styles.header}>
                           <View style={styles.headerLeft}>
                              <Feather name="flag" size={16} color="white" />
                              <Text style={styles.headerText1}>Reminder 1</Text>
                           </View>
                           <Feather name="more-horizontal" size={24} color="white" />
                        </View>

                        <View style={styles.content}>
                           <View style={styles.contentTop}>
                              <AntDesign name="checkcircleo" size={24} color="black" />
                              <Text style={styles.doseText}>Take your Dose</Text>
                              <View style={styles.actionButtons}>
                                 <TouchableOpacity style={[styles.button, styles.addButton]}>
                                    <Text style={styles.buttonText}>Add</Text>
                                 </TouchableOpacity>
                                 <TouchableOpacity style={[styles.button, styles.editButton]}>
                                    <Text style={styles.buttonText}>Edit</Text>
                                 </TouchableOpacity>
                                 <TouchableOpacity style={[styles.button, styles.deleteButton]}>
                                    <Text style={styles.buttonText}>Del</Text>
                                 </TouchableOpacity>
                              </View>
                           </View>
                           <View style={styles.contentBottom}>
                              <View style={styles.dateTimeContainer}>
                                 <Feather name="clock" size={16} color="#E64646" />
                                 <Text style={styles.timeText}>08.30 PM</Text>
                              </View>
                              <Text style={styles.dateText}>Mon, 20 Jul 2022</Text>
                           </View>
                        </View>
                     </View>
                     <View style={styles.cardContainer}>
                        <View style={styles.header}>
                           <View style={styles.headerLeft}>
                              <Feather name="flag" size={16} color="white" />
                              <Text style={styles.headerText1}>Reminder 2</Text>
                           </View>
                           <Feather name="more-horizontal" size={24} color="white" />
                        </View>

                        <View style={styles.content}>
                           <View style={styles.contentTop}>
                              <AntDesign name="checkcircleo" size={24} color="black" />
                              <Text style={styles.doseText}>Take your Dose</Text>
                              <View style={styles.actionButtons}>
                                 <TouchableOpacity style={[styles.button, styles.addButton]}>
                                    <Text style={styles.buttonText}>Add</Text>
                                 </TouchableOpacity>
                                 <TouchableOpacity style={[styles.button, styles.editButton]}>
                                    <Text style={styles.buttonText}>Edit</Text>
                                 </TouchableOpacity>
                                 <TouchableOpacity style={[styles.button, styles.deleteButton]}>
                                    <Text style={styles.buttonText}>Del</Text>
                                 </TouchableOpacity>
                              </View>
                           </View>
                           <View style={styles.contentBottom}>
                              <View style={styles.dateTimeContainer}>
                                 <Feather name="clock" size={16} color="#E64646" />
                                 <Text style={styles.timeText}>08.30 PM</Text>
                              </View>
                              <Text style={styles.dateText}>Mon, 20 Jul 2022</Text>
                           </View>
                        </View>
                     </View>
                     <View style={styles.cardContainer}>
                        <View style={styles.header}>
                           <View style={styles.headerLeft}>
                              <Feather name="flag" size={16} color="white" />
                              <Text style={styles.headerText1}>Reminder 3</Text>
                           </View>
                           <Feather name="more-horizontal" size={24} color="white" />
                        </View>

                        <View style={styles.content}>
                           <View style={styles.contentTop}>
                              <AntDesign name="checkcircleo" size={24} color="black" />
                              <Text style={styles.doseText}>Take your Dose</Text>
                              <View style={styles.actionButtons}>
                                 <TouchableOpacity style={[styles.button, styles.addButton]}>
                                    <Text style={styles.buttonText}>Add</Text>
                                 </TouchableOpacity>
                                 <TouchableOpacity style={[styles.button, styles.editButton]}>
                                    <Text style={styles.buttonText}>Edit</Text>
                                 </TouchableOpacity>
                                 <TouchableOpacity style={[styles.button, styles.deleteButton]}>
                                    <Text style={styles.buttonText}>Del</Text>
                                 </TouchableOpacity>
                              </View>
                           </View>
                           <View style={styles.contentBottom}>
                              <View style={styles.dateTimeContainer}>
                                 <Feather name="clock" size={16} color="#E64646" />
                                 <Text style={styles.timeText}>08.30 PM</Text>
                              </View>
                              <Text style={styles.dateText}>Mon, 20 Jul 2022</Text>
                           </View>
                        </View>
                     </View>
                     <View style={styles.cardContainer}>
                        <View style={styles.header}>
                           <View style={styles.headerLeft}>
                              <Feather name="flag" size={16} color="white" />
                              <Text style={styles.headerText1}>Reminder 4</Text>
                           </View>
                           <Feather name="more-horizontal" size={24} color="white" />
                        </View>

                        <View style={styles.content}>
                           <View style={styles.contentTop}>
                              <AntDesign name="checkcircleo" size={24} color="black" />
                              <Text style={styles.doseText}>Take your Dose</Text>
                              <View style={styles.actionButtons}>
                                 <TouchableOpacity style={[styles.button, styles.addButton]}>
                                    <Text style={styles.buttonText}>Add</Text>
                                 </TouchableOpacity>
                                 <TouchableOpacity style={[styles.button, styles.editButton]}>
                                    <Text style={styles.buttonText}>Edit</Text>
                                 </TouchableOpacity>
                                 <TouchableOpacity style={[styles.button, styles.deleteButton]}>
                                    <Text style={styles.buttonText}>Del</Text>
                                 </TouchableOpacity>
                              </View>
                           </View>
                           <View style={styles.contentBottom}>
                              <View style={styles.dateTimeContainer}>
                                 <Feather name="clock" size={16} color="#E64646" />
                                 <Text style={styles.timeText}>08.30 PM</Text>
                              </View>
                              <Text style={styles.dateText}>Mon, 20 Jul 2022</Text>
                           </View>
                        </View>
                     </View>
                  </View>
               </View>
            </ScrollView>
         </KeyboardAvoidingView>
      </LinearGradient>
   )
}

export default ActiveScreen

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
      // marginBottom: 10,
      fontSize: 26,
      fontWeight: '600',
   },
   subHeader: {
      fontSize: 20,
      fontWeight: 400,
      color: '#555',
      marginBottom: 20,
   },
   remindersContainer: {
      flex: 1,
      alignItems: 'center',
      gap: 10,
   },
   cardContainer: {
      width: '100%',
      backgroundColor: '#fff',
      borderRadius: 10,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 5,
      marginVertical: 10,
   },
   header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#38A756',
      paddingVertical: 10,
      paddingHorizontal: 15,
   },
   headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   headerText1: {
      color: 'white',
      marginLeft: 5,
      fontWeight: 'bold',
   },
   content: {
      paddingBlock: 20,
      paddingInline: 15,
   },
   contentTop: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
   },
   doseText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginLeft: 10,
      flex: 1,
   },
   actionButtons: {
      flexDirection: 'row',
   },
   button: {
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 5,
      marginLeft: 5,
   },
   addButton: {
      backgroundColor: '#38A756',
   },
   editButton: {
      backgroundColor: '#337AFF',
   },
   deleteButton: {
      backgroundColor: '#E64646',
   },
   buttonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 12,
   },
   contentBottom: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 10,
      borderTopWidth: 1,
      borderTopColor: '#f0f0f0',
   },
   dateTimeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   timeText: {
      marginLeft: 5,
      fontSize: 16,
      fontWeight: 'bold',
      color: '#E64646',
   },
   dateText: {
      fontSize: 14,
      color: '#888',
   },
});
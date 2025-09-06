import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Modal,
    Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';

const getInitials = (name) => {
    if (!name) return '';
    const parts = name.split(' ');
    if (parts.length === 1) {
        return parts[0].charAt(0).toUpperCase();
    }
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

const EmergencyContactScreen = () => {
    const initialContacts = [
        {
            name: 'Arnold Nigel',
            relationship: 'Father',
            tag: 'Primary contact',
            tagColor: '#EBF4FF',
            tagTextColor: '#1D4ED8',
            initialsBg: '#2563EB',
        },
        {
            name: 'Jessica James',
            relationship: 'Mother',
            tag: 'Secondary contact',
            tagColor: '#FEF3C7',
            tagTextColor: '#92400E',
            initialsBg: '#F59E0B',
        },
    ];

    const [contacts, setContacts] = useState(initialContacts);
    const [searchTerm, setSearchTerm] = useState('');
    const [addContactModalVisible, setAddContactModalVisible] = useState(false);

    const handleSearch = (text) => {
        setSearchTerm(text);
        const term = text.toLowerCase();
        if (term === '') {
            setContacts(initialContacts);
        } else {
            const filtered = initialContacts.filter(contact =>
                contact.name.toLowerCase().includes(term) ||
                contact.relationship.toLowerCase().includes(term)
            );
            setContacts(filtered);
        }
    };

    const handleAddContact = () => {
        router.push("/(routes)/add-emergency");
    };

    const handleGoBack = () => {
        router.back();
        alert('Go back button clicked');
    };

    return (
        <LinearGradient
            colors={['#FFFDFD00', '#FFFDFD00', '#E64646']}
            locations={[0.09, 0.45, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.inner}>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity onPress={handleGoBack}>
                            <AntDesign name="leftcircleo" size={30} color="black" />
                        </TouchableOpacity>
                        <Text style={styles.headerText}>Emergency Contacts</Text>
                    </View>

                    <Text style={styles.subHeader}>
                        These are the people we'll notify if you ever need urgent help. You can add up to 3 trusted contacts.
                    </Text>

                    <View style={styles.searchBar}>
                        <Feather name="search" size={20} color="#777" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search"
                            placeholderTextColor="#999"
                            value={searchTerm}
                            onChangeText={handleSearch}
                        />
                    </View>

                    <View style={styles.contactList}>
                        {contacts.map((contact, index) => (
                            <View key={index} style={styles.contactCard}>
                                <View style={[styles.initialsCircle, { backgroundColor: contact.initialsBg }]}>
                                    <Text style={styles.initialsText}>{getInitials(contact.name)}</Text>
                                </View>
                                <View style={styles.contactInfo}>
                                    <Text style={styles.contactName}>{contact.name}</Text>
                                    <Text style={styles.contactRelationship}>{contact.relationship}</Text>
                                    <View style={[styles.contactTag, { backgroundColor: contact.tagColor }]}>
                                        <Text style={[styles.contactTagText, { color: contact.tagTextColor }]}>{contact.tag}</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>

            <TouchableOpacity
                style={styles.fab}
                onPress={handleAddContact}
                activeOpacity={0.7}
            >
                <AntDesign name="plus" size={30} color="white" />
            </TouchableOpacity>

            <Modal
                animationType="fade"
                transparent={true}
                visible={addContactModalVisible}
                onRequestClose={() => setAddContactModalVisible(false)}
            >
                <View style={styles.modalCenteredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Add New Contact</Text>
                        <Text style={styles.modalText}>
                            This is a placeholder for the "Add Contact" functionality.
                        </Text>
                        <Pressable
                            style={styles.modalButton}
                            onPress={() => setAddContactModalVisible(false)}
                        >
                            <Text style={styles.modalButtonText}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </LinearGradient>
    );
};

export default EmergencyContactScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingTop: 50,
    },
    inner: {
        width: '90%',
        alignSelf: 'center',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        marginBottom: 20,
    },
    headerText: {
        fontSize: 26,
        fontWeight: '600',
    },
    subHeader: {
        fontSize: 18,
        fontWeight: 400,
        color: '#555',
        marginBottom: 30,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
    },
    contactList: {
        gap: 15,
    },
    contactCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    initialsCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    initialsText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    contactInfo: {
        flex: 1,
        gap: 5
    },
    contactName: {
        fontSize: 18,
        fontWeight: '600',
    },
    contactRelationship: {
        fontSize: 14,
        color: '#888',
    },
    contactTag: {
        width: 120,
        height: 20,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
    },
    contactTagText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    fab: {
        position: 'absolute',
        bottom: 40,
        right: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#B22222',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    modalCenteredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    modalButton: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 10,
        width: 100,
        alignItems: 'center',
        backgroundColor: "#E64646",
    },
    modalButtonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    }
});

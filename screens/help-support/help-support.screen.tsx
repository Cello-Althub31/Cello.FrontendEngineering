import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface HelpSupportScreenProps {
  onBack?: () => void;
  onContactUs?: () => void;
  onBackPress?: () => void;
}

const HelpSupportScreen: React.FC<HelpSupportScreenProps> = ({
  onBack,
  onContactUs,
  onBackPress,
}) => {
  const handleContactUs = () => {
    console.log('Contact Us pressed');
    onContactUs?.();
  };

  const handleBackPress = () => {
    onBackPress?.();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header with Navigation */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.menuIcon}>
          <MaterialIcons name="menu" size={24} color="#333" />
        </TouchableOpacity>
        <Image
          source ={require('@/assets/images/profile.png')}
          style={styles.profileIcon}
        />
      </View>

      {/* Title */}
      <View style={styles.titleSection}>
        <Text style={styles.title}>Help & Support</Text>
      </View>

      {/* Cloud Icon Illustration */}
      <View style={styles.illustrationContainer}>
        <View style={styles.cloudIcon}>
          <View style={[styles.cloudBubble, styles.cloudBubbleLarge]} />
          <View style={[styles.cloudBubble, styles.cloudBubbleSmall1]} />
          <View style={[styles.cloudBubble, styles.cloudBubbleSmall2]} />
        </View>
      </View>

      {/* Help Text */}
      <View style={styles.helpTextSection}>
        <Text style={styles.helpTitle}>Need some help? Don't know how to use to App?</Text>
        <Text style={styles.helpSubtitle}>Contact us</Text>
      </View>

      {/* Contact Us Button */}
      <TouchableOpacity
        style={styles.contactButton}
        onPress={handleContactUs}
        activeOpacity={0.8}
      >
        <Text style={styles.contactButtonText}>Contact us</Text>
      </TouchableOpacity>

      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={handleBackPress}
        activeOpacity={0.8}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf7f7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  menuIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e0e0e0',
  },
  titleSection: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingTop: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  illustrationContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  cloudIcon: {
    position: 'relative',
    width: 120,
    height: 80,
  },
  cloudBubble: {
    position: 'absolute',
    borderRadius: 50,
    backgroundColor: '#c97070',
  },
  cloudBubbleLarge: {
    width: 80,
    height: 50,
    bottom: 10,
    left: 15,
  },
  cloudBubbleSmall1: {
    width: 30,
    height: 30,
    top: 5,
    right: 30,
  },
  cloudBubbleSmall2: {
    width: 22,
    height: 22,
    top: 20,
    right: 10,
  },
  helpTextSection: {
    paddingHorizontal: 16,
    alignItems: 'center',
    marginVertical: 20,
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 22,
  },
  helpSubtitle: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  contactButton: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#dc3545',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    marginHorizontal: 16,
    marginBottom: 30,
    borderWidth: 1.5,
    borderColor: '#dc3545',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#dc3545',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HelpSupportScreen;
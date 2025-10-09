import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';

const missedMedications = [
  { id: '1', name: 'Lisinopril', date: 'Aug 1', time: '10:30 AM' },
];

export default function HistoryListScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.push('../history-tracker/history-tracker.screen')}>
          <Text style={styles.navItem}>Today</Text>
        </TouchableOpacity>
        <Text style={[styles.navItem, styles.activeNav]}>History</Text>
        <TouchableOpacity onPress={() => router.push('../history-analytics/HistoryAnalyticsScreen')}>
          <Text style={styles.navItem}>Analytics</Text>
        </TouchableOpacity>
      </View>

      {/* Header */}
      <View style={styles.headerRow}>
        <Image source={require('@/assets/icons/history.png')} style={styles.icon} />
        <Text style={styles.title}>History</Text>
      </View>

      {/* Compliance Summary */}
      <View style={styles.summaryBox}>
        <Text style={styles.complianceText}>Compliance: <Text style={styles.compliant}>Compliant</Text></Text>
        <Text style={styles.stat}>Average: 56%</Text>
        <Text style={styles.stat}>Taken: 4 doses</Text>
        <Text style={styles.stat}>Missed: 2 doses</Text>
      </View>

      {/* Missed Medications */}
      <Text style={styles.sectionTitle}>Missed Doses</Text>
      <FlatList
        data={missedMedications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.missedCard}>
            <Image source={require('@/assets/icons/Pill-red.png')} style={styles.pillIcon} />
            <View style={styles.missedInfo}>
              <Text style={styles.missedName}>{item.name}</Text>
              <Text style={styles.missedDetails}>Missed on {item.date} at {item.time}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  navItem: {
    fontSize: 16,
    color: '#888',
  },
  activeNav: {
    color: '#d00',
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: '#d00',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  icon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  summaryBox: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  complianceText: {
    fontSize: 16,
    marginBottom: 4,
  },
  compliant: {
    color: '#2e7d32',
    fontWeight: 'bold',
  },
  stat: {
    fontSize: 14,
    color: '#555',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  missedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff5f5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  pillIcon: {
    width: 32,
    height: 32,
    marginRight: 12,
  },
  missedInfo: {
    flex: 1,
  },
  missedName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d00',
  },
  missedDetails: {
    fontSize: 14,
    color: '#666',
  },
});

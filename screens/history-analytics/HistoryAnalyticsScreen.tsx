import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function AnalyticsScreen() {
  const router = useRouter();

  // Example user progress data
  const totalDoses = 9;
  const takenDoses = 5;
  const missedDoses = totalDoses - takenDoses;

  const complianceRate = Math.round((takenDoses / totalDoses) * 100);

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

      {/* Analytics Header */}
      <View style={styles.analyticsHeader}>
        <Image
          source={require('@/assets/icons/bar-chart.png')}
          style={styles.chartIcon}
        />
        <Text style={styles.title}>Analytics</Text>
      </View>

      {/* Compliance Rate */}
      <View style={styles.complianceBox}>
        <Text style={styles.complianceRate}>{complianceRate}%</Text>
        <Text style={styles.subheading}>Overall Compliance Rate</Text>
        <Text style={styles.note}>
          Based on {totalDoses} medication doses in the selected period
        </Text>
        <Text style={styles.note}>
          Taken: {takenDoses} • Missed: {missedDoses}
        </Text>
      </View>
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
    marginBottom: 24,
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
  analyticsHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  chartIcon: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  complianceBox: {
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  complianceRate: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#d00',
    marginBottom: 8,
  },
  subheading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
    marginBottom: 4,
  },
  note: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

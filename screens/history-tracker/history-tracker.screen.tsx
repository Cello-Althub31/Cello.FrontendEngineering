import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, Image } from 'react-native';

interface Medication {
  id: number;
  name: string;
  dose: string;
  time: string;
  status: string;
}

interface MissedDose {
  id: number;
  name: string;
  date: string;
  time: string;
}

export default function HistoryTracker() {
  const [activeTab, setActiveTab] = useState('today');
  const [medications, setMedications] = useState<Medication[]>([
    { id: 1, name: 'Lisinopril', dose: '10mg', time: '08:00', status: 'pending' },
    { id: 2, name: 'Lisinopril', dose: '10mg', time: '08:00', status: 'pending' },
    { id: 3, name: 'Lisinopril', dose: '10mg', time: '08:00', status: 'pending' },
  ]);

  const historyData = {
    compliance: 'Compliant',
    complianceRate: 56,
    taken: 4,
    missed: 2,
    totalMissed: 3,
    missedDoses: [
      { id: 1, name: 'Lisinopril', date: 'Aug 1', time: '10:30AM' }
    ] as MissedDose[]
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    setMedications(meds =>
      meds.map(med =>
        med.id === id ? { ...med, status: newStatus } : med
      )
    );
  };

  const renderToday = () => (
    <View style={styles.content}>
      <View style={styles.sectionHeader}>
        <Image 
          source={require('@/assets/icons/clock.png')} 
          style={styles.headerIcon}
        />
        <Text style={styles.sectionTitle}>Today's Schedule</Text>
      </View>

      {medications.map(med => (
        <View key={med.id} style={styles.medicationCard}>
          <View style={styles.medicationInfo}>
            <View style={styles.pillIcon}>
              <Image 
                source={require('@/assets/icons/pill.png')} 
                style={styles.iconSmall}
              />
            </View>
            <View>
              <Text style={styles.medicationName}>{med.name}</Text>
              <Text style={styles.medicationDetails}>{med.dose} • {med.time}</Text>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              onPress={() => handleStatusChange(med.id, 'taken')}
              style={[
                styles.actionButton,
                med.status === 'taken' ? styles.takenButton : styles.defaultButton
              ]}
            >
              <Image 
                source={require('@/assets/icons/check.png')} 
                style={[
                  styles.iconSmall,
                  { tintColor: med.status === 'taken' ? '#fff' : '#9CA3AF' }
                ]}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleStatusChange(med.id, 'paused')}
              style={[
                styles.actionButton,
                med.status === 'paused' ? styles.pausedButton : styles.defaultButton
              ]}
            >
              <Image 
                source={require('@/assets/icons/pause.png')} 
                style={[
                  styles.iconSmall,
                  { tintColor: med.status === 'paused' ? '#fff' : '#9CA3AF' }
                ]}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleStatusChange(med.id, 'skipped')}
              style={[
                styles.actionButton,
                med.status === 'skipped' ? styles.skippedButton : styles.defaultButton
              ]}
            >
              <Image 
                source={require('@/assets/icons/cancel.png')} 
                style={[
                  styles.iconSmall,
                  { tintColor: med.status === 'skipped' ? '#fff' : '#9CA3AF' }
                ]}
              />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );

  const renderHistory = () => (
    <View style={styles.content}>
      <View style={styles.sectionHeader}>
        <Image 
          source={require('@/assets/icons/history.png')} 
          style={styles.headerIcon}
        />
        <Text style={styles.sectionTitle}>History</Text>
      </View>

      {/* Compliance Card */}
      <View style={styles.historyCard}>
        <View style={styles.historyCardRow}>
          <View style={styles.historyCardLeft}>
            <Image 
              source={require('@/assets/icons/ion-analytics.png')} 
              style={styles.iconMedium}
            />
            <View>
              <Text style={styles.historyCardTitle}>Compliance</Text>
              <Text style={styles.historyCardSubtitle}>{historyData.compliance}</Text>
            </View>
          </View>
          <View style={styles.historyCardRight}>
            <Text style={styles.historyCardValue}>{historyData.complianceRate}%</Text>
            <Text style={styles.historyCardLabel}>Average</Text>
          </View>
        </View>
      </View>

      {/* Taken Card */}
      <View style={styles.historyCard}>
        <View style={styles.historyCardLeft}>
          <Image 
            source={require('@/assets/icons/icons-medicines.png')} 
            style={styles.iconMedium}
          />
          <View>
            <Text style={styles.historyCardTitle}>Taken</Text>
            <Text style={styles.historyCardValue}>{historyData.taken}</Text>
          </View>
        </View>
      </View>

      {/* Missed Card */}
      <View style={styles.historyCard}>
        <View style={styles.historyCardLeft}>
          <Image 
            source={require('@/assets/icons/missed-medicines.png')} 
            style={styles.iconMedium}
          />
          <View>
            <Text style={styles.historyCardTitle}>Missed</Text>
            <Text style={styles.historyCardValue}>{historyData.missed}</Text>
          </View>
        </View>
      </View>

      {/* Total Missed Card */}
      <View style={[styles.historyCard, { marginBottom: 16 }]}>
        <View style={styles.historyCardLeft}>
          <Image 
            source={require('@/assets/icons/missed-outline.png')} 
            style={styles.iconMedium}
          />
          <View>
            <Text style={styles.historyCardTitle}>Missed</Text>
            <Text style={styles.historyCardValue}>{historyData.totalMissed}</Text>
          </View>
        </View>
      </View>

      {/* Missed Doses List */}
      {historyData.missedDoses.map(dose => (
        <View key={dose.id} style={styles.missedDoseCard}>
          <View style={styles.historyCardLeft}>
            <View style={styles.missedDoseIcon}>
              <Image
                source={require('@/assets/icons/Pill-red.png')}
                style={styles.iconMedium}
              />
            </View>
            <View>
              <Text style={styles.missedDoseName}>{dose.name}</Text>
              <Text style={styles.missedDoseStatus}>Missed</Text>
            </View>
          </View>
          <View style={styles.historyCardRight}>
            <Text style={styles.missedDoseDate}>{dose.date}</Text>
            <Text style={styles.missedDoseTime}>{dose.time}</Text>
          </View>
        </View>
      ))}
      {historyData.missedDoses.map(dose => (
        <View key={dose.id} style={styles.missedDoseCard}>
          <View style={styles.historyCardLeft}>
            <View style={styles.missedDoseIcon}>
              <Image
                source={require('@/assets/icons/Pill-red.png')}
                style={styles.iconMedium}
              />
            </View>
            <View>
              <Text style={styles.missedDoseName}>{dose.name}</Text>
              <Text style={styles.missedDoseStatus}>Missed</Text>
            </View>
          </View>
          <View style={styles.historyCardRight}>
            <Text style={styles.missedDoseDate}>{dose.date}</Text>
            <Text style={styles.missedDoseTime}>{dose.time}</Text>
          </View>
        </View>
      ))}
      {historyData.missedDoses.map(dose => (
        <View key={dose.id} style={styles.missedDoseCard}>
          <View style={styles.historyCardLeft}>
            <View style={styles.missedDoseIcon}>
              <Image
                source={require('@/assets/icons/Pill-red.png')}
                style={styles.iconMedium}
              />
            </View>
            <View>
              <Text style={styles.missedDoseName}>{dose.name}</Text>
              <Text style={styles.missedDoseStatus}>Missed</Text>
            </View>
          </View>
          <View style={styles.historyCardRight}>
            <Text style={styles.missedDoseDate}>{dose.date}</Text>
            <Text style={styles.missedDoseTime}>{dose.time}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderAnalytics = () => (
    <View style={styles.content}>
      <View style={styles.sectionHeader}>
        <Image
          source={require('@/assets/icons/analytics.png')}
          style={styles.headerIcon}
        />
        <Text style={styles.sectionTitle}>Analytics</Text>
      </View>

      <View style={styles.analyticsContainer}>
        <View style={styles.analyticsIconContainer}>
          <Image
            source={require('@/assets/icons/bar-chart.png')}
            style={styles.iconLarge}
          />
        </View>

        <Text style={styles.analyticsPercentage}>{historyData.complianceRate}%</Text>
        <Text style={styles.analyticsTitle}>Overall Compliance Rate</Text>
        <Text style={styles.analyticsSubtitle}>
          Based on 9 medication doses{'\n'}in the selected period
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => setActiveTab('today')}
          style={styles.tab}
        >
          <Text style={[styles.tabText, activeTab === 'today' && styles.activeTabText]}>
            Today
          </Text>
          {activeTab === 'today' && <View style={styles.tabIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab('history')}
          style={styles.tab}
        >
          <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>
            History
          </Text>
          {activeTab === 'history' && <View style={styles.tabIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab('analytics')}
          style={styles.tab}
        >
          <Text style={[styles.tabText, activeTab === 'analytics' && styles.activeTabText]}>
            Analytics
          </Text>
          {activeTab === 'analytics' && <View style={styles.tabIndicator} />}
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.scrollView}>
        {activeTab === 'today' && renderToday()}
        {activeTab === 'history' && renderHistory()}
        {activeTab === 'analytics' && renderAnalytics()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  hamburgerIcon: {
    width: 24,
    height: 24,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    position: 'relative',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9CA3AF',
  },
  activeTabText: {
    color: '#EF4444',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#EF4444',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  headerIcon: {
    width: 20,
    height: 20,
  },
  iconSmall: {
    width: 16,
    height: 16,
  },
  iconMedium: {
    width: 20,
    height: 20,
  },
  iconLarge: {
    width: 36,
    height: 36,
  },
  medicationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  medicationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  pillIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  medicationName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  medicationDetails: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 6,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultButton: {
    backgroundColor: '#F3F4F6',
  },
  takenButton: {
    backgroundColor: '#10B981',
  },
  pausedButton: {
    backgroundColor: '#F97316',
  },
  skippedButton: {
    backgroundColor: '#EF4444',
  },
  historyCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  historyCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  historyCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  historyCardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  historyCardSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  historyCardRight: {
    alignItems: 'flex-end',
  },
  historyCardValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  historyCardLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  missedDoseCard: {
    backgroundColor: '#FEE2E2',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  missedDoseIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  missedDoseName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  missedDoseStatus: {
    fontSize: 12,
    color: '#4B5563',
    marginTop: 2,
  },
  missedDoseDate: {
    fontSize: 13,
    fontWeight: '500',
    color: '#111827',
  },
  missedDoseTime: {
    fontSize: 12,
    color: '#4B5563',
    marginTop: 2,
  },
  analyticsContainer: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  analyticsIconContainer: {
    width: 72,
    height: 72,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  analyticsPercentage: {
    fontSize: 56,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  analyticsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  analyticsSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});
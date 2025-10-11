import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import journalApi from "@/lib/api/journals";

interface IJournalEntry {
  _id: string;
  title: string;
  description: string;
  feeling: string;
  entryDate: string;
  timeOfDay: string;
  createdAt: string;
}

const JournalHistoryScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { folderId } = useLocalSearchParams(); // from route param
  const [journals, setJournals] = useState<IJournalEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch all journals for a folder
  const fetchJournals = useCallback(async () => {
    if (!folderId) return;
    setError(null);
    setLoading(true);

    try {
      const response = await journalApi.getJournalByFolder(String(folderId));
      setJournals(response.data?.data || []);
    } catch (err: any) {
      console.error("Error fetching journals:", err);
      setError(err?.response?.data?.message || "Failed to load journals.");
    } finally {
      setLoading(false);
    }
  }, [folderId]);

  useEffect(() => {
    fetchJournals();
  }, [fetchJournals]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchJournals();
    setRefreshing(false);
  };

  const handleAddNew = () => {
    router.push(`/journal?folderId=${folderId}`);
  }
  const handleEdit = (entryId: string) => {
    Alert.alert("Editing", "You are about to edit this journal");
    console.log(entryId)
    // router.push(`/journals/edit/${entryId}`);
  }
  const handleDelete = (entryId: string) => {
    Alert.prompt("Delete Journal", "Are you sure you want to delete this journal?");
    console.log(entryId)
    // router.push(`/journals/delete/${entryId}`);
  }

  if (loading) {
    return (
      <View style={[styles.center, { paddingTop: insets.top }]}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={{ marginTop: 8, color: "#6B7280" }}>Loading journals...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.center, { paddingTop: insets.top }]}>
        <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>
        <TouchableOpacity onPress={fetchJournals}>
          <Text style={{ color: "#2563eb", textDecorationLine: "underline" }}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#111827" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={handleAddNew}>
          <AntDesign name="plus-circle" size={28} color="#3B82F6" />
        </TouchableOpacity>
      </View>

      <View style={styles.greetingCard}>
        <Text style={styles.greetingTitle}>Hi John Doe,</Text>
        <Text style={styles.greetingSubtitle}>
          Here are your recent journal entries in this folder.
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 24 },
        ]}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {journals.length === 0 ? (
          <View style={{ alignItems: "center", marginTop: 50 }}>
            <Text style={{ color: "#6B7280" }}>No journal entries found.</Text>
          </View>
        ) : (
          journals.map((entry) => (
            <TouchableOpacity
              key={entry._id}
              style={styles.entryItem}
              activeOpacity={0.8}
              onPress={() => handleEdit(entry._id)}
            >
              <View style={styles.entryContent}>
                <View style={styles.entryInfo}>
                  <Text style={styles.entryTitle}>{entry.title}</Text>
                  <Text style={styles.entryFeeling}>
                    Feeling: {entry.feeling || "—"}
                  </Text>
                  <Text style={styles.entryDescription} numberOfLines={2}>
                    {entry.description}
                  </Text>
                  <Text style={styles.entryDate}>
                    {new Date(entry.entryDate).toDateString()} — {entry.timeOfDay}
                  </Text>
                </View>
                <View style={styles.entryActions}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleEdit(entry._id)}
                  >
                    <Feather name="edit-2" size={20} color="#3B82F6" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleDelete(entry._id)}
                  >
                    <Feather name="trash-2" size={20} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  backButton: { padding: 4 },
  addButton: { padding: 4 },
  greetingCard: {
    backgroundColor: "#F9FAFB",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#3B82F6",
  },
  greetingTitle: { fontSize: 16, fontWeight: "700", color: "#111827", marginBottom: 4 },
  greetingSubtitle: { fontSize: 14, color: "#6B7280", lineHeight: 20 },
  scrollContent: { paddingHorizontal: 20 },
  entryItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  entryContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  entryInfo: { flex: 1 },
  entryTitle: { fontSize: 16, fontWeight: "700", color: "#111827" },
  entryFeeling: { fontSize: 14, color: "#2563eb", marginTop: 2 },
  entryDescription: {
    fontSize: 14,
    color: "#374151",
    marginTop: 4,
    marginBottom: 4,
  },
  entryDate: { fontSize: 12, color: "#9CA3AF" },
  entryActions: { flexDirection: "row", gap: 12, marginLeft: 12 },
  actionButton: { padding: 4 },
});

export default JournalHistoryScreen;

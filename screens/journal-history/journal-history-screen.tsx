import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type JournalEntry = {
  id: number;
  title: string;
  timeAgo: string;
  isHighlighted?: boolean;
};

type JournalHistoryScreenProps = {
  onEdit?: (entryId: number) => void;
  onDelete?: (entryId: number) => void;
  onAddNew?: () => void;
};

const JournalHistoryScreen: React.FC<JournalHistoryScreenProps> = ({
  onEdit,
  onDelete,
  onAddNew,
}) => {
  const insets = useSafeAreaInsets();

  const entries: JournalEntry[] = [
    { id: 1, title: "I Felt A lot Better After Taki...", timeAgo: "20mins ago" },
    { id: 2, title: "I Felt A lot Better After Taki...", timeAgo: "20mins ago" },
    { id: 3, title: "I Felt A lot Better After Taki...", timeAgo: "20mins ago", isHighlighted: true },
    { id: 4, title: "I Felt A lot Better After Taki...", timeAgo: "30mins ago" },
  ];

  const handleEdit = (entryId: number) => {
    onEdit?.(entryId);
  };

  const handleAddNew = () => {
    onAddNew?.();
  };


  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color="#111827" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleAddNew}>
          <AntDesign name="pluscircle" size={28} color="#3B82F6" />
        </TouchableOpacity>
      </View>

      <View style={styles.greetingCard}>
        <Text style={styles.greetingTitle}>Hi John Doe,</Text>
        <Text style={styles.greetingSubtitle}>
          Tell us how you're feeling this Morning!
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        {entries.map((entry) => (
          <TouchableOpacity
            key={entry.id}
            style={[
              styles.entryItem,
              entry.isHighlighted && styles.entryItemHighlighted,
            ]}
            activeOpacity={0.7}
          >
            <View style={styles.entryContent}>
              <View style={styles.entryInfo}>
                <Text
                  style={[
                    styles.entryTitle,
                    entry.isHighlighted && styles.entryTitleHighlighted,
                  ]}
                >
                  {entry.title}
                </Text>
                <Text
                  style={[
                    styles.entryTime,
                    entry.isHighlighted && styles.entryTimeHighlighted,
                  ]}
                >
                  {entry.timeAgo}
                </Text>
              </View>

              <View style={styles.entryActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleEdit(entry.id)}
                >
                  <Feather
                    name="edit-2"
                    size={20}
                    color={entry.isHighlighted ? "#fff" : "#3B82F6"}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => router.push("../entry-delete")}
                >
                  <Feather
                    name="trash-2"
                    size={20}
                    color={entry.isHighlighted ? "#fff" : "#EF4444"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  backButton: {
    padding: 4,
  },
  addButton: {
    padding: 4,
  },
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
  greetingTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  greetingSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
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
  entryItemHighlighted: {
    backgroundColor: "#B91C1C",
    borderColor: "#B91C1C",
  },
  entryContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  entryInfo: {
    flex: 1,
  },
  entryTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  entryTitleHighlighted: {
    color: "#fff",
  },
  entryTime: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  entryTimeHighlighted: {
    color: "rgba(255, 255, 255, 0.8)",
  },
  entryActions: {
    flexDirection: "row",
    gap: 12,
    marginLeft: 12,
  },
  actionButton: {
    padding: 4,
  },
});

export default JournalHistoryScreen;
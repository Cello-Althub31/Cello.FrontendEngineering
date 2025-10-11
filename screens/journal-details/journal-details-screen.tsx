import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import journalApi from "@/lib/api/journals";

type Folder = {
  _id: string;
  type: string;
  lastEdited?: string;
  icon?: any;
};

const JournalDetailScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [folders, setFolders] = useState<Folder[]>([]);
  const [filteredFolders, setFilteredFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const path = usePathname();
  console.log("Current path:", path);

  const fetchFolders = async () => {
    try {
      setLoading(true);
      const response = await journalApi.allFolders();
      console.log(response.data)
      const data = response.data?.data || [];
      setFolders(data);
      setFilteredFolders(data);
    } catch (err: any) {
      console.error("Error fetching folders:", err);
      setError("Failed to load folders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);


  useEffect(() => {
    if (searchText.trim() === "") {
      setFilteredFolders(folders);
    } else {
      const filtered = folders.filter((folder) =>
        folder.type.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredFolders(filtered);
    }
  }, [searchText, folders]);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#f59e0b" />
        <Text style={{ marginTop: 10 }}>Loading folders...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>
        <TouchableOpacity onPress={() => fetchFolders()}>
          <Text style={{ color: "#2563eb", textDecorationLine: "underline" }}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity style={styles.menuButton} onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <Feather
            name="search"
            size={20}
            color="#9CA3AF"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#9CA3AF"
            value={searchText}
            onChangeText={setSearchText}
            autoCorrect={false}
            autoCapitalize="none"
          />
          <Image
            source={require("@/assets/icons/journalFolder.png")}
            style={styles.folderIcon}
          />
        </View>

        <Text style={styles.sectionTitle}>Folders</Text>

        {filteredFolders.length > 0 ? (
          filteredFolders.map((folder) => (
            <TouchableOpacity
              key={folder._id}
              style={styles.folderItem}
              onPress={() => router.push(`/journal-history?folderId=${folder._id}`)}
            >
              <View style={styles.iconContainer}>
                <Image
                  source={folder.icon || require("@/assets/icons/journal.png")}
                  style={styles.iconImage}
                  resizeMode="contain"
                />
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.folderTitle}>{folder.type}</Text>
                <Text style={styles.folderDate}>
                  {folder.lastEdited ? `Last Edited ${folder.lastEdited}` : "No recent activity"}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={{ textAlign: "center", color: "#666", marginTop: 20 }}>
            No folders found.
          </Text>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default JournalDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: 24,
  },
  menuButton: {
    alignSelf: "flex-start",
    marginTop: 60,
    marginBottom: 30,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 20,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
  },
  folderIcon: {
    width: 24,
    height: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    marginLeft: 20,
  },
  folderItem: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#FFCDD233",
    marginBottom: 12,
    marginHorizontal: 20,
    padding: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  iconImage: {
    width: 32,
    height: 32,
  },
  infoContainer: {
    flex: 1,
  },
  folderTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  folderDate: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
});
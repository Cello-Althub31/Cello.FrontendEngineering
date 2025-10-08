import React from "react";
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
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { router } from "expo-router";

type JournalDetailScreenProps = {
  onNavigate: (action: string, folderId: number) => void;
};

const JournalDetailScreen: React.FC<JournalDetailScreenProps> = ({
  onNavigate,
}) => {
  const [searchText, setSearchText] = React.useState("");
  
  const folders = [
    {
      id: 1,
      title: "My Journal",
      lastEdited: "Last Edited 29th July",
      icon: require("@/assets/icons/journal.png"),
    },
    {
      id: 2,
      title: "Quick Notes",
      lastEdited: "Last Edited 10th July",
      icon: require("@/assets/icons/notes.png"),
    },
    {
      id: 3,
      title: "Goals-Settings",
      lastEdited: "Last Edited 10th July",
      icon: require("@/assets/icons/goals.png"),
    },
    {
      id: 4,
      title: "Questionaires",
      lastEdited: "Last Edited 10th December 2024",
      icon: require("@/assets/icons/questionnaire.png"),
    },
  ];

  const filteredFolders = folders.filter((folder) =>
    folder.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity style={styles.menuButton} onPress={() => router.back()}>
          <Feather name="menu" size={24} color="#333" />
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
          <Image source={require("@/assets/icons/journalFolder.png")} style={styles.folderIcon} />
        </View>

        <Text style={styles.sectionTitle}>Folders</Text>

        {filteredFolders.map((folder) => (
          <TouchableOpacity
            key={folder.id}
            style={styles.folderItem}
            onPress={() => router.push("/journal-history")}
          >
            <View style={styles.iconContainer}>
              <Image
                source={folder.icon}
                style={styles.iconImage}
                resizeMode="contain"
              />
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.folderTitle}>{folder.title}</Text>
              <Text style={styles.folderDate}>{folder.lastEdited}</Text>
            </View>
          </TouchableOpacity>
        ))}
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
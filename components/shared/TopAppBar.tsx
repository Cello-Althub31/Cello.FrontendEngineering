import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  ImageSourcePropType,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";

type TopAppBarProps = {
  title?: string;
  avatarSource?: ImageSourcePropType;
  unreadCount?: number;
  onMenu?: () => void;
  onNotifications?: () => void;
  onCall?: () => void;
  onAvatarPress?: () => void;
};

export default function TopAppBar({
  unreadCount = 0,
  onMenu,
  onNotifications,
  onCall,
  onAvatarPress,
}: TopAppBarProps) {
  return (
    <View className="w-full flex-row items-center justify-between px-4 py-3">
      {/* Left: Hamburger + Title */}
      <View className="flex-row items-center gap-3">
        <Pressable onPress={onMenu} accessibilityLabel="Open menu">
          <Feather name="menu" size={24} color="#111827" />
        </Pressable>
        
      </View>

      {/* Right: Bell + Avatar + Call */}
      <View className="flex-row items-center gap-3">
        <Pressable
          onPress={onNotifications}
          className="relative"
          accessibilityLabel="Notifications"
        >
          <Feather name="bell" size={22} color="#111827" />
          {unreadCount > 0 && (
            <View className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 items-center justify-center">
              <Text className="text-[10px] text-white font-poppins-semibold">
                {unreadCount > 9 ? "9+" : unreadCount}
              </Text>
            </View>
          )}
        </Pressable>

        <Pressable
          onPress={onAvatarPress}
          className="w-8 h-8 rounded-full overflow-hidden border border-gray-200"
          accessibilityLabel="Profile"
        >
          <Image
            source={require("@/assets/images/Ellipse 1.png")}
            className="w-full h-full"
          />
        </Pressable>

        <Pressable
          onPress={onCall}
          className="w-9 h-9 rounded-full bg-red-600 items-center justify-center"
          accessibilityLabel="Call support"
        >
          <Ionicons name="call" size={18} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
}

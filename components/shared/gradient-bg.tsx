import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type GradientPoint = {
  x: number;
  y: number;
};

type GradientBackgroundProps = {
  children: React.ReactNode;
  colors?: [string, string, ...string[]];
  style?: ViewStyle;
  start?: GradientPoint;
  end?: GradientPoint;
};

export default function GradientBackground({
  children,
  colors = ["#B22222", "#FFFFFF"] as [string, string],
  style,
  start = { x: 0.5, y: 0 }, // default: top center
  end = { x: 0.5, y: 1 },   // default: bottom center
}: GradientBackgroundProps) {
  return (
    <LinearGradient colors={colors} style={[styles.container, style]}>
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

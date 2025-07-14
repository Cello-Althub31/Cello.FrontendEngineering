import React from "react";
import {
  Pressable,
  Text,
  Image,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
} from "react-native";

type ButtonProps = {
  title?: string;
  onPress: () => void;
  variant?: "default" | "outline";
  className?: string; // Tailwind classes for Pressable
  textClassName?: string; // Tailwind classes for Text
  disabled?: boolean;
  image?: ImageSourcePropType; // Optional image
  imageClassName?: string; // Tailwind classes for image
  style?: StyleProp<ViewStyle>;
};

export default function Button({
  title,
  onPress,
  variant = "default",
  className = "",
  textClassName = "",
  image,
  imageClassName = "",
  disabled = false,
  style
}: ButtonProps) {
  const baseClass =
    "px-6 py-3 rounded-2xl items-center justify-center flex-row";
  const baseTextClass = "text-base font-semibold";

  const hasCustomBgColor = /\bbg-/.test(className);
  const hasCustomBorderColor = /\bborder-/.test(className);
  const hasCustomTextColor =
    /\btext-(white|black|red|gray|blue|green|yellow|purple|primary|secondary)\b/.test(
      textClassName ?? ""
    );

    const variantBg =
      variant === "outline"
        ? `${!hasCustomBorderColor ? "border border-primary" : ""} ${
            !hasCustomBgColor ? "bg-transparent" : ""
          }`
        : !hasCustomBgColor
          ? "bg-primary"
          : "";  

  const textColor = variant === "outline" ? "text-primary" : "text-white";

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`${baseClass} ${!hasCustomBgColor ? variantBg : ""} ${className}`}
      style={style}
    >
      {image && (
        <Image
          source={image}
          className={`mr-2 ${imageClassName}`}
          resizeMode="contain"
        />
      )}
      {title && (
        <Text
          className={`${baseTextClass} ${!hasCustomTextColor ? textColor : ""} ${textClassName}`}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}

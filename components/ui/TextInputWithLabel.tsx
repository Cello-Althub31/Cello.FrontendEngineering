import React from "react";
import { View, Text, TextInput, TextInputProps } from "react-native";

interface TextInputWithLabelProps extends TextInputProps {
  label?: string;
  labelError?: string;
  labelErrorColor?: string;
  labelFontFamily?: string;
  labelFontSize?: number;
  isPasswordShown?: boolean;
  backgroundColor?: string;
}

const TextInputWithLabel: React.FC<{ props: TextInputWithLabelProps }> = ({
  props,
}) => {
  const {
    label,
    labelError,
    labelErrorColor,
    labelFontFamily,
    labelFontSize = 12,
    isPasswordShown,
    backgroundColor = "#F9FAFB",
    secureTextEntry,
    placeholder,
    placeholderTextColor = "#A1A1AA",
    onChangeText,
    value,
    keyboardType,
    ...rest
  } = props;

  return (
    <View className="mb-4">
      <Text
        className={`${labelFontFamily ? "" : "font-poppins-medium"} text-xs mb-2 font-normal`}
        style={{ fontSize: labelFontSize }}
      >
        {label}
      </Text>
      <TextInput
        {...rest}
        secureTextEntry={secureTextEntry && !isPasswordShown}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        onChangeText={onChangeText}
        value={value}
        keyboardType={keyboardType}
        importantForAutofill="no"
        className="w-full border rounded-2xl font-poppins text-sm"
        style={{
          borderColor: "#D1D5DB",
          paddingVertical: 10,
          paddingHorizontal: 10,
          backgroundColor: backgroundColor,
        }}
      />
      <Text style={{ fontSize: 12, color: labelErrorColor }}>{labelError}</Text>
    </View>
  );
};

export default TextInputWithLabel;

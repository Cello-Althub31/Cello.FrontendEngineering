import Colors from "@/constants/Colors";
import {
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

const KeyboardAvoidingWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const behavior = Platform.OS === "ios" ? "padding" : undefined;
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: Colors.colors.white }}
      behavior={behavior}
      keyboardVerticalOffset={Platform.select({ ios: 60, android: 0 })}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {children}
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingWrapper;

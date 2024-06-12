import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";

type ConfirmationButtonProps = {
  text: string;
  variant?: "primary" | "secondary" | "orange";
  size?: "small" | "medium" | "large";
  onPress: () => void;
};

const ConfirmationButton: React.FC<
  ConfirmationButtonProps & TouchableOpacityProps
> = ({
  text,
  variant = "primary",
  size = "medium",
  onPress,
  style,
  ...rest
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, styles[variant], styles[size], style]}
      onPress={onPress}
      {...rest}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 24,
    minWidth: 120,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  primary: {
    backgroundColor: "#007bff",
  },
  secondary: {
    backgroundColor: "#6c757d",
  },
  orange: {
    backgroundColor: "#FF6500",
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    minWidth: 100,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    minWidth: 150,
  },
});

export default ConfirmationButton;

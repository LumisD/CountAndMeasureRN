import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {DEFAULT_ICON_SIZE} from "./Constants";
import {
  Black,
  ButtonBlue,
  DisabledGray,
  White,
  Yellowish,
} from "../../theme/colors";

// UpArrowIcon
export const UpArrowIcon: React.FC<{
  style?: StyleProp<ViewStyle>;
  size?: number;
  color?: string;
}> = ({style, size = DEFAULT_ICON_SIZE, color = Black}) => (
  <Icon name="arrow-up" style={style} size={size} color={color} />
);

// XIcon
export const XIcon: React.FC<{
  style?: StyleProp<ViewStyle>;
  size?: number;
  color?: string;
}> = ({style, size = DEFAULT_ICON_SIZE, color = Black}) => (
  <Icon name="close" style={style} size={size} color={color} />
);

// CommonButton
type CommonButtonProps = {
  text: string;
  enabled?: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  textColor?: string;
};
export const CommonButton: React.FC<CommonButtonProps> = ({
  text,
  enabled = true,
  onPress,
  style,
  backgroundColor = ButtonBlue,
  textColor = White,
}) => (
  <TouchableOpacity
    style={[
      styles.button,
      {backgroundColor: enabled ? backgroundColor : DisabledGray},
      style,
    ]}
    onPress={onPress}
    disabled={!enabled}
    activeOpacity={0.7}>
    <Text style={[styles.buttonText, {color: textColor}]}>{text}</Text>
  </TouchableOpacity>
);

// ChipboardAsStringField
type ChipboardAsStringFieldProps = {
  chipboardAsString: string;
  hasColor: boolean;
  color: string; // hex string, e.g. "#FF0000"
};
export const ChipboardAsStringField: React.FC<ChipboardAsStringFieldProps> = ({
  chipboardAsString,
  hasColor,
  color,
}) => (
  <View style={styles.chipboardContainer}>
    <Text style={styles.chipboardText}>{chipboardAsString}</Text>
    <View style={styles.chipboardDivider} />
    {hasColor && (
      <View style={[styles.chipboardColorBox, {backgroundColor: color}]} />
    )}
  </View>
);

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  chipboardContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Yellowish, // "#FFF9C4"
    borderWidth: 1,
    borderColor: Black,
    marginVertical: 8,
    minHeight: 42,
  },
  chipboardText: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    paddingVertical: 8,
  },
  chipboardDivider: {
    width: 1,
    height: 42,
    backgroundColor: Black,
  },
  chipboardColorBox: {
    width: 36,
    height: 42,
    borderWidth: 1,
    borderColor: Black,
    borderRadius: 4,
  },
});

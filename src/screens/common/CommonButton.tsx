import React from "react";
import {Pressable, Text, StyleSheet, GestureResponderEvent} from "react-native";
import {Grayish, PrimaryBlue, White} from "../../theme/colors";

type Props = {
  text: string;
  enabled: boolean;
  onPress: (event: GestureResponderEvent) => void;
};

export const CommonButton: React.FC<Props> = ({text, enabled, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={!enabled}
      style={({pressed}) => [
        styles.button,
        {backgroundColor: enabled ? PrimaryBlue : Grayish},
        pressed && enabled && styles.pressed,
      ]}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    minWidth: 90,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  pressed: {
    opacity: 0.85,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    color: White,
  },
});

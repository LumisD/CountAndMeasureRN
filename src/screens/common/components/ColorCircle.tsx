import React from "react";
import {View, StyleSheet} from "react-native";

type Props = {
  color: string; // hex color string like "#FF0000"
};

export const ColorCircle: React.FC<Props> = ({color}) => {
  return <View style={[styles.circle, {backgroundColor: color}]} />;
};

const styles = StyleSheet.create({
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#999",
  },
});

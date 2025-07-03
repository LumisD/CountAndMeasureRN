import React from "react";
import {View, StyleSheet} from "react-native";
import {Black} from "../../../theme/colors";

type Props = {
  color: string;
};

export const ColorRectangle: React.FC<Props> = ({color}) => {
  return <View style={[styles.box, {backgroundColor: color}]} />;
};

const styles = StyleSheet.create({
  box: {
    width: 36,
    height: 42,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Black,
  },
});

import {StyleSheet} from "react-native";
import {PrimaryBlue} from "./colors";

export const Typography = StyleSheet.create({
  bodyNormal: {
    fontFamily: "monospace",
    color: PrimaryBlue,
  },
  bodyLarge: {
    fontFamily: "monospace",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
    color: PrimaryBlue,
  },
  titleLarge: {
    textAlign: "center",
    fontFamily: "monospace",
    fontWeight: "700",
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0.5,
    color: PrimaryBlue,
  },
});

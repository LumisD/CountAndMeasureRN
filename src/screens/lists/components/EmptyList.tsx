import {t} from "i18next";
import {StyleSheet, Text, View} from "react-native";
import {Typography} from "../../../theme/typography";
import {MainBg} from "../../../theme/colors";

export function EmptyList() {
  return (
    <View style={styles.emptyBox}>
      <Text style={styles.emptyText}>
        {t("press_new_screen_create_chipboard_sheet_list")}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyBox: {
    flex: 1,
    backgroundColor: MainBg,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  emptyText: {
    ...Typography.bodyLarge,
    textAlign: "center",
  },
});

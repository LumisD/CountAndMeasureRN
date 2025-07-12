import {t} from "i18next";
import {StyleSheet, Text, View} from "react-native";
import {Typography} from "../../../../theme/typography";

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
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  emptyText: {
    ...Typography.bodyLarge,
  },
});

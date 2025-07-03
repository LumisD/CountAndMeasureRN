import React from "react";
import {View, StyleSheet} from "react-native";
import {ADD_CHIPBOARD_TO_DB, AddNewItemIntent} from "../AddNewItemIntent";
import {useTranslation} from "react-i18next";
import {CommonButton} from "../../common/components/CommonButton";

type Props = {
  isEnabled: boolean;
  processIntent: (intent: AddNewItemIntent) => void;
};

export const AddChipboardButton: React.FC<Props> = ({
  isEnabled,
  processIntent,
}) => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <CommonButton
        text={t("add")}
        enabled={isEnabled}
        onPress={() => processIntent({type: ADD_CHIPBOARD_TO_DB})}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
});

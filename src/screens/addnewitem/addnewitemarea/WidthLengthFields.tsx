import React from "react";
import {View, Text, StyleSheet} from "react-native";
import {useTranslation} from "react-i18next";
import {NewScreenType} from "../../models/NewScreenType";
import {ChipboardUI} from "../models/ChipboardUI";
import {AddNewItemIntent} from "../AddNewItemIntent";
import {UpArrowIcon} from "../../common/UiElements";
import {NumberEditor} from "./NumberEditor";

type Props = {
  type: NewScreenType;
  chipboard: ChipboardUI;
  processIntent: (intent: AddNewItemIntent) => void;
};

export const WidthLengthFields: React.FC<Props> = ({
  type,
  chipboard,
  processIntent,
}) => {
  const {t} = useTranslation();

  return (
    <>
      {type.columnNames.map((nameKey, index) => {
        const isDirection = type.directionColumn === index + 1;
        const sizeOfDim = getSizeForIndex(index, chipboard);

        return (
          <View key={index} style={styles.row}>
            {isDirection ? <UpArrowIcon /> : <View style={styles.spacer} />}
            <NumberEditor
              label={t(nameKey)}
              sizeOfDim={sizeOfDim}
              dimension={index + 1}
              processIntent={processIntent}
            />
          </View>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  spacer: {
    width: 24,
  },
});

function getSizeForIndex(index: number, chipboard: ChipboardUI | null): string {
  if (chipboard === null) return "";
  switch (index) {
    case 0:
      return chipboard.size1AsString;
    case 1:
      return chipboard.size2AsString;
    case 2:
      return chipboard.size3AsString;
    default:
      return "";
  }
}

import React from "react";
import {View, Text, StyleSheet} from "react-native";
import {useTranslation} from "react-i18next";
import {NewScreenType} from "../../models/NewScreenType";
import {ChipboardUI} from "../models/ChipboardUI";
import {AddNewItemIntent} from "../AddNewItemIntent";
import {UpArrowIcon} from "../../common/UiElements";

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
              value={sizeOfDim}
              columnIndex={index + 1}
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

function getSizeForIndex(index: number, chipboard: ChipboardUI): number {
  return index === 0 ? chipboard.width : chipboard.length;
}

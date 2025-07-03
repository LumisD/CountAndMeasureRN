import React, {useEffect, useState} from "react";
import {View, StyleSheet} from "react-native";
import {AddNewItemIntent} from "../AddNewItemIntent";
import {NewScreenType} from "../../models/NewScreenType";
import {ChipboardAsStringField} from "../../common/components/UiElements";
import {AddNewItemState} from "../AddNewItemState";
import {WidthLengthFields} from "./WidthLengthFields";
import {AddItemColorField} from "./AddItemColorField";
import {QuantityField} from "./QuantityField";
import {AddChipboardButton} from "./AddChipboardButton";

type Props = {
  itemType: NewScreenType;
  state: AddNewItemState;
  shouldFlash: boolean;
  setShouldFlash: (val: boolean) => void;
  processIntent: (intent: AddNewItemIntent) => void;
};

export const AddNewItemArea: React.FC<Props> = ({
  itemType,
  state,
  shouldFlash,
  setShouldFlash,
  processIntent,
}) => {
  const [flashColor, setFlashColor] = useState("transparent");

  useEffect(() => {
    if (shouldFlash) {
      setFlashColor("rgba(0, 122, 255, 0.5)"); // iOS-like primary with alpha
      const timeout = setTimeout(() => {
        setFlashColor("transparent");
        setShouldFlash(false);
      }, 1200);
      return () => clearTimeout(timeout);
    }
  }, [shouldFlash]);

  return (
    <View style={[styles.container, {backgroundColor: flashColor}]}>
      <View style={styles.row}>
        <View style={styles.leftColumn}>
          <WidthLengthFields
            type={itemType}
            chipboard={state.newOrEditChipboard}
            processIntent={processIntent}
          />
          {itemType.hasColor && (
            <AddItemColorField
              colorName={state.newOrEditChipboard.colorName}
              processIntent={processIntent}
            />
          )}
          <QuantityField
            quantityAsString={state.newOrEditChipboard.quantityAsString}
            processIntent={processIntent}
          />
        </View>

        <View style={styles.rightColumn}>
          <AddChipboardButton
            isEnabled={state.isAddButtonAvailable}
            processIntent={processIntent}
          />
        </View>
      </View>

      <ChipboardAsStringField
        chipboardAsString={state.newOrEditChipboard.chipboardAsString}
        hasColor={state.unionOfChipboards.hasColor}
        color={state.newOrEditChipboard.color}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 0,
    paddingBottom: 16,
    paddingHorizontal: 0,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  leftColumn: {
    width: "60%",
  },
  rightColumn: {
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

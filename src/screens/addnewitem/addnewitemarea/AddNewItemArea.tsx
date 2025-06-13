import React, {useEffect, useState} from "react";
import {View, StyleSheet} from "react-native";
import {AddNewItemIntent} from "../AddNewItemIntent";
import {NewScreenType} from "../../models/NewScreenType";
import {ChipboardAsStringField} from "../../common/UiElements";
import {AddNewItemState} from "../AddNewItemState";

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
      {/* TODO: Add WidthLengthFields, AddItemColorField, QuantityField, AddChipboardButton */}
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
    paddingHorizontal: 16,
  },
});

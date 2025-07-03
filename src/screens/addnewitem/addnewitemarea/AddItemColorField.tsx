import React, {useState} from "react";
import {Text, View, Pressable, StyleSheet} from "react-native";
import {colorListWithNames} from "../../common/screenData";
import {AddNewItemIntent, COLOR_CHANGED} from "../AddNewItemIntent";
import {ColorItem} from "../../models/ColorItem";
import {ColorPickerRow} from "../../common/components/ColorPickerRow";

type Props = {
  colorName: string;
  processIntent: (intent: AddNewItemIntent) => void;
};

export const AddItemColorField: React.FC<Props> = ({
  colorName,
  processIntent,
}) => {
  const defaultColor =
    colorListWithNames.find(c => c.name === colorName) ?? colorListWithNames[0];
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSelect = (colorItem: ColorItem) => {
    processIntent({
      type: COLOR_CHANGED,
      newColorName: colorItem.name,
      newColor: colorItem.color,
    });
    setShowDropdown(false);
  };

  return (
    <View style={styles.wrapper}>
      <ColorPickerRow
        selectedColor={defaultColor}
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
        onColorSelected={handleSelect}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 24,
  },
});

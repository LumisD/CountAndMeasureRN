import {useState} from "react";
import {ColorPickerRow} from "../../common/components/ColorPickerRow";
import {colorListWithNames} from "../../common/screenData";
import {ColorItem} from "../../models/ColorItem";
import {COLOR_CHANGED, CountIntent} from "../CountIntent";
import {StyleSheet, View} from "react-native";

type Props = {
  colorName: string;
  processIntent: (intent: CountIntent) => void;
};

export const AddCountColorField: React.FC<Props> = ({
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

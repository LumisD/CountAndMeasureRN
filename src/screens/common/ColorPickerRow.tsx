import React from "react";
import {View, Text, Pressable, StyleSheet, FlatList} from "react-native";
import {ColorCircle} from "./ColorCircle";
import {ColorItem} from "../models/ColorItem";
import {colorListWithNames} from "./screenData";

type Props = {
  selectedColor: ColorItem;
  showDropdown: boolean;
  setShowDropdown: (val: boolean) => void;
  onColorSelected: (colorItem: ColorItem) => void;
};

export const ColorPickerRow: React.FC<Props> = ({
  selectedColor,
  showDropdown,
  setShowDropdown,
  onColorSelected,
}) => {
  return (
    <View>
      <Pressable
        style={styles.row}
        onPress={() => setShowDropdown(!showDropdown)}>
        <Text style={styles.label}>Color</Text>
        <ColorCircle color={selectedColor.color} />
        <View style={{flex: 1}} />
      </Pressable>

      {showDropdown && (
        <FlatList
          data={colorListWithNames}
          keyExtractor={item => item.name}
          renderItem={({item}) => (
            <Pressable
              style={styles.dropdownItem}
              onPress={() => onColorSelected(item)}>
              <ColorCircle color={item.color} />
              <Text style={styles.dropdownText}>{item.name}</Text>
            </Pressable>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 0,
    paddingVertical: 8,
  },
  label: {
    fontSize: 16,
    marginRight: 8,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  dropdownText: {
    marginLeft: 12,
    fontSize: 16,
  },
});

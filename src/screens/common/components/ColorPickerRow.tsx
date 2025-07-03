import React, {useEffect, useRef, useState} from "react";
import {View, Text, Pressable, StyleSheet, FlatList} from "react-native";
import {ColorCircle} from "./ColorCircle";
import {ColorItem} from "../../models/ColorItem";
import {colorListWithNames} from "../screenData";

type Props = {
  selectedColor: ColorItem;
  showDropdown: boolean;
  setShowDropdown: (val: boolean) => void;
  onColorSelected: (colorItem: ColorItem) => void;
};

import {Portal} from "react-native-paper";

export const ColorPickerRow: React.FC<Props> = ({
  selectedColor,
  showDropdown,
  setShowDropdown,
  onColorSelected,
}) => {
  const anchorRef = useRef<View>(null);
  const [anchorY, setAnchorY] = useState(0);

  useEffect(() => {
    if (showDropdown && anchorRef.current) {
      anchorRef.current.measure((x, y, width, height, pageX, pageY) => {
        setAnchorY(pageY + height);
      });
    }
  }, [showDropdown]);

  return (
    <>
      <Pressable
        ref={anchorRef}
        style={styles.row}
        onPress={() => setShowDropdown(!showDropdown)}>
        <Text style={styles.label}>Color</Text>
        <ColorCircle color={selectedColor.color} />
        <View style={{flex: 1}} />
      </Pressable>

      {showDropdown && (
        <Portal>
          <View style={[styles.dropdownContainer, {top: anchorY}]}>
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
          </View>
        </Portal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    position: "absolute",
    left: 24,
    right: 24,
    backgroundColor: "white",
    elevation: 4,
    borderRadius: 4,
    paddingVertical: 4,
    zIndex: 1000,
  },
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

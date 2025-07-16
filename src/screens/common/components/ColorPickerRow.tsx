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
import {t} from "i18next";
import {Black} from "../../../theme/colors";
import {Typography} from "../../../theme/typography";

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
          <>
            {/* This covers the whole screen and catches taps outside the dropdown */}
            <Pressable
              style={StyleSheet.absoluteFill}
              onPress={() => setShowDropdown(false)}
            />
            <View
              style={[
                styles.dropdownContainer,
                {top: anchorY, maxHeight: 400},
              ]}>
              <FlatList
                data={colorListWithNames}
                keyExtractor={item => item.name}
                renderItem={({item}) => (
                  <Pressable
                    style={styles.dropdownItem}
                    onPress={() => onColorSelected(item)}>
                    <ColorCircle color={item.color} />
                    <Text style={styles.dropdownText}>{t(item.name)}</Text>
                  </Pressable>
                )}
              />
            </View>
          </>
        </Portal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: 4,
    elevation: 4, // shadow for Android
    shadowColor: "#000", // shadow for iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 0,
    paddingVertical: 8,
  },
  label: {
    ...Typography.bodyNormal,
    color: Black,
    fontSize: 14,
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

import React, {useState} from "react";
import {View, Text, Pressable} from "react-native";
import {Menu} from "react-native-paper";
import {ColorItem} from "../../models/ColorItem";
import {ColorCircle} from "../../common/ColorCircle";
import {colorListWithNames} from "../../common/screenData";
import {useTranslation} from "react-i18next";

type Props = {
  selectedColor: ColorItem;
  onColorSelected: (item: ColorItem) => void;
};

export const ColorPickerRow: React.FC<Props> = ({
  selectedColor,
  onColorSelected,
}) => {
  const [visible, setVisible] = useState(false);
  const {t} = useTranslation();

  return (
    <View style={{paddingHorizontal: 24}}>
      <Pressable
        onPress={() => setVisible(true)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 8,
        }}>
        <Text style={{marginRight: 8}}>{t(selectedColor.name)}</Text>
        <ColorCircle color={selectedColor.color} />
      </Pressable>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={{x: 24, y: 0}}>
        {colorListWithNames.map(item => (
          <Menu.Item
            key={item.name}
            onPress={() => {
              onColorSelected(item);
              setVisible(false);
            }}
            title={t(item.name)}
            leadingIcon={() => <ColorCircle color={item.color} />}
          />
        ))}
      </Menu>
    </View>
  );
};

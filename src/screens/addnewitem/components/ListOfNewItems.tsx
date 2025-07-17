import React from "react";
import {FlatList, Text, View, Pressable, StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {AddNewItemIntent} from "../AddNewItemIntent";
import {ChipboardUI} from "../models/ChipboardUI";
import {Purple80} from "../../../theme/colors";
import {ColorRectangle} from "../../common/components/ColorRectangle";
import {Typography} from "../../../theme/typography";

interface Props {
  hasColor: boolean;
  chipboards: ChipboardUI[];
  processIntent: (intent: AddNewItemIntent) => void;
}

export const ListOfNewItems: React.FC<Props> = ({
  hasColor,
  chipboards,
  processIntent,
}) => {
  return (
    <FlatList
      data={chipboards}
      keyExtractor={item => item.id.toString()}
      ItemSeparatorComponent={() => (
        <View style={[styles.separator, {backgroundColor: Purple80}]} />
      )}
      renderItem={({item}) => (
        <Pressable
          onPress={() =>
            processIntent({type: "AskEditChipboard", chipboard: item})
          }>
          <View style={styles.row}>
            <View style={styles.chipboardRow}>
              <Text style={styles.chipboardText}>{item.chipboardAsString}</Text>
              {hasColor && <ColorRectangle color={item.color} />}
            </View>
            <View style={{width: 16}} />
            <Pressable
              onPress={() =>
                processIntent({type: "AskDeleteChipboard", chipboard: item})
              }>
              <Icon name="close" size={24} style={styles.icon} />
            </Pressable>
          </View>
        </Pressable>
      )}
    />
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    minHeight: 50,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  chipboardRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  chipboardText: {
    ...Typography.bodyLarge,
    flex: 1,
    fontSize: 19,
  },
  icon: {
    transform: [{scale: 1.3}],
  },
  separator: {
    height: 4,
  },
});

import React from "react";
import {View, TextInput, Text, StyleSheet} from "react-native";
import {AddNewItemIntent, QUANTITY_CHANGED} from "../AddNewItemIntent";
import {Typography} from "../../../theme/typography";
import {Black, Gray} from "../../../theme/colors";

type Props = {
  quantityAsString: string;
  processIntent: (intent: AddNewItemIntent) => void;
};

export const QuantityField: React.FC<Props> = ({
  quantityAsString,
  processIntent,
}) => {
  return (
    <View style={styles.editorContainer}>
      <Text style={styles.label}>Quantity</Text>
      <TextInput
        style={styles.input}
        value={quantityAsString}
        onChangeText={text =>
          processIntent({type: QUANTITY_CHANGED, newQuantityAsString: text})
        }
        keyboardType="numeric"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  editorContainer: {
    marginHorizontal: 24,
    width: 150,
    height: 75,
    justifyContent: "center",
  },
  label: {
    ...Typography.bodyNormal,
    color: Black,
    fontSize: 14,
    marginBottom: 4,
  },
  input: {
    ...Typography.bodyNormal,
    height: 40,
    color: Black,
    borderWidth: 1,
    borderColor: Gray,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 16,
  },
});

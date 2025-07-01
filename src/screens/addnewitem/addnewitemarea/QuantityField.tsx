import React from "react";
import {View, TextInput, Text, StyleSheet} from "react-native";
import {AddNewItemIntent, QUANTITY_CHANGED} from "../AddNewItemIntent";

type Props = {
  quantityAsString: string;
  processIntent: (intent: AddNewItemIntent) => void;
};

export const QuantityField: React.FC<Props> = ({
  quantityAsString,
  processIntent,
}) => {
  return (
    <View style={styles.row}>
      <View style={styles.editorContainer}>
        <Text style={styles.label}>Quantity</Text>
        <TextInput
          style={styles.input}
          value={quantityAsString}
          onChangeText={text =>
            processIntent({type: QUANTITY_CHANGED, newQuantityAsString: text})
          }
          keyboardType="numeric"
          placeholder="Enter quantity"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    marginHorizontal: 24,
  },
  editorContainer: {
    width: 150,
    height: 70,
    justifyContent: "center",
  },
  label: {
    fontSize: 14,
    color: "#888",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 16,
  },
});

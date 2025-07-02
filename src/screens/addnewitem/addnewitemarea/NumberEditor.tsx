import React from "react";
import {TextInput, View, Text, StyleSheet} from "react-native";
import {AddNewItemIntent, SIZE_CHANGED} from "../AddNewItemIntent";
import {Typography} from "../../../theme/typography";
import {Black, Gray} from "../../../theme/colors";

type Props = {
  label: string;
  sizeOfDim: string;
  dimension: number;
  processIntent: (intent: AddNewItemIntent) => void;
};

export const NumberEditor: React.FC<Props> = ({
  label,
  sizeOfDim,
  dimension,
  processIntent,
}) => {
  const handleChange = (text: string) => {
    processIntent({type: SIZE_CHANGED, newSizeAsString: text, dimension});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={sizeOfDim}
        onChangeText={handleChange}
        keyboardType="numeric"
        maxLength={10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 70,
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
    color: Black,
    borderWidth: 1,
    borderColor: Gray,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 16,
    borderRadius: 4,
  },
});

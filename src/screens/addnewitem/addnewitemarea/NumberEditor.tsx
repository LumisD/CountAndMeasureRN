import React from "react";
import {TextInput, View, Text, StyleSheet} from "react-native";
import {AddNewItemIntent, SIZE_CHANGED} from "../AddNewItemIntent";

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
    marginLeft: 8,
    width: 150,
    height: 70,
    justifyContent: "center",
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#888",
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 16,
    borderRadius: 4,
  },
});

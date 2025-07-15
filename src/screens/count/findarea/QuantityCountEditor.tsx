import {StyleSheet, Text, TextInput, View} from "react-native";
import {CountIntent, QUANTITY_CHANGED} from "../CountIntent";
import {Typography} from "../../../theme/typography";
import {Black, Gray} from "../../../theme/colors";

type Props = {
  label: string;
  value: string;
  onQuantityChanged: (intent: CountIntent) => void;
};

export const QuantityCountEditor: React.FC<Props> = ({
  label,
  value,
  onQuantityChanged,
}) => {
  const handleChange = (text: string) => {
    onQuantityChanged({
      type: QUANTITY_CHANGED,
      newQuantityAsString: text,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={handleChange}
        keyboardType="numeric"
        style={styles.input}
        maxLength={10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    width: 130,
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

import {StyleSheet, Text, TextInput, View} from "react-native";
import {CountIntent, QUANTITY_CHANGED} from "../CountIntent";
import {Typography} from "../../../theme/typography";
import {DarkGray, Gray, LightGray, VeryDarkGray} from "../../../theme/colors";

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
    width: 80,
    paddingLeft: 8,
    justifyContent: "center",
  },
  label: {
    ...Typography.bodyLarge,
    fontSize: 13,
    fontStyle: "italic",
    color: Gray,
    marginBottom: 4,
  },
  input: {
    ...Typography.bodyNormal,
    borderWidth: 0.5,
    borderColor: DarkGray,
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 6,
    fontSize: 14,
    color: VeryDarkGray,
    fontStyle: "italic",
  },
});

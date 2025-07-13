import {StyleSheet, Text, TextInput, View} from "react-native";
import {CountIntent, REAL_SIZE_CHANGED} from "../CountIntent";
import {Typography} from "../../../theme/typography";
import {DarkGray, Gray, VeryDarkGray} from "../../../theme/colors";

type Props = {
  value: string;
  label: string;
  dimension: number;
  isEnabled: boolean;
  onValueChange: (intent: CountIntent) => void;
};

export const RealSizeInput: React.FC<Props> = ({
  value,
  label,
  dimension,
  isEnabled,
  onValueChange,
}) => {
  const handleChange = (text: string) => {
    onValueChange({
      type: REAL_SIZE_CHANGED,
      newDiffAsString: text,
      dimension,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={handleChange}
        editable={isEnabled}
        keyboardType="numeric"
        style={[styles.input, !isEnabled && styles.disabledInput]}
        placeholder="0"
        placeholderTextColor="#ccc"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    maxWidth: 150,
    paddingLeft: 8,
    paddingTop: 8,
    paddingBottom: 6,
    justifyContent: "center",
  },
  label: {
    ...Typography.bodyLarge,
    fontSize: 13,
    fontStyle: "italic",
    color: Gray,
    marginBottom: 0,
  },
  input: {
    width: 80,
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
  disabledInput: {
    //backgroundColor: LightGray,
    color: Gray,
  },
});

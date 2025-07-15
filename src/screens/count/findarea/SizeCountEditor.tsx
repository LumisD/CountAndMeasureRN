import {StyleSheet, Text, TextInput, View} from "react-native";
import {CountIntent, SIZE_CHANGED} from "../CountIntent";
import {Black, Gray} from "../../../theme/colors";
import {Typography} from "../../../theme/typography";

type Props = {
  label: string;
  value: string;
  dimension: number;
  onSizeChanged: (intent: CountIntent) => void;
};

export const SizeCountEditor: React.FC<Props> = ({
  label,
  value,
  dimension,
  onSizeChanged,
}) => {
  const handleChange = (text: string) => {
    onSizeChanged({
      type: SIZE_CHANGED,
      newSizeAsString: text,
      dimension,
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
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 16,
    borderRadius: 4,
  },
});

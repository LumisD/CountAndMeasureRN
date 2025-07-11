import {StyleSheet, Text, TextInput, View} from "react-native";
import {CountIntent, SIZE_CHANGED} from "../CountIntent";
import {DarkGray, Gray} from "../../../theme/colors";
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
    width: 150,
    height: 70,
    justifyContent: "center",
  },
  label: {
    ...Typography.bodyLarge,
    fontSize: 14,
    color: Gray,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: DarkGray,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontSize: 16,
    backgroundColor: "transparent",
  },
});

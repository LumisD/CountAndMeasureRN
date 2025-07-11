import {Pressable} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type Props = {
  processIntent: () => void;
  contentDescription: string;
};

export const WhatIsIconButton: React.FC<Props> = ({
  processIntent,
  contentDescription,
}) => {
  return (
    <Pressable
      onPress={processIntent}
      accessibilityLabel={contentDescription}
      style={{
        width: 48,
        height: 48,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Icon name="help-circle-outline" size={36} color="#007AFF" />
    </Pressable>
  );
};

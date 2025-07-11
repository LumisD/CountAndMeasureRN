import {Pressable, StyleSheet, View} from "react-native";

type Props = {
  isEnabled: boolean;
  onDisabledClick: () => void;
  content: React.ReactNode;
};

export const DisabledOverlay: React.FC<Props> = ({
  isEnabled,
  onDisabledClick,
  content,
}) => {
  return (
    <View style={styles.container}>
      {content}
      {!isEnabled && (
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={onDisabledClick}
          android_ripple={{color: "transparent"}}>
          <View style={styles.overlay} />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
  },
  overlay: {
    flex: 1,
    backgroundColor: "transparent",
  },
});

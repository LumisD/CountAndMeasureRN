import React from "react";
import {View, Pressable, StyleSheet, Animated} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {DEFAULT_ICON_SIZE} from "../Constants";

interface ExpandHideFieldProps<T> {
  isAreaOpen: boolean;
  isRestoreIconShown: boolean;
  processIntent: (intent: T) => void;
  intentFactory: () => T;
  onShareClick: (intent: T) => void;
  shareFactory: () => T;
  onDeleteClick: (intent: T) => void;
  deleteFactory: () => T;
}

export function ExpandHideFieldInternal<T>({
  isAreaOpen,
  isRestoreIconShown,
  processIntent,
  intentFactory,
  onShareClick,
  shareFactory,
  onDeleteClick,
  deleteFactory,
}: ExpandHideFieldProps<T>) {
  const rotation = React.useRef(new Animated.Value(isAreaOpen ? 0 : 1)).current;

  React.useEffect(() => {
    Animated.timing(rotation, {
      toValue: isAreaOpen ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [isAreaOpen]);

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <View style={styles.row}>
      <Pressable
        onPress={() => onDeleteClick(deleteFactory())}
        style={[styles.iconWrapper, {opacity: 0.35}]}>
        <Icon
          name={isRestoreIconShown ? "restore" : "delete"}
          accessibilityLabel="Delete or Restore"
          size={DEFAULT_ICON_SIZE}
          color="black"
        />
      </Pressable>

      <Pressable
        onPress={() => processIntent(intentFactory())}
        style={styles.iconWrapper}>
        <Animated.View style={{transform: [{rotate: rotateInterpolate}]}}>
          <Icon name="chevron-up" size={48} color="black" />
        </Animated.View>
      </Pressable>

      <Pressable
        onPress={() => onShareClick(shareFactory())}
        style={[styles.iconWrapper, {opacity: 0.35}]}>
        <Icon name="share-variant" size={DEFAULT_ICON_SIZE} color="black" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 0,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
});

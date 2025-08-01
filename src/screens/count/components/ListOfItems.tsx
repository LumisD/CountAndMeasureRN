import {useTranslation} from "react-i18next";
import {
  CountIntent,
  LIST_SCROLLED_BY_USER,
  PRESS_ON_ITEM_IN_LIST,
} from "../CountIntent";
import {ChipboardUI} from "../models/ChipboardUI";
import {FlatList, Pressable, StyleSheet, Text, View} from "react-native";
import {
  Grayish,
  Greenish,
  PrimaryBlue,
  Purple80,
  Yellowish,
} from "../../../theme/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Typography} from "../../../theme/typography";
import {useEffect, useRef} from "react";

interface Props {
  chipboards: ChipboardUI[];
  hasColor: boolean;
  shouldScrollToTop: boolean;
  setShouldScrollToTop: React.Dispatch<React.SetStateAction<boolean>>;
  processIntent: (intent: CountIntent) => void;
}

export const ListOfItems: React.FC<Props> = ({
  chipboards,
  hasColor,
  shouldScrollToTop,
  setShouldScrollToTop,
  processIntent,
}) => {
  const {t} = useTranslation();

  const flatListRef = useRef<FlatList<ChipboardUI>>(null);
  const isProgrammaticScroll = useRef(false);

  useEffect(() => {
    if (shouldScrollToTop) {
      isProgrammaticScroll.current = true;
      flatListRef.current?.scrollToOffset({offset: 0, animated: true});
      setTimeout(() => {
        isProgrammaticScroll.current = false;
        setShouldScrollToTop(false);
      }, 500);
    }
  }, [shouldScrollToTop]);

  const handleScrollStart = () => {
    if (!isProgrammaticScroll.current) {
      processIntent({type: LIST_SCROLLED_BY_USER});
    }
  };

  return (
    <FlatList
      ref={flatListRef}
      data={chipboards}
      keyExtractor={item => item.id.toString()}
      ItemSeparatorComponent={() => (
        <View style={{height: 4, backgroundColor: Purple80}} />
      )}
      onScrollBeginDrag={handleScrollStart}
      renderItem={({item}) => {
        let backgroundColor = "transparent";
        if (item.isUnderReview) {
          backgroundColor = Yellowish;
        } else if (item.state === 2) {
          backgroundColor = Greenish;
        } else if (item.state === 1) {
          backgroundColor = Grayish;
        }

        return (
          <Pressable
            onPress={() =>
              processIntent({type: PRESS_ON_ITEM_IN_LIST, chipboard: item})
            }>
            <View style={[styles.row, {backgroundColor}]}>
              <View style={styles.innerRow}>
                <View style={styles.textBox}>
                  <Text
                    style={[
                      styles.chipboardText,
                      {
                        transform: [
                          {translateY: item.allRealsAsString ? -17 : -12},
                        ],
                      },
                    ]}>
                    {item.chipboardAsString}
                  </Text>

                  <Text style={styles.realSizes}>{item.allRealsAsString}</Text>

                  {item.isUnderReview && (
                    <Text style={styles.underReview}>{t("under_review")}</Text>
                  )}
                </View>

                {hasColor && (
                  <View
                    style={[styles.colorBox, {backgroundColor: item.color}]}
                  />
                )}
              </View>

              <View style={{width: 8}} />
              <IconAtTheEnd state={item.state} />
            </View>
          </Pressable>
        );
      }}
    />
  );
};

const IconAtTheEnd = ({state}: {state: number}) => {
  if (state === 1) {
    return (
      <Icon
        name="check"
        size={24}
        color={PrimaryBlue}
        style={{transform: [{scale: 1.3}]}}
      />
    );
  }
  if (state === 2) {
    return (
      <Icon
        name="alert-circle-outline"
        size={24}
        color={PrimaryBlue}
        style={{transform: [{scale: 1.3}]}}
      />
    );
  }
  return <View style={{width: 24, height: 24}} />;
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 0,
    justifyContent: "space-between",
  },
  innerRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  textBox: {
    flex: 1,
    justifyContent: "center",
    position: "relative",
    height: 50,
  },
  chipboardText: {
    ...Typography.bodyLarge,
    fontSize: 19,
    textAlign: "left",
    position: "absolute",
    top: "50%",
    left: 0,
    transform: [{translateY: -12}],
  },
  realSizes: {
    ...Typography.bodyNormal,
    color: "red",
    fontSize: 14,
    fontStyle: "italic",
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  underReview: {
    ...Typography.bodyLarge,
    color: "rgba(255,0,0,0.5)",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    borderWidth: 2,
    borderColor: "rgba(255,0,0,0.5)",
    borderRadius: 8,
    padding: 4,
    position: "absolute",
    left: "25%",
    transform: [{rotate: "-10deg"}],
  },
  colorBox: {
    width: 36,
    height: 42,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "black",
    marginLeft: 8,
  },
});

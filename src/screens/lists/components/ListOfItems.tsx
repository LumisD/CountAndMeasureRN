import {useTranslation} from "react-i18next";
import {UnionOfChipboardsUI} from "../../models/UnionOfChipboardsUI";
import {ListsIntent, PRESS_ON_ITEM_IN_LIST} from "../ListsIntent";
import {FlatList, Pressable, StyleSheet, Text, View} from "react-native";
import {Grayish, Purple80} from "../../../theme/colors";

export const ListOfItems: React.FC<{
  unions: UnionOfChipboardsUI[];
  processIntent: (intent: ListsIntent) => void;
}> = ({unions, processIntent}) => {
  const {t} = useTranslation();

  return (
    <FlatList
      data={unions}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={() => (
        <View style={{height: 4, backgroundColor: Purple80}} />
      )}
      renderItem={({item: union}) => {
        const backgroundColor = union.isFinished ? Grayish : "white";

        return (
          <Pressable
            onPress={() => processIntent({type: PRESS_ON_ITEM_IN_LIST, union})}
            style={[styles.itemWrapper, {backgroundColor}]}>
            <View style={styles.row}>
              <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
                {union.title}
              </Text>
            </View>

            {union.isFinished && (
              <Text style={styles.finishedText}>{t("finished")}</Text>
            )}

            {union.isMarkedAsDeleted && (
              <Text style={styles.markedAsDeletedText}>
                {t("marked_as_deleted")}
              </Text>
            )}
          </Pressable>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    width: "100%",
    height: 60,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
  },
  finishedText: {
    position: "absolute",
    bottom: 4,
    right: 16,
    color: "red",
    fontSize: 14,
  },
  markedAsDeletedText: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{translateX: -50}, {translateY: -12}, {rotate: "-10deg"}],
    color: "red",
    fontSize: 26,
    fontWeight: "900",
    textAlign: "center",
    borderWidth: 2,
    borderColor: "rgba(255,0,0,0.5)",
    borderRadius: 8,
    padding: 4,
  },
});

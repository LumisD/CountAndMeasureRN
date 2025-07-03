import React, {useEffect, useLayoutEffect, useMemo, useState} from "react";
import {View, StyleSheet, ScrollView} from "react-native";
import {StackScreenProps} from "@react-navigation/stack";
import {RootStackParamList} from "../../navigation/types";
import {Gray, MainBg} from "../../theme/colors";
import {Typography} from "../../theme/typography";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  AddNewItemIntent,
  BACK,
  CREATE_NEW_UNION_WITH_ITEM_TYPE,
  TITLE_OF_UNION_CHANGED,
} from "./AddNewItemIntent";
import {useStore} from "zustand";
import {createAddNewItemStore} from "./store/AddNewItemStore";
import {useRealm} from "../../data/db/RealmContext";
import {provideMeasureAndCountRepository} from "../../data/db/dao/provideRepository";
import {TextInput, Pressable, Text} from "react-native";
import {AddNewItemArea} from "./addnewitemarea/AddNewItemArea";
import {Snackbar} from "react-native-paper";
import {handleAddNewItemEffects} from "./store/handlers/handleAddNewItemEffects";
import {convertToNewScreenType} from "./store/handlers/convertToNewScreenType";

type Props = StackScreenProps<RootStackParamList, "AddNewItem">;

export default function AddNewItemScreen({navigation, route}: Props) {
  const {serializedItemType} = route.params;
  let itemType = convertToNewScreenType(serializedItemType);

  const realm = useRealm();
  const repo = useMemo(() => provideMeasureAndCountRepository(realm), [realm]);
  const store = useMemo(() => createAddNewItemStore(repo), [repo]);

  const state = useStore(store, s => s.state);
  const processIntent = useStore(store, s => s.processIntent);
  const currentEffect = useStore(store, s => s.currentEffect);
  const consumeEffect = useStore(store, s => s.consumeEffect);

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [shouldFlash, setShouldFlash] = useState(false);

  useEffect(() => {
    processIntent({type: CREATE_NEW_UNION_WITH_ITEM_TYPE, itemType: itemType});
  }, []);

  useEffect(() => {
    if (!currentEffect) return;

    handleAddNewItemEffects(
      currentEffect,
      setSnackbarMessage,
      setSnackbarVisible,
      setShouldFlash,
      navigation,
      processIntent,
    );

    consumeEffect();
  }, [currentEffect, consumeEffect]);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <TopBar
          title={state.unionOfChipboards.title}
          processIntent={processIntent}
        />
      ),
    });
  }, [navigation, state.unionOfChipboards.title, processIntent]);

  return (
    <>
      <View style={styles.container}>
        {state.isAddAreaOpen && itemType && (
          <AddNewItemArea
            itemType={itemType}
            state={state}
            shouldFlash={shouldFlash}
            setShouldFlash={setShouldFlash}
            processIntent={processIntent}
          />
        )}
        {/* <ExpandHideNewItemField
        isOpen={state.isAddAreaOpen}
        onToggle={() => processIntent({type: TOGGLE_ADD_AREA_VISIBILITY})}
      /> */}
        <View style={styles.flexListWrapper}>
          {/* <ListOfNewItems
          hasColor={state.unionOfChipboards.hasColor}
          items={state.createdChipboards}
          processIntent={processIntent}
        /> */}
        </View>
        <View style={{height: 8}} />
      </View>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}
        style={{borderRadius: 4}}>
        {snackbarMessage}
      </Snackbar>
    </>
  );
}

type TopBarProps = {
  title: string;
  processIntent: (intent: AddNewItemIntent) => void;
};

export function TopBar({title, processIntent}: TopBarProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        <Pressable onPress={() => processIntent({type: BACK})}>
          <Icon name="arrow-left" size={32} />
        </Pressable>
        <TextInput
          value={title}
          onChangeText={text =>
            processIntent({type: TITLE_OF_UNION_CHANGED, newTitle: text})
          }
          style={styles.input}
          placeholder="Title"
          multiline={true}
          numberOfLines={2}
          scrollEnabled={false}
        />
      </View>
      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    paddingHorizontal: 16,
    backgroundColor: MainBg,
  },
  flexListWrapper: {
    flex: 1,
  },
  wrapper: {
    backgroundColor: MainBg,
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 0,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 0,
  },
  input: {
    ...Typography.titleLarge,
    flex: 1,
    fontSize: 19,
    textAlign: "center",
    marginLeft: 16,
  },
  divider: {
    height: 2,
    backgroundColor: Gray,
    marginTop: 0,
    textAlignVertical: "top", // for multiline alignment on Android
  },
});

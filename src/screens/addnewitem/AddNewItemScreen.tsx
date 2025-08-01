import React, {useEffect, useLayoutEffect, useMemo, useState} from "react";
import {View, StyleSheet, ScrollView} from "react-native";
import {StackScreenProps} from "@react-navigation/stack";
import {RootStackParamList} from "../../navigation/types";
import {Gray, MainBg} from "../../theme/colors";
import {Typography} from "../../theme/typography";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  AddNewItemIntent,
  BACK,
  CLEANUP,
  START,
  TITLE_OF_UNION_CHANGED,
  TOGGLE_ADD_AREA_VISIBILITY,
} from "./AddNewItemIntent";
import {useStore} from "zustand";
import {createAddNewItemStore} from "./store/AddNewItemStore";
import {useRealm} from "../../data/db/RealmContext";
import {provideMeasureAndCountRepository} from "../../data/db/dao/provideRepository";
import {TextInput, Pressable, Text} from "react-native";
import {AddNewItemArea} from "./addnewitemarea/AddNewItemArea";
import {Snackbar} from "react-native-paper";
import {ExpandHideNewItemField} from "./components/ExpandHideNewItemField";
import {convertToNewScreenType} from "./handlers/convertToNewScreenType";
import {handleAddNewItemEffects} from "./handlers/handleAddNewItemEffects";
import {AnimatedExpandCollapse} from "../common/components/AnimatedExpandCollapse";
import {ListOfNewItems} from "./components/ListOfNewItems";

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
    processIntent({type: START, itemType: itemType});
    return () => {
      processIntent({type: CLEANUP});
    };
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
        {itemType && (
          <AnimatedExpandCollapse isVisible={state.isAddAreaOpen}>
            <AddNewItemArea
              itemType={itemType}
              state={state}
              shouldFlash={shouldFlash}
              setShouldFlash={setShouldFlash}
              processIntent={processIntent}
            />
          </AnimatedExpandCollapse>
        )}
        <ExpandHideNewItemField
          isAddAreaOpen={state.isAddAreaOpen}
          processIntent={processIntent}
        />
        <View style={styles.flexListWrapper}>
          <ListOfNewItems
            hasColor={state.unionOfChipboards.hasColor}
            chipboards={state.createdChipboards}
            processIntent={processIntent}
          />
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
    <SafeAreaView style={styles.wrapper} edges={['top']}>
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
    </SafeAreaView>
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
    marginBottom: 10,
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

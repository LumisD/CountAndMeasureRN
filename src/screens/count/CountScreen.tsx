import {StackScreenProps} from "@react-navigation/stack";
import React, {useEffect, useLayoutEffect, useMemo, useState} from "react";
import {View, StyleSheet, Pressable, TextInput} from "react-native";
import {RootStackParamList} from "../../navigation/types";
import {useRealm} from "../../data/db/RealmContext";
import {provideMeasureAndCountRepository} from "../../data/db/dao/provideRepository";
import {createCountStore} from "./store/CountStore";
import {useStore} from "zustand";
import {
  BACK,
  CLEANUP,
  CountIntent,
  SET_LIST_DONE,
  START,
  TITLE_OF_UNION_CHANGED,
} from "./CountIntent";
import {handleCountEffects} from "../addnewitem/handlers/handleCountEffect";
import {Typography} from "../../theme/typography";
import {Gray, MainBg} from "../../theme/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {t} from "i18next";
import {AnimatedExpandCollapse} from "../common/components/AnimatedExpandCollapse";
import {ExpandHideCountField} from "./components/ExpandHideCountField";
import {FindArea} from "./findarea/FindArea";
import {Snackbar} from "react-native-paper";
import {ListOfItems} from "./components/ListOfItems";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = StackScreenProps<RootStackParamList, "Count">;

export default function CountScreen({navigation, route}: Props) {
  const {unionId} = route.params;

  const realm = useRealm();
  const repo = useMemo(() => provideMeasureAndCountRepository(realm), [realm]);
  const store = useMemo(() => createCountStore(repo), [repo]);

  const state = useStore(store, s => s.state);
  const processIntent = useStore(store, s => s.processIntent);
  const currentEffect = useStore(store, s => s.currentEffect);
  const consumeEffect = useStore(store, s => s.consumeEffect);

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [shouldFlash, setShouldFlash] = useState(false);
  const [shouldScrollToTop, setShouldScrollToTop] = useState(false);

  useEffect(() => {
    processIntent({type: START, unionId: unionId});
    return () => {
      processIntent({type: CLEANUP});
    };
  }, []);

  useEffect(() => {
    if (!currentEffect) return;

    handleCountEffects(
      currentEffect,
      setSnackbarMessage,
      setSnackbarVisible,
      setShouldFlash,
      setShouldScrollToTop,
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
          isFinished={state.unionOfChipboards.isFinished}
          processIntent={processIntent}
        />
      ),
    });
  }, [
    navigation,
    state.unionOfChipboards.title,
    state.unionOfChipboards.isFinished,
    processIntent,
  ]);

  return (
    <>
      <View style={styles.container}>
        <AnimatedExpandCollapse isVisible={state.isFoundAreaOpen}>
          <FindArea
            state={state}
            shouldFlash={shouldFlash}
            setShouldFlash={setShouldFlash}
            processIntent={processIntent}
          />
        </AnimatedExpandCollapse>

        <ExpandHideCountField
          isFoundAreaOpen={state.isFoundAreaOpen}
          isRestoreIconShown={state.unionOfChipboards.isMarkedAsDeleted}
          processIntent={processIntent}
        />

        <View style={styles.flexListWrapper}>
          <ListOfItems
            hasColor={state.unionOfChipboards.hasColor}
            chipboards={state.chipboards}
            shouldScrollToTop={shouldScrollToTop}
            setShouldScrollToTop={setShouldScrollToTop}
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
  processIntent: (intent: CountIntent) => void;
  isFinished: boolean;
};

export function TopBar({title, isFinished, processIntent}: TopBarProps) {
  const iconName = isFinished ? "undo" : "check";
  const accessibilityLabel = isFinished ? t("undone") : t("done");
  return (
    <SafeAreaView style={styles.wrapper}>
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

        <Pressable
          onPress={() => processIntent({type: SET_LIST_DONE})}
          accessibilityLabel={accessibilityLabel}>
          <Icon name={iconName} size={32} />
        </Pressable>
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
    marginLeft: 0,
  },
  divider: {
    height: 2,
    backgroundColor: Gray,
    marginTop: 0,
    textAlignVertical: "top", // for multiline alignment on Android
  },
});

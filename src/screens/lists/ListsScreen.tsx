import {StackNavigationProp} from "@react-navigation/stack";
import {useNavigation} from "@react-navigation/native";
import {StyleSheet, Text, View} from "react-native";
import {useEffect, useLayoutEffect, useMemo} from "react";
import {RootStackParamList, TabsParamList} from "../../navigation/types";
import {useRealm} from "../../data/db/RealmContext";
import {provideMeasureAndCountRepository} from "../../data/db/dao/provideRepository";
import {BottomTabNavigationProp} from "@react-navigation/bottom-tabs";
import {createListsStore} from "./store/ListsStore";
import {useStore} from "zustand";
import {CLEANUP, START} from "./ListsIntent";
import {handleListsEffects} from "./store/handlers/handleListsEffect";
import {t} from "i18next";
import {Gray, MainBg} from "../../theme/colors";
import {EmptyList} from "./components/EmptyList";
import {ListOfItems} from "./components/ListOfItems";
import {Typography} from "../../theme/typography";

export default function ListsScreen() {
  const rootNavigation =
    useNavigation<StackNavigationProp<RootStackParamList>>();
  const tabNavigation = useNavigation<BottomTabNavigationProp<TabsParamList>>();

  const realm = useRealm();
  const repo = useMemo(() => provideMeasureAndCountRepository(realm), [realm]);
  const store = useMemo(() => createListsStore(repo), [repo]);

  const state = useStore(store, s => s.state);
  const processIntent = useStore(store, s => s.processIntent);
  const currentEffect = useStore(store, s => s.currentEffect);
  const consumeEffect = useStore(store, s => s.consumeEffect);

  useEffect(() => {
    processIntent({type: START});
    return () => {
      processIntent({type: CLEANUP});
    };
  }, []);

  useEffect(() => {
    if (!currentEffect) return;
    handleListsEffects(currentEffect, rootNavigation);

    consumeEffect();
  }, [currentEffect, consumeEffect]);

  useLayoutEffect(() => {
    tabNavigation.setOptions({
      header: () => <TopBar title={t("chipboard_sheet_list")} />,
    });
  }, [tabNavigation]);

  return state.listOfUnions.length === 0 ? (
    <EmptyList />
  ) : (
    <View style={styles.container}>
      <ListOfItems unions={state.listOfUnions} processIntent={processIntent} />
    </View>
  );
}

type TopBarProps = {
  title: string;
};

export function TopBar({title}: TopBarProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        <Text style={styles.input}>{title}</Text>
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

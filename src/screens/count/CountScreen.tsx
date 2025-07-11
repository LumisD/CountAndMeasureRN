import {StackScreenProps} from "@react-navigation/stack";
import React, {useEffect, useMemo, useState} from "react";
import {View, Text} from "react-native";
import {RootStackParamList} from "../../navigation/types";
import {useRealm} from "../../data/db/RealmContext";
import {provideMeasureAndCountRepository} from "../../data/db/dao/provideRepository";
import {createCountStore} from "./store/CountStore";
import {useStore} from "zustand";
import {CLEANUP, START} from "./CountIntent";
import {handleCountffects} from "../addnewitem/handlers/handleCountEffect";

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

  useEffect(() => {
    processIntent({type: START, unionId: unionId});
    return () => {
      processIntent({type: CLEANUP});
    };
  }, []);

  useEffect(() => {
    if (!currentEffect) return;

    handleCountffects(
      currentEffect,
      setSnackbarMessage,
      setSnackbarVisible,
      setShouldFlash,
      navigation,
      processIntent,
    );

    consumeEffect();
  }, [currentEffect, consumeEffect]);

  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <Text>Count Screen</Text>
    </View>
  );
}

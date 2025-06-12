import React, {useEffect, useLayoutEffect, useMemo} from "react";
import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
  Pressable,
  TextInput,
} from "react-native";
import {StackScreenProps} from "@react-navigation/stack";
import {RootStackParamList} from "../../navigation/types";
import {NewScreenType} from "../models/NewScreenType";
import {Gray, MainBg} from "../../theme/colors";
import {Typography} from "../../theme/typography";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {AddNewItemIntent} from "./AddNewItemIntent";
import {useStore} from "zustand";
import {createAddNewItemStore} from "./AddNewItemStore";
import {useRealm} from "../../data/db/RealmContext";
import {provideMeasureAndCountRepository} from "../../data/db/dao/provideRepository";

type Props = StackScreenProps<RootStackParamList, "AddNewItem">;

export default function AddNewItemScreen({navigation, route}: Props) {
  const {serializedItemType} = route.params;
  console.log("AddNewItemScreen serializedItemType: ", serializedItemType);
  //Todo: later move to store all this logic
  let parsed: unknown;
  let itemType: NewScreenType | null = null;

  try {
    parsed = JSON.parse(serializedItemType);
    if (isValidNewScreenType(parsed)) {
      itemType = parsed;
    } else {
      console.warn("Parsed object is not a valid NewScreenType", parsed);
    }
  } catch (e) {
    console.error("Failed to parse serializedItemType", e);
  }

  const realm = useRealm();
  const repo = useMemo(() => provideMeasureAndCountRepository(realm), [realm]);
  const store = useMemo(() => createAddNewItemStore(repo), [repo]);

  // Access the store values
  const state = useStore(store, s => s.state);
  const processIntent = useStore(store, s => s.processIntent);
  const currentEffect = useStore(store, s => s.currentEffect);
  const consumeEffect = useStore(store, s => s.consumeEffect);

  useEffect(() => {
    processIntent({type: "CreateNewUnion"});
  }, []);

  // Handle one-time effects
  useEffect(() => {
    if (!currentEffect) return;

    switch (currentEffect.type) {
      case "ShowSnackbar":
        Alert.alert("Snackbar", currentEffect.message);
        break;
      case "NavigateBack":
        Alert.alert("Navigation", "Should navigate back");
        break;
      default:
        Alert.alert("Unhandled effect", currentEffect.type);
        break;
    }

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
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <Text>Add New Item Screen</Text>

      <Text style={{marginTop: 10}}>
        Add area is {state.isAddAreaOpen ? "open" : "closed"}
      </Text>

      <Button
        title="Toggle Add Area"
        onPress={() => processIntent({type: "ToggleAddAreaVisibility"})}
      />

      <Button
        title="Back"
        onPress={() => processIntent({type: "Back"})}
        color="darkred"
      />
    </View>
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
        <Pressable onPress={() => processIntent({type: "Back"})}>
          <Icon name="arrow-left" size={32} />
        </Pressable>
        <TextInput
          value={title}
          onChangeText={text =>
            processIntent({type: "TitleOfUnionChanged", newTitle: text})
          }
          style={styles.input}
          placeholder="Title"
          multiline={true}
          numberOfLines={2}
          selection={{start: 0, end: 0}}
          scrollEnabled={false} // optional, disable horizontal scroll
        />
      </View>
      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
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

function isValidNewScreenType(obj: any): obj is NewScreenType {
  //todo: later move to store
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.hasColor === "boolean" &&
    typeof obj.directionColumn === "number" &&
    Array.isArray(obj.columnNames) &&
    obj.columnNames.every((el: unknown) => typeof el === "string")
  );
}

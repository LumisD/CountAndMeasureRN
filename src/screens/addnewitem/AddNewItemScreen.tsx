import React, {useEffect, useLayoutEffect, useMemo, useState} from "react";
import {View, Alert, StyleSheet, ScrollView} from "react-native";
import {StackScreenProps} from "@react-navigation/stack";
import {RootStackParamList} from "../../navigation/types";
import {NewScreenType} from "../models/NewScreenType";
import {Gray, MainBg} from "../../theme/colors";
import {Typography} from "../../theme/typography";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  AddNewItemIntent,
  BACK,
  CREATE_NEW_UNION_WITH_ITEM_TYPE,
  DELETE_CHIPBOARD_CONFIRMED,
  DELETING_UNION_CONFIRMED,
  EDIT_CHIPBOARD_CONFIRMED,
  SHARING_UNION_CONFIRMED,
  TITLE_OF_UNION_CHANGED,
} from "./AddNewItemIntent";
import {useStore} from "zustand";
import {createAddNewItemStore} from "./store/AddNewItemStore";
import {useRealm} from "../../data/db/RealmContext";
import {provideMeasureAndCountRepository} from "../../data/db/dao/provideRepository";
import {TextInput, Pressable, Text} from "react-native";
import {AddNewItemArea} from "./addnewitemarea/AddNewItemArea";
import {
  FLASH_ADD_ITEM_AREA,
  NAVIGATE_BACK,
  SHARE_UNION,
  SHOW_DELETE_CONFIRMATION_DIALOG,
  SHOW_EDIT_CONFIRMATION_DIALOG,
  SHOW_REMOVE_UNION_DIALOG,
  SHOW_SHARE_UNION_DIALOG,
  SHOW_SNACKBAR,
} from "./AddNewItemEffect";
import {Snackbar} from "react-native-paper";
import {showAlert} from "../common/showAlert";
import {t} from "i18next";
import {shareUnion} from "../common/shareUnion";

type Props = StackScreenProps<RootStackParamList, "AddNewItem">;

export default function AddNewItemScreen({navigation, route}: Props) {
  const {serializedItemType} = route.params;
  console.log("MaC AddNewItemScreen serializedItemType: ", serializedItemType);

  let parsed: unknown;
  let itemType: NewScreenType | null = null;

  try {
    parsed = JSON.parse(serializedItemType);
    if (isValidNewScreenType(parsed)) {
      itemType = parsed;
    } else {
      console.warn("MaC Parsed object is not a valid NewScreenType", parsed);
    }
  } catch (e) {
    console.error("MaC Failed to parse serializedItemType", e);
  }

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

    switch (currentEffect.type) {
      case SHOW_SNACKBAR:
        setSnackbarMessage(currentEffect.message);
        setSnackbarVisible(true);
        break;

      case SHOW_DELETE_CONFIRMATION_DIALOG: {
        const title = t("confirm_deletion");

        const message = currentEffect.hasColor
          ? t("are_you_sure_delete_with_color", {
              chipboardAsString: currentEffect.chipboard.chipboardAsString,
              colorName: currentEffect.chipboard.colorName,
            })
          : t("are_you_sure_delete_no_color", {
              chipboardAsString: currentEffect.chipboard.chipboardAsString,
            });

        const confirmText = t("delete");
        const dismissText = t("cancel");

        showAlert({
          title,
          message,
          confirmText,
          dismissText,
          onConfirm: () => {
            processIntent({
              type: DELETE_CHIPBOARD_CONFIRMED,
              chipboardId: currentEffect.chipboard.id,
            });
          },
        });

        break;
      }

      case SHOW_EDIT_CONFIRMATION_DIALOG: {
        const {chipboard, hasColor} = currentEffect;

        const title = t("confirm_editing");
        const text = hasColor
          ? t("are_you_sure_edit_with_color", {
              chipboard: chipboard.chipboardAsString,
              color: chipboard.colorName,
            })
          : t("are_you_sure_edit_no_color", {
              chipboard: chipboard.chipboardAsString,
            });

        const confirmText = t("edit");
        const dismissText = t("cancel");

        showAlert({
          title,
          message: text,
          confirmText,
          dismissText,
          onConfirm: () => {
            processIntent({type: EDIT_CHIPBOARD_CONFIRMED, chipboard});
          },
        });

        break;
      }

      case SHOW_REMOVE_UNION_DIALOG: {
        const title = t("confirm_deletion");
        const message = t("are_you_sure_delete_current_list_chipboards");
        const confirmText = t("delete");
        const dismissText = t("cancel");

        showAlert({
          title,
          message,
          confirmText,
          dismissText,
          onConfirm: () => {
            processIntent({type: DELETING_UNION_CONFIRMED});
          },
        });

        break;
      }

      case SHOW_SHARE_UNION_DIALOG: {
        const title = t("confirm_sharing");
        const message = t("are_you_sure_share_current_list_chipboards");
        const confirmText = t("share");
        const dismissText = t("cancel");

        showAlert({
          title,
          message,
          confirmText,
          dismissText,
          onConfirm: () => {
            processIntent({type: SHARING_UNION_CONFIRMED});
          },
        });

        break;
      }

      case FLASH_ADD_ITEM_AREA:
        setShouldFlash(true);
        break;

      case SHARE_UNION:
        shareUnion(currentEffect.shareIntent).catch(e =>
          console.warn("MaC AddNewItemScreen Failed to share:", e),
        );
        break;

      case NAVIGATE_BACK:
        navigation.goBack();
        break;

      default:
        console.warn("MaC AddNewItemScreen Unhandled effect:", currentEffect);
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

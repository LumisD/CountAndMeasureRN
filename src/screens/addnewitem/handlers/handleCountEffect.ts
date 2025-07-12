import {t} from "i18next";
import {showAlert} from "../../common/showAlert";
import {shareUnion} from "../../common/shareUnion";
import {
  CountEffect,
  FLASH_AND_SCROLL,
  FLASH_FIND_ITEM_AREA,
  HIDE_KEYBOARD,
  NAVIGATE_BACK,
  NAVIGATE_TO_LISTS_SCREEN,
  NAVIGATE_TO_NEW_SCREEN,
  SCROLL_TO_TOP,
  SHARE_UNION,
  SHOW_DELETE_UNION_DIALOG,
  SHOW_FIELD_DISABLED,
  SHOW_NOT_EXCEEDING_TARGET_QUANTITY_DIALOG,
  SHOW_REMOVE_NOT_FOUND_FROM_FIND_AREA_CONFIRMATION_DIALOG,
  SHOW_RESTORE_UNION_DIALOG,
  SHOW_SELECT_NOT_FOUND_TO_FIND_AREA_CONFIRMATION_DIALOG,
  SHOW_SELECT_UNKNOWN_TO_FIND_AREA_CONFIRMATION_DIALOG,
  SHOW_SHARE_UNION_DIALOG,
  SHOW_SNACKBAR,
  SHOW_UNCHECK_CONFIRMATION_DIALOG,
  SHOW_WHAT_IS_FOUND_DIALOG,
  SHOW_WHAT_IS_REAL_SIZE_DIALOG,
  SHOW_WHAT_IS_UNKNOWN_DIALOG,
} from "../../count/CountEffect";
import {
  CountIntent,
  DELETING_UNION_CONFIRMED,
  REMOVE_NOT_FOUND_FROM_FIND_AREA_CONFIRMED,
  RESTORING_UNION_CONFIRMED,
  SELECT_NOT_FOUND_TO_FIND_AREA_CONFIRMED,
  SELECT_UNKNOWN_TO_FIND_AREA_CONFIRMED,
  SHARING_UNION_CONFIRMED,
  UNCHECK_CHIPBOARD_CONFIRMED,
} from "../../count/CountIntent";
import {hideKeyboard} from "../../common/components/UiElements";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList, SCREENS} from "../../../navigation/types";

export function handleCountEffects(
  currentEffect: CountEffect,
  setSnackbarMessage: React.Dispatch<React.SetStateAction<string>>,
  setSnackbarVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setShouldFlash: React.Dispatch<React.SetStateAction<boolean>>,
  navigation: StackNavigationProp<RootStackParamList>,
  processIntent: (intent: CountIntent) => void,
) {
  switch (currentEffect.type) {
    case SHOW_SNACKBAR:
      setSnackbarMessage(currentEffect.message);
      setSnackbarVisible(true);
      break;

    case SHOW_UNCHECK_CONFIRMATION_DIALOG: {
      const {chipboard, hasColor} = currentEffect;
      const title = t("confirm_uncheck");

      const message = hasColor
        ? t("are_you_sure_uncheck_with_color", {
            chipboardAsString: chipboard.chipboardAsString,
            colorName: chipboard.colorName,
          })
        : t("are_you_sure_uncheck_no_color", {
            chipboardAsString: chipboard.chipboardAsString,
          });

      const confirmText = t("uncheck");
      const dismissText = t("cancel");

      showAlert({
        title,
        message,
        confirmText,
        dismissText,
        onConfirm: () => {
          processIntent({
            type: UNCHECK_CHIPBOARD_CONFIRMED,
            chipboard: chipboard,
          });
        },
      });

      break;
    }

    case SHOW_SELECT_NOT_FOUND_TO_FIND_AREA_CONFIRMATION_DIALOG: {
      const {chipboard, hasColor} = currentEffect;
      const title = t("confirm_selection");

      const message = hasColor
        ? t("are_you_sure_select_not_found_with_color", {
            chipboardAsString: chipboard.chipboardAsString,
            colorName: chipboard.colorName,
          })
        : t("are_you_sure_select_not_found_no_color", {
            chipboardAsString: chipboard.chipboardAsString,
          });

      const confirmText = t("uncheck");
      const dismissText = t("cancel");

      showAlert({
        title,
        message,
        confirmText,
        dismissText,
        onConfirm: () => {
          processIntent({
            type: SELECT_NOT_FOUND_TO_FIND_AREA_CONFIRMED,
            chipboard: chipboard,
          });
        },
      });

      break;
    }

    case SHOW_REMOVE_NOT_FOUND_FROM_FIND_AREA_CONFIRMATION_DIALOG: {
      const {chipboard, hasColor} = currentEffect;
      const title = t("confirm_selection");

      const message = hasColor
        ? t("are_you_sure_remove_not_found_with_color", {
            chipboardAsString: chipboard.chipboardAsString,
            colorName: chipboard.colorName,
          })
        : t("are_you_sure_remove_not_found_no_color", {
            chipboardAsString: chipboard.chipboardAsString,
          });

      const confirmText = t("remove");
      const dismissText = t("cancel");

      showAlert({
        title,
        message,
        confirmText,
        dismissText,
        onConfirm: () => {
          processIntent({
            type: REMOVE_NOT_FOUND_FROM_FIND_AREA_CONFIRMED,
            chipboard: chipboard,
          });
        },
      });

      break;
    }

    case SHOW_SELECT_UNKNOWN_TO_FIND_AREA_CONFIRMATION_DIALOG: {
      const {chipboard, hasColor} = currentEffect;
      const title = t("confirm_selection");

      const message = hasColor
        ? t("are_you_sure_select_unknown_with_color", {
            chipboardAsString: chipboard.chipboardAsString,
            colorName: chipboard.colorName,
          })
        : t("are_you_sure_select_unknown_no_color", {
            chipboardAsString: chipboard.chipboardAsString,
          });

      const confirmText = t("select");
      const dismissText = t("cancel");

      showAlert({
        title,
        message,
        confirmText,
        dismissText,
        onConfirm: () => {
          processIntent({
            type: SELECT_UNKNOWN_TO_FIND_AREA_CONFIRMED,
            chipboard: chipboard,
          });
        },
      });

      break;
    }

    case SHOW_NOT_EXCEEDING_TARGET_QUANTITY_DIALOG: {
      const {targetQuantity, enteredQuantity} = currentEffect;
      const title = t("not_exceeding_target_quantity");

      const message = t("not_exceeding_target_quantity_explanation", {
        enteredQty: enteredQuantity,
        targetQty: targetQuantity,
      });

      const confirmText = t("ok");

      showAlert({
        title,
        message,
        confirmText: confirmText,
      });

      break;
    }

    case SHOW_WHAT_IS_FOUND_DIALOG:
    case SHOW_WHAT_IS_UNKNOWN_DIALOG:
    case SHOW_WHAT_IS_REAL_SIZE_DIALOG: {
      const title = t("what_is");

      let message = "";

      switch (currentEffect.type) {
        case SHOW_WHAT_IS_FOUND_DIALOG:
          message = t("what_is_found");
          break;
        case SHOW_WHAT_IS_UNKNOWN_DIALOG:
          message = t("what_is_unknown");
          break;
        default: // SHOW_WHAT_IS_REAL_SIZE_DIALOG or any other
          message = t("what_is_difference");
          break;
      }

      const confirmText = t("ok");

      showAlert({
        title,
        message,
        confirmText: confirmText,
      });

      break;
    }

    case SHOW_DELETE_UNION_DIALOG: {
      const title = t("confirm_deletion");
      const message = t("are_you_sure_delete_current_list_chipboards");
      const confirmText = t("delete");
      const dismissText = t("cancel");

      showAlert({
        title,
        message,
        confirmText: confirmText,
        dismissText: dismissText,
        onConfirm: () => {
          processIntent({type: DELETING_UNION_CONFIRMED});
        },
      });

      break;
    }

    case SHOW_RESTORE_UNION_DIALOG: {
      const title = t("confirm_restoring");
      const message = t("are_you_sure_restore_current_list_chipboards");
      const confirmText = t("restore");
      const dismissText = t("cancel");

      showAlert({
        title,
        message,
        confirmText: confirmText,
        dismissText: dismissText,
        onConfirm: () => {
          processIntent({type: RESTORING_UNION_CONFIRMED});
        },
      });

      break;
    }

    case SHOW_FIELD_DISABLED: {
      const title = t("field_disabled");
      const message = t("disabled_explanation");
      const confirmText = t("ok");

      showAlert({
        title,
        message,
        confirmText: confirmText,
      });

      break;
    }

    case FLASH_FIND_ITEM_AREA:
      setShouldFlash(true);
      break;

    case FLASH_AND_SCROLL: {
      setShouldFlash(true);
      //listState.animateScrollToItem(0) - TODO: fix later
      break;
    }

    case SCROLL_TO_TOP: {
      //listState.animateScrollToItem(0) - TODO: fix later
      break;
    }

    case HIDE_KEYBOARD: {
      hideKeyboard();
      break;
    }

    case NAVIGATE_TO_LISTS_SCREEN: {
      navigation.navigate(SCREENS.Tabs, {
        screen: SCREENS.Lists,
      });
    }

    case NAVIGATE_TO_NEW_SCREEN: {
      navigation.navigate(SCREENS.Tabs, {
        screen: SCREENS.New,
      });
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

    case FLASH_FIND_ITEM_AREA:
      setShouldFlash(true);
      break;

    case SHARE_UNION:
      shareUnion(currentEffect.shareIntent).catch(e =>
        console.warn("MaC handleCountffects Failed to share:", e),
      );
      break;

    case NAVIGATE_BACK:
      navigation.goBack();
      break;

    default:
      console.warn("MaC handleCountffects Unhandled effect:", currentEffect);
      break;
  }
}

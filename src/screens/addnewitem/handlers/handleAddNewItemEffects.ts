import {t} from "i18next";
import {
  AddNewItemEffect,
  FLASH_ADD_ITEM_AREA,
  NAVIGATE_BACK,
  SHARE_UNION,
  SHOW_DELETE_CONFIRMATION_DIALOG,
  SHOW_EDIT_CONFIRMATION_DIALOG,
  SHOW_REMOVE_UNION_DIALOG,
  SHOW_SHARE_UNION_DIALOG,
  SHOW_SNACKBAR,
} from "../AddNewItemEffect";
import {AddNewItemIntent} from "../AddNewItemIntent";
import {
  DELETE_CHIPBOARD_CONFIRMED,
  DELETING_UNION_CONFIRMED,
  EDIT_CHIPBOARD_CONFIRMED,
  SHARING_UNION_CONFIRMED,
} from "../AddNewItemIntent";
import {showAlert} from "../../common/showAlert";
import {shareUnion} from "../../common/shareUnion";

export function handleAddNewItemEffects(
  currentEffect: AddNewItemEffect,
  setSnackbarMessage: React.Dispatch<React.SetStateAction<string>>,
  setSnackbarVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setShouldFlash: React.Dispatch<React.SetStateAction<boolean>>,
  navigation: {goBack: () => void},
  processIntent: (intent: AddNewItemIntent) => void,
) {
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
            value: currentEffect.chipboard.chipboardAsString,
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
        console.warn("MaC handleAddNewItemEffects Failed to share:", e),
      );
      break;

    case NAVIGATE_BACK:
      navigation.goBack();
      break;

    default:
      console.warn(
        "MaC handleAddNewItemEffects Unhandled effect:",
        currentEffect,
      );
      break;
  }
}

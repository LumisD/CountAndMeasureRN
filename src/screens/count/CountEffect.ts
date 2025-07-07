import {PlatformShareIntent} from "../common/shareUnion";
import {ChipboardUI} from "./models/ChipboardUI";

export const SHOW_UNCHECK_CONFIRMATION_DIALOG =
  "ShowUncheckConfirmationDialog" as const;
export const SHOW_SELECT_NOT_FOUND_TO_FIND_AREA_CONFIRMATION_DIALOG =
  "ShowSelectNotFoundToFindAreaConfirmationDialog" as const;
export const SHOW_REMOVE_NOT_FOUND_FROM_FIND_AREA_CONFIRMATION_DIALOG =
  "ShowRemoveNotFoundFromFindAreaConfirmationDialog" as const;
export const SHOW_SELECT_UNKNOWN_TO_FIND_AREA_CONFIRMATION_DIALOG =
  "ShowSelectUnknownToFindAreaConfirmationDialog" as const;
export const SHOW_NOT_EXCEEDING_TARGET_QUANTITY_DIALOG =
  "ShowNotExceedingTargetQuantityDialog" as const;
export const SHOW_WHAT_IS_DIALOG = "ShowWhatIsDialog" as const;
export const SHOW_SNACKBAR = "ShowSnackbar" as const;
export const SHOW_DELETE_UNION_DIALOG = "ShowDeleteUnionDialog" as const;
export const SHOW_RESTORE_UNION_DIALOG = "ShowRestoreUnionDialog" as const;
export const SHOW_SHARE_UNION_DIALOG = "ShowShareUnionDialog" as const;
export const SHOW_FIELD_DISABLED = "ShowFieldDisabled" as const;
export const FLASH_FIND_ITEM_AREA = "FlashFindItemArea" as const;
export const SCROLL_TO_TOP = "ScrollToTop" as const;
export const SHARE_UNION = "ShareUnion" as const;
export const HIDE_KEYBOARD = "HideKeyboard" as const;
export const NAVIGATE_TO_LISTS_SCREEN = "NavigateToListsScreen" as const;
export const NAVIGATE_TO_NEW_SCREEN = "NavigateToNewScreen" as const;
export const NAVIGATE_BACK = "NavigateBack" as const;

export type CountEffect =
  | {type: typeof SHOW_UNCHECK_CONFIRMATION_DIALOG; chipboard: ChipboardUI}
  | {
      type: typeof SHOW_SELECT_NOT_FOUND_TO_FIND_AREA_CONFIRMATION_DIALOG;
      chipboard: ChipboardUI;
    }
  | {
      type: typeof SHOW_REMOVE_NOT_FOUND_FROM_FIND_AREA_CONFIRMATION_DIALOG;
      chipboard: ChipboardUI;
    }
  | {
      type: typeof SHOW_SELECT_UNKNOWN_TO_FIND_AREA_CONFIRMATION_DIALOG;
      chipboard: ChipboardUI;
    }
  | {
      type: typeof SHOW_NOT_EXCEEDING_TARGET_QUANTITY_DIALOG;
      targetQuantity: number;
      enteredQuantity: number;
    }
  | {type: typeof SHOW_WHAT_IS_DIALOG; questionType: unknown}
  | {type: typeof SHOW_SNACKBAR; message: string}
  | {type: typeof SHOW_DELETE_UNION_DIALOG}
  | {type: typeof SHOW_RESTORE_UNION_DIALOG}
  | {type: typeof SHOW_SHARE_UNION_DIALOG}
  | {type: typeof SHOW_FIELD_DISABLED}
  | {type: typeof FLASH_FIND_ITEM_AREA}
  | {type: typeof SCROLL_TO_TOP}
  | {type: typeof SHARE_UNION; shareIntent: PlatformShareIntent}
  | {type: typeof HIDE_KEYBOARD}
  | {type: typeof NAVIGATE_TO_LISTS_SCREEN}
  | {type: typeof NAVIGATE_TO_NEW_SCREEN}
  | {type: typeof NAVIGATE_BACK};

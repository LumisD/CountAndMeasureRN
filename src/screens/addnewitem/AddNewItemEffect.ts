import {ChipboardUI} from "./models/ChipboardUI";

export const CREATE_NEW_UNION_EFFECT = "CreateNewUnion";
export const SHOW_DELETE_CONFIRMATION_DIALOG = "ShowDeleteConfirmationDialog";
export const SHOW_EDIT_CONFIRMATION_DIALOG = "ShowEditConfirmationDialog";
export const SHOW_SNACKBAR = "ShowSnackbar";
export const SHOW_REMOVE_UNION_DIALOG = "ShowRemoveUnionDialog";
export const SHOW_SHARE_UNION_DIALOG = "ShowShareUnionDialog";
export const FLASH_ADD_ITEM_AREA = "FlashAddItemArea";
export const SHARE_UNION = "ShareUnion";
export const NAVIGATE_BACK = "NavigateBack";

type AndroidShareIntent = {
  action: "ACTION_SEND";
  extras: {
    EXTRA_TEXT: string;
    EXTRA_SUBJECT: string;
  };
  type: "text/plain";
  chooserTitle: string;
};

type IOSShareIntent = {
  message: string;
  title: string;
  subject: string;
};

export type PlatformShareIntent = AndroidShareIntent | IOSShareIntent;

export type AddNewItemEffect =
  | {type: typeof CREATE_NEW_UNION_EFFECT}
  | {
      type: typeof SHOW_DELETE_CONFIRMATION_DIALOG;
      chipboard: ChipboardUI;
      hasColor: boolean;
    }
  | {
      type: typeof SHOW_EDIT_CONFIRMATION_DIALOG;
      chipboard: ChipboardUI;
      hasColor: boolean;
    }
  | {type: typeof SHOW_SNACKBAR; message: string}
  | {type: typeof SHOW_REMOVE_UNION_DIALOG}
  | {type: typeof SHOW_SHARE_UNION_DIALOG}
  | {type: typeof FLASH_ADD_ITEM_AREA}
  | {type: typeof SHARE_UNION; shareIntent: PlatformShareIntent}
  | {type: typeof NAVIGATE_BACK};

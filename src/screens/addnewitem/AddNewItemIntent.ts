import {NewScreenType} from "../models/NewScreenType";
import {ChipboardUI} from "./models/ChipboardUI";

// Handled in handleAddNewItemIntent
export const CREATE_NEW_UNION_WITH_ITEM_TYPE =
  "CreateNewUnionSetItemType" as const;
export const TITLE_OF_UNION_CHANGED = "TitleOfUnionChanged" as const;
export const PRESS_TO_DELETE_UNION = "PressToDeleteUnion" as const;
export const DELETING_UNION_CONFIRMED = "DeletingUnionConfirmed" as const;
export const SIZE_CHANGED = "SizeChanged" as const;
export const COLOR_CHANGED = "ColorChanged" as const;
export const QUANTITY_CHANGED = "QuantityChanged" as const;
export const ADD_CHIPBOARD_TO_DB = "AddChipboardToDb" as const;
export const PRESS_TO_SHARE_UNION = "PressToShareUnion" as const;
export const EDIT_CHIPBOARD_CONFIRMED = "EditChipboardConfirmed" as const;
export const DELETE_CHIPBOARD_CONFIRMED = "DeleteChipboardConfirmed" as const;
export const SHARING_UNION_CONFIRMED = "SharingUnionConfirmed" as const;
export const HANDLE_SCREEN_EXIT = "HandleScreenExit" as const;

// Handled in reducer
export const TOGGLE_ADD_AREA_VISIBILITY = "ToggleAddAreaVisibility" as const;
export const ASK_EDIT_CHIPBOARD = "AskEditChipboard" as const;
export const ASK_DELETE_CHIPBOARD = "AskDeleteChipboard" as const;
export const BACK = "Back" as const;

export type AddNewItemIntent =
  | {
      type: typeof CREATE_NEW_UNION_WITH_ITEM_TYPE;
      itemType: NewScreenType | null;
    }
  | {type: typeof TITLE_OF_UNION_CHANGED; newTitle: string}
  | {type: typeof SIZE_CHANGED; newSizeAsString: string; dimension: number}
  | {type: typeof QUANTITY_CHANGED; newQuantityAsString: string}
  | {type: typeof COLOR_CHANGED; newColorName: string; newColor: string}
  | {type: typeof ASK_EDIT_CHIPBOARD; chipboard: ChipboardUI}
  | {type: typeof EDIT_CHIPBOARD_CONFIRMED; chipboard: ChipboardUI}
  | {type: typeof ASK_DELETE_CHIPBOARD; chipboard: ChipboardUI}
  | {type: typeof DELETE_CHIPBOARD_CONFIRMED; chipboardId: string}
  | {type: typeof SHARING_UNION_CONFIRMED}
  | {type: typeof DELETING_UNION_CONFIRMED}
  | {type: typeof PRESS_TO_SHARE_UNION}
  | {type: typeof PRESS_TO_DELETE_UNION}
  | {type: typeof ADD_CHIPBOARD_TO_DB}
  | {type: typeof TOGGLE_ADD_AREA_VISIBILITY}
  | {type: typeof HANDLE_SCREEN_EXIT}
  | {type: typeof BACK};

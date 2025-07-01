import {NewScreenType} from "../models/NewScreenType";
import {ChipboardUI} from "./models/ChipboardUI";

// Handled in handleAddNewItemIntent
export const CREATE_NEW_UNION = "CreateNewUnion";
export const SET_ITEM_TYPE = "SetItemType";
export const TITLE_OF_UNION_CHANGED = "TitleOfUnionChanged";
export const PRESS_TO_DELETE_UNION = "PressToDeleteUnion";
export const DELETING_UNION_CONFIRMED = "DeletingUnionConfirmed";
export const SIZE_CHANGED = "SizeChanged";
export const COLOR_CHANGED = "ColorChanged";
export const QUANTITY_CHANGED = "QuantityChanged";
export const ADD_CHIPBOARD_TO_DB = "AddChipboardToDb";
export const PRESS_TO_SHARE_UNION = "PressToShareUnion";
export const EDIT_CHIPBOARD_CONFIRMED = "EditChipboardConfirmed";
export const DELETE_CHIPBOARD_CONFIRMED = "DeleteChipboardConfirmed";
export const SHARING_UNION_CONFIRMED = "SharingUnionConfirmed";
export const HANDLE_SCREEN_EXIT = "HandleScreenExit";

// Handled in reducer
export const TOGGLE_ADD_AREA_VISIBILITY = "ToggleAddAreaVisibility";
export const ASK_EDIT_CHIPBOARD = "AskEditChipboard";
export const ASK_DELETE_CHIPBOARD = "AskDeleteChipboard";
export const BACK = "Back";

export type AddNewItemIntent =
  | {type: typeof CREATE_NEW_UNION}
  | {type: typeof SET_ITEM_TYPE; itemType: NewScreenType | null}
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

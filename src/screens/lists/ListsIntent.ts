import {UnionOfChipboardsUI} from "../models/UnionOfChipboardsUI";

// Handled in handleAddNewItemIntent
export const START = "GetUnions" as const;
export const CLEANUP = "Cleanup" as const;
// Handled in reducer
export const PRESS_ON_ITEM_IN_LIST = "PressOnItemList";

export type ListsIntent =
  | {type: typeof START}
  | {type: typeof CLEANUP}
  | {type: typeof PRESS_ON_ITEM_IN_LIST; union: UnionOfChipboardsUI};

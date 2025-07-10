import {ChipboardUI} from "./models/ChipboardUI";

// Handled in handleAddNewItemIntent
export const START = "SetUnionId" as const;
export const CLEANUP = "Cleanup" as const;
export const TITLE_OF_UNION_CHANGED = "TitleOfUnionChanged" as const;
export const SIZE_CHANGED = "SizeChanged" as const;
export const REAL_SIZE_CHANGED = "RealSizeChanged" as const;
export const QUANTITY_CHANGED = "QuantityChanged" as const;
export const COLOR_CHANGED = "ColorChanged" as const;
export const SET_FOUND_CHIPBOARD = "SetFoundChipboard" as const;
export const CREATE_UNKNOWN_CHIPBOARD = "CreateUnknownChipboard" as const;
export const PRESS_ON_ITEM_IN_LIST = "PressOnItemInList" as const;

export const ACTION_CONFIRMED = "ActionConfirmed" as const;
export const LIST_SCROLLED_BY_USER = "ListScrolledByUser" as const;
export const FIELD_DISABLED = "FieldDisabled" as const;

export const SET_LIST_DONE = "SetListDone" as const;
// Handled in reducer
export const TOGGLE_FIND_AREA_VISIBILITY = "ToggleFindAreaVisibility" as const;
export const BACK = "Back" as const;
export const PRESS_TO_DELETE_OR_RESTORE_UNION =
  "PressToDeleteOrRestoreUnion" as const;
export const PRESS_TO_SHARE_UNION = "PressToShareUnion" as const;
export const SHOW_WHAT_IS_FOUND = "ShowWhatIsFount" as const;
export const SHOW_WHAT_IS_UNKNOWN = "ShowWhatIsUnknown" as const;
export const SHOW_WHAT_IS_REAL_SIZE = "ShowWhatIsRealSize" as const;

export type CountIntent =
  | {type: typeof START; unionId: string | null}
  | {type: typeof CLEANUP}
  | {type: typeof TITLE_OF_UNION_CHANGED; newTitle: string}
  | {type: typeof SIZE_CHANGED; newSizeAsString: string; dimension: number}
  | {type: typeof REAL_SIZE_CHANGED; newDiffAsString: string; dimension: number}
  | {type: typeof QUANTITY_CHANGED; newQuantityAsString: string}
  | {type: typeof COLOR_CHANGED; newColorName: string; newColor: string}
  | {type: typeof SET_FOUND_CHIPBOARD}
  | {type: typeof CREATE_UNKNOWN_CHIPBOARD}
  | {type: typeof PRESS_TO_SHARE_UNION}
  | {type: typeof PRESS_TO_DELETE_OR_RESTORE_UNION}
  | {type: typeof PRESS_ON_ITEM_IN_LIST; chipboard: ChipboardUI}
  | {type: typeof SHOW_WHAT_IS_FOUND}
  | {type: typeof SHOW_WHAT_IS_UNKNOWN}
  | {type: typeof SHOW_WHAT_IS_REAL_SIZE}
  | {type: typeof ACTION_CONFIRMED; confirmationType: unknown}
  | {type: typeof LIST_SCROLLED_BY_USER}
  | {type: typeof FIELD_DISABLED}
  | {type: typeof TOGGLE_FIND_AREA_VISIBILITY}
  | {type: typeof BACK}
  | {type: typeof SET_LIST_DONE};

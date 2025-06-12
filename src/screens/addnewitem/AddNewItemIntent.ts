import {NewScreenType} from "../models/NewScreenType";
import {ChipboardUI} from "./models/ChipboardUI";

export type AddNewItemIntent =
  | {type: "CreateNewUnion"}
  | {type: "SetItemType"; itemType: NewScreenType | null}
  | {type: "TitleOfUnionChanged"; newTitle: string}
  | {type: "SizeChanged"; newSizeAsString: string; dimension: number}
  | {type: "QuantityChanged"; newQuantityAsString: string}
  | {type: "ColorChanged"; newColorNameResId: number; newColor: number}
  | {type: "AskEditChipboard"; chipboard: ChipboardUI}
  | {type: "EditChipboardConfirmed"; chipboard: ChipboardUI}
  | {type: "AskDeleteChipboard"; chipboard: ChipboardUI}
  | {type: "DeleteChipboardConfirmed"; chipboardId: number}
  | {type: "SharingUnionConfirmed"}
  | {type: "DeletingUnionConfirmed"}
  | {type: "PressToShareUnion"}
  | {type: "PressToDeleteUnion"}
  | {type: "AddChipboardToDb"}
  | {type: "ToggleAddAreaVisibility"}
  | {type: "HandleScreenExit"}
  | {type: "Back"};

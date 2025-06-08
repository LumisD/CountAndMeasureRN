// // types/AddNewItemIntent.ts

// import {NewScreenType} from "./NewScreenType";
// import {ChipboardUi} from "./ChipboardUi";

// export type AddNewItemIntent =
//   | {type: "SetItemType"; itemType: NewScreenType | null}
//   | {type: "TitleOfUnionChanged"; newTitle: string}
//   | {type: "SizeChanged"; newSizeAsString: string; dimension: number}
//   | {type: "QuantityChanged"; newQuantityAsString: string}
//   | {type: "ColorChanged"; newColorNameResId: number; newColor: number}
//   | {type: "AskEditChipboard"; chipboard: ChipboardUi}
//   | {type: "EditChipboardConfirmed"; chipboard: ChipboardUi}
//   | {type: "AskDeleteChipboard"; chipboard: ChipboardUi}
//   | {type: "DeleteChipboardConfirmed"; chipboardId: number}
//   | {type: "SharingUnionConfirmed"}
//   | {type: "DeletingUnionConfirmed"}
//   | {type: "PressToShareUnion"}
//   | {type: "PressToDeleteUnion"}
//   | {type: "AddChipboardToDb"}
//   | {type: "ToggleAddAreaVisibility"}
//   | {type: "HandleScreenExit"}
//   | {type: "Back"};

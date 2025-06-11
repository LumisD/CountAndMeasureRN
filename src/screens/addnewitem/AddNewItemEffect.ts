import {ChipboardUI} from "./models/ChipboardUI";

export type AddNewItemEffect =
  | {
      type: "ShowDeleteConfirmationDialog";
      chipboard: ChipboardUI;
      hasColor: boolean;
    }
  | {
      type: "ShowEditConfirmationDialog";
      chipboard: ChipboardUI;
      hasColor: boolean;
    }
  | {type: "ShowSnackbar"; message: string}
  | {type: "ShowRemoveUnionDialog"}
  | {type: "ShowShareUnionDialog"}
  | {type: "FlashAddItemArea"}
  | {type: "ShareUnion"; shareIntent: unknown} // use real type later if needed
  | {type: "NavigateBack"};

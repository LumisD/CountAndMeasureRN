import {UnionOfChipboardsUI} from "../models/UnionOfChipboardsUI";
import {ChipboardUI} from "./models/ChipboardUI";

export interface CountState {
  unionOfChipboards: UnionOfChipboardsUI;
  chipboards: ChipboardUI[];
  chipboardToFind: ChipboardUI;
  isFoundAreaOpen: boolean;
  isUnknownButtonAvailable: boolean;
  isFoundButtonAvailable: boolean;
  messageForEmptyList: number | null;
  isBackButtonVisible: boolean;
}

import {UnionOfChipboardsUI} from "../models/UnionOfChipboardsUI";
import {AddNewItemEffect} from "./AddNewItemEffect";
import {ChipboardUI} from "./models/ChipboardUI";

export interface AddNewItemState {
  unionOfChipboards: UnionOfChipboardsUI;
  createdChipboards: ChipboardUI[];
  newOrEditChipboard: ChipboardUI;
  isAddAreaOpen: boolean;
  isAddButtonAvailable: boolean;
}

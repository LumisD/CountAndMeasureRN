import {UnionOfChipboardsUI} from "../models/UnionOfChipboardsUI";

export const PRESS_ON_ITEM_IN_LIST = "PressOnItemList";

export type ListsIntent = {
  type: typeof PRESS_ON_ITEM_IN_LIST;
  union: UnionOfChipboardsUI;
};

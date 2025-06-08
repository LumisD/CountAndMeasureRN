import Realm from "realm";
import {ChipboardSchema} from "./schemas/Chipboard";
import {UnionOfChipboardsSchema} from "./schemas/UnionOfChipboards";

export const realm = new Realm({
  schema: [ChipboardSchema, UnionOfChipboardsSchema],
  schemaVersion: 1,
});

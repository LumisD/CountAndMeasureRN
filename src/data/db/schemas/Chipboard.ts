import Realm from "realm";
import {ObjectId} from "bson";

export class ChipboardSchema extends Realm.Object {
  id!: ObjectId;
  unionId!: ObjectId;
  state!: number; // 0 - not found, 1 - found, 2 - unknown
  quantity!: number;
  colorName!: string;
  color!: number;
  size1!: number;
  realSize1!: number; // diff between real measured size and size1
  size2!: number;
  realSize2!: number;
  size3!: number;
  realSize3!: number;

  static schema: Realm.ObjectSchema = {
    name: "Chipboard",
    primaryKey: "id",
    properties: {
      id: "objectId",
      unionId: "objectId",
      state: {type: "int", default: 0}, // 0 - not found, 1 - found, 2 - unknown
      quantity: "int",
      colorName: "string",
      color: "int",
      size1: "float",
      realSize1: {type: "float", default: 0}, // diff between real measured size and size1
      size2: "float",
      realSize2: {type: "float", default: 0},
      size3: "float",
      realSize3: {type: "float", default: 0},
    },
  };
}

export type Chipboard = {
  id: Realm.BSON.ObjectId;
  unionId: Realm.BSON.ObjectId;
  state: number;
  quantity: number;
  colorName: string;
  color: number;
  size1: number;
  realSize1: number;
  size2: number;
  realSize2: number;
  size3: number;
  realSize3: number;
};

export function mapChipboard(obj: any & Chipboard): Chipboard {
  return {
    id: obj.id,
    unionId: obj.unionId,
    state: obj.state,
    quantity: obj.quantity,
    colorName: obj.colorName,
    color: obj.color,
    size1: obj.size1,
    realSize1: obj.realSize1,
    size2: obj.size2,
    realSize2: obj.realSize2,
    size3: obj.size3,
    realSize3: obj.realSize3,
  };
}

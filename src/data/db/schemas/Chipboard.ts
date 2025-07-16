import Realm from "realm";

export class ChipboardSchema extends Realm.Object {
  id!: Realm.BSON.ObjectId;
  unionId!: Realm.BSON.ObjectId;
  state!: number; // 0 - not found, 1 - found, 2 - unknown
  quantity!: number;
  colorName!: string;
  color!: string;
  size1!: string;
  realSize1!: string; // diff between real measured size and size1
  size2!: string;
  realSize2!: string;
  size3!: string;
  realSize3!: string;

  static schema: Realm.ObjectSchema = {
    name: "Chipboard",
    primaryKey: "id",
    properties: {
      id: "objectId",
      unionId: "objectId",
      state: {type: "int", default: 0}, // 0 - not found, 1 - found, 2 - unknown
      quantity: "int",
      colorName: "string",
      color: "string",
      size1: {type: "string", default: ""},
      realSize1: {type: "string", default: ""}, // diff between real measured size and size1
      size2: {type: "string", default: ""},
      realSize2: {type: "string", default: ""},
      size3: {type: "string", default: ""},
      realSize3: {type: "string", default: ""},
    },
  };
}

export type Chipboard = {
  id: string;
  unionId: string;
  state: number;
  quantity: number;
  colorName: string;
  color: string;
  size1: string;
  realSize1: string;
  size2: string;
  realSize2: string;
  size3: string;
  realSize3: string;
};

export function mapRealmToChipboard(obj: any): Chipboard {
  return {
    id: obj.id.toHexString(),
    unionId: obj.unionId.toHexString(),
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

function isValidObjectIdHex(id: string): boolean {
  return /^[a-f\d]{24}$/i.test(id);
}

export function mapChipboardToRealm(
  chipboard: Chipboard,
): Partial<ChipboardSchema> {
  return {
    id: isValidObjectIdHex(chipboard.id)
      ? Realm.BSON.ObjectId.createFromHexString(chipboard.id)
      : undefined,
    unionId: isValidObjectIdHex(chipboard.unionId)
      ? Realm.BSON.ObjectId.createFromHexString(chipboard.unionId)
      : undefined,
    state: chipboard.state,
    quantity: chipboard.quantity,
    colorName: chipboard.colorName,
    color: chipboard.color,
    size1: chipboard.size1,
    realSize1: chipboard.realSize1,
    size2: chipboard.size2,
    realSize2: chipboard.realSize2,
    size3: chipboard.size3,
    realSize3: chipboard.realSize3,
  };
}

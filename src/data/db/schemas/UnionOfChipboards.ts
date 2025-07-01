import Realm from "realm";
import {toObjectIdOrUndefined} from "../utils";

export class UnionOfChipboardsSchema extends Realm.Object<UnionOfChipboardsSchema> {
  id!: Realm.BSON.ObjectId;
  title!: string;
  dimensions!: number;
  direction!: number;
  hasColor!: boolean;
  titleColumn1!: string;
  titleColumn2!: string;
  titleColumn3!: string;
  isFinished!: boolean;
  isMarkedAsDeleted!: boolean;
  createdAt!: number;
  updatedAt!: number;

  static primaryKey = "id";

  static schema: Realm.ObjectSchema = {
    name: "UnionOfChipboards",
    primaryKey: "id",
    properties: {
      id: "objectId",
      title: "string",
      dimensions: "int",
      direction: "int",
      hasColor: "bool",
      titleColumn1: "string",
      titleColumn2: "string",
      titleColumn3: "string",
      isFinished: "bool",
      isMarkedAsDeleted: "bool",
      createdAt: "int",
      updatedAt: "int",
    },
  };
}

export type UnionOfChipboards = {
  id: string;
  title: string;
  dimensions: number;
  direction: number;
  hasColor: boolean;
  titleColumn1: string;
  titleColumn2: string;
  titleColumn3: string;
  isFinished: boolean;
  isMarkedAsDeleted: boolean;
  createdAt: number;
  updatedAt: number;
};

export function mapRealmToUnion(obj: any): UnionOfChipboards {
  return {
    id: obj.id.toHexString(),
    title: obj.title,
    dimensions: obj.dimensions,
    direction: obj.direction,
    hasColor: obj.hasColor,
    titleColumn1: obj.titleColumn1,
    titleColumn2: obj.titleColumn2,
    titleColumn3: obj.titleColumn3,
    isFinished: obj.isFinished,
    isMarkedAsDeleted: obj.isMarkedAsDeleted,
    createdAt: obj.createdAt,
    updatedAt: obj.updatedAt,
  };
}

export function mapUnionToRealm(
  union: UnionOfChipboards,
): Partial<UnionOfChipboardsSchema> {
  return {
    id: toObjectIdOrUndefined(union.id),
    title: union.title,
    dimensions: union.dimensions,
    direction: union.direction,
    hasColor: union.hasColor,
    titleColumn1: union.titleColumn1,
    titleColumn2: union.titleColumn2,
    titleColumn3: union.titleColumn3,
    isFinished: union.isFinished,
    isMarkedAsDeleted: union.isMarkedAsDeleted,
    createdAt: union.createdAt,
    updatedAt: union.updatedAt,
  };
}

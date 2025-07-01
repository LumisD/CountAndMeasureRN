import {BSON} from "realm";

export function toObjectIdOrUndefined(id: string): BSON.ObjectId | undefined {
  return /^[a-f\d]{24}$/i.test(id)
    ? BSON.ObjectId.createFromHexString(id)
    : undefined;
}

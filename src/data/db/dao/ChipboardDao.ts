import Realm from "realm";
import {ObjectId} from "bson";
import {ChipboardSchema} from "../schemas/Chipboard";

export class ChipboardDao {
  constructor(private realm: Realm) {}

  insertChipboard(chipboard: Partial<ChipboardSchema>) {
    this.realm.write(() => {
      this.realm.create("Chipboard", {
        ...chipboard,
        id: new Realm.BSON.ObjectId(),
      });
    });
  }

  updateChipboard(chipboard: Partial<ChipboardSchema>): void {
    if (!chipboard.id) throw new Error("Cannot update chipboard without id");

    this.realm.write(() => {
      this.realm.create("Chipboard", chipboard, Realm.UpdateMode.Modified);
    });
  }

  updateChipboardState(id: ObjectId, newState: number) {
    const chipboard = this.realm.objectForPrimaryKey<ChipboardSchema>(
      "Chipboard",
      id,
    );
    if (!chipboard) return;
    this.realm.write(() => {
      chipboard.state = newState;
    });
  }

  updateChipboardQuantity(id: ObjectId, newQuantity: number) {
    const chipboard = this.realm.objectForPrimaryKey<ChipboardSchema>(
      "Chipboard",
      id,
    );
    if (!chipboard) return;
    this.realm.write(() => {
      chipboard.quantity = newQuantity;
    });
  }

  getChipboardByIdAndUnionId(
    id: ObjectId,
    unionId: ObjectId,
  ): ChipboardSchema | null {
    return (
      this.realm
        .objects<ChipboardSchema>("Chipboard")
        .filtered("id == $0 AND unionId == $1", id, unionId)[0] ?? null
    );
  }

  findSimilarFoundChipboard(
    unionId: ObjectId,
    chipboardId: ObjectId,
    color: string,
    colorName: string,
    size1: number,
    realSize1: number,
    size2: number,
    realSize2: number,
    size3: number,
    realSize3: number,
  ): ChipboardSchema | null {
    return (
      this.realm.objects<ChipboardSchema>("Chipboard").filtered(
        `unionId == $0 AND state == 1 AND id != $1 AND color == $2 AND colorName == $3
         AND size1 == $4 AND realSize1 == $5 AND size2 == $6 AND realSize2 == $7
         AND size3 == $8 AND realSize3 == $9`,
        unionId,
        chipboardId,
        color,
        colorName,
        size1,
        realSize1,
        size2,
        realSize2,
        size3,
        realSize3,
      )[0] ?? null
    );
  }

  getChipboardsByUnionId(unionId: ObjectId): ChipboardSchema[] {
    return this.realm
      .objects<ChipboardSchema>("Chipboard")
      .filtered("unionId == $0", unionId)
      .slice();
  }

  getChipboardsCountByUnionId(unionId: ObjectId): number {
    return this.realm
      .objects<ChipboardSchema>("Chipboard")
      .filtered("unionId == $0", unionId).length;
  }

  getQuantityOfChipboardByConditions(
    id: ObjectId,
    unionId: ObjectId,
    state: number,
  ): number {
    const result = this.realm
      .objects<ChipboardSchema>("Chipboard")
      .filtered(
        "id == $0 AND unionId == $1 AND state == $2",
        id,
        unionId,
        state,
      )[0];
    return result?.quantity ?? 0;
  }

  deleteChipboardById(id: ObjectId) {
    const chipboard = this.realm.objectForPrimaryKey<ChipboardSchema>(
      "Chipboard",
      id,
    );
    if (!chipboard) return;
    this.realm.write(() => {
      this.realm.delete(chipboard);
    });
  }

  deleteAllChipboardsByUnionId(unionId: ObjectId) {
    const chipboards = this.realm
      .objects<ChipboardSchema>("Chipboard")
      .filtered("unionId == $0", unionId);
    this.realm.write(() => {
      this.realm.delete(chipboards);
    });
  }

  deleteChipboard(chipboard: ChipboardSchema) {
    this.realm.write(() => {
      this.realm.delete(chipboard);
    });
  }

  subscribeToChipboardsByUnionId(
    unionId: Realm.BSON.ObjectId,
    listener: (data: Realm.Collection<ChipboardSchema>) => void,
  ): () => void {
    const results = this.realm
      .objects(ChipboardSchema)
      .filtered("unionId == $0", unionId);

    const callback: Realm.CollectionChangeCallback<ChipboardSchema> = (
      collection,
      changes,
    ) => {
      listener(collection as Realm.Collection<ChipboardSchema>);
    };

    results.addListener(callback);

    return () => {
      if (results.isValid()) {
        results.removeListener(callback);
      }
    };
  }
}

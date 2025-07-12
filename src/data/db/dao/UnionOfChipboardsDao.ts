import Realm from "realm";
import {ObjectId} from "bson";
import {UnionOfChipboardsSchema} from "../schemas/UnionOfChipboards";

export class UnionOfChipboardsDao {
  constructor(private realm: Realm) {}

  insertUnionOfChipboards(
    data: Omit<Partial<UnionOfChipboardsSchema>, "id">,
  ): string {
    const id = new Realm.BSON.ObjectId();

    this.realm.write(() => {
      this.realm.create("UnionOfChipboards", {
        ...data,
        id,
      });
    });

    return id.toHexString();
  }

  updateUnionOfChipboards(data: Partial<UnionOfChipboardsSchema>): void {
    if (!data.id) throw new Error("Cannot update without id");

    this.realm.write(() => {
      this.realm.create("UnionOfChipboards", data, Realm.UpdateMode.Modified);
    });
  }

  updateUnionOfChipboardsTitle(
    unionId: ObjectId,
    newTitle: string,
    updatedAt: number,
  ) {
    this.realm.write(() => {
      const obj = this.realm.objectForPrimaryKey<UnionOfChipboardsSchema>(
        "UnionOfChipboards",
        unionId,
      );
      if (obj) {
        obj.title = newTitle;
        obj.updatedAt = updatedAt;
      }
    });
  }

  updateUnionCharacteristics(
    unionId: ObjectId,
    dimensions: number,
    direction: number,
    hasColor: boolean,
    titleColumn1: string,
    titleColumn2: string,
    titleColumn3: string,
    updatedAt: number,
  ) {
    this.realm.write(() => {
      const obj = this.realm.objectForPrimaryKey<UnionOfChipboardsSchema>(
        "UnionOfChipboards",
        unionId,
      );
      if (obj) {
        obj.dimensions = dimensions;
        obj.direction = direction;
        obj.hasColor = hasColor;
        obj.titleColumn1 = titleColumn1;
        obj.titleColumn2 = titleColumn2;
        obj.titleColumn3 = titleColumn3;
        obj.updatedAt = updatedAt;
      }
    });
  }

  setUnionOfChipboardsIsFinished(
    unionId: ObjectId,
    isFinished: boolean,
    updatedAt: number,
  ) {
    this.realm.write(() => {
      const obj = this.realm.objectForPrimaryKey<UnionOfChipboardsSchema>(
        "UnionOfChipboards",
        unionId,
      );
      if (obj) {
        obj.isFinished = isFinished;
        obj.updatedAt = updatedAt;
      }
    });
  }

  setUnionOfChipboardsIsMarkedAsDeleted(
    unionId: ObjectId,
    isMarkedAsDeleted: boolean,
    updatedAt: number,
  ) {
    this.realm.write(() => {
      const obj = this.realm.objectForPrimaryKey<UnionOfChipboardsSchema>(
        "UnionOfChipboards",
        unionId,
      );
      if (obj) {
        obj.isMarkedAsDeleted = isMarkedAsDeleted;
        obj.updatedAt = updatedAt;
      }
    });
  }

  countUnions(): number {
    return this.realm.objects<UnionOfChipboardsSchema>("UnionOfChipboards")
      .length;
  }

  getUnionOfChipboardsById(unionId: ObjectId): UnionOfChipboardsSchema | null {
    return (
      this.realm.objectForPrimaryKey<UnionOfChipboardsSchema>(
        "UnionOfChipboards",
        unionId,
      ) ?? null
    );
  }

  subscribeToAllUnions(
    listener: (data: Realm.Collection<UnionOfChipboardsSchema>) => void,
  ): () => void {
    const results =
      this.realm.objects<UnionOfChipboardsSchema>("UnionOfChipboards");

    const callback: Realm.CollectionChangeCallback<UnionOfChipboardsSchema> = (
      collection,
      changes,
    ) => {
      listener(collection as Realm.Collection<UnionOfChipboardsSchema>);
    };

    results.addListener(callback);

    return () => {
      if (results.isValid()) {
        results.removeListener(callback);
      }
    };
  }

  getLastUnFinishedUnionOfChipboards(): UnionOfChipboardsSchema | null {
    const unfinished = this.realm
      .objects<UnionOfChipboardsSchema>("UnionOfChipboards")
      .filtered("isFinished == false")
      .sorted([
        ["updatedAt", true],
        ["createdAt", true],
      ]);

    return unfinished.length > 0 ? unfinished[0] : null;
  }

  deleteUnionOfChipboardsById(unionId: ObjectId) {
    this.realm.write(() => {
      const obj = this.realm.objectForPrimaryKey<UnionOfChipboardsSchema>(
        "UnionOfChipboards",
        unionId,
      );
      if (obj) this.realm.delete(obj);
    });
  }
}

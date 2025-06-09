import Realm from "realm";
import {ObjectId} from "bson";
import {
  mapRealmToUnion,
  mapUnionToRealm,
  UnionOfChipboards,
} from "../db/schemas/UnionOfChipboards";
import {
  Chipboard,
  ChipboardSchema,
  mapChipboardToRealm,
  mapRealmToChipboard,
} from "../db/schemas/Chipboard";
import {ChipboardDao} from "../db/dao/ChipboardDao";
import {UnionOfChipboardsDao} from "../db/dao/UnionOfChipboardsDao";
import {MeasureAndCountRepository} from "./MeasureAndCountRepository";

type Unsubscribe = () => void;

export class MeasureAndCountRepositoryImpl
  implements MeasureAndCountRepository
{
  private chipboardDao: ChipboardDao;
  private unionDao: UnionOfChipboardsDao;

  constructor(chipboardDao: ChipboardDao, unionDao: UnionOfChipboardsDao) {
    this.chipboardDao = chipboardDao;
    this.unionDao = unionDao;
  }

  async insertUnionOfChipboards(union: UnionOfChipboards): Promise<string> {
    const dataToInsert = mapUnionToRealm(union);
    return this.unionDao.insertUnionOfChipboards(dataToInsert);
  }

  // async insertAndGetUnionOfChipboards(
  //   union: UnionOfChipboards,
  // ): Promise<UnionOfChipboards | null> {
  //   const id = await this.insertUnionOfChipboards(union);
  //   const result = this.unionDao.getUnionOfChipboardsById(id);
  //   return result ? mapRealmToUnion(result) : null;
  // }

  async updateUnionOfChipboards(union: UnionOfChipboards): Promise<void> {
    const dataToUpdate = mapUnionToRealm(union);
    if (!union.id) throw new Error("Cannot update union without id");

    this.unionDao.updateUnionOfChipboards(dataToUpdate);
  }

  async updateUnionOfChipboardsTitle(
    unionId: ObjectId,
    newTitle: string,
    updatedAt: number,
  ): Promise<void> {
    this.unionDao.updateUnionOfChipboardsTitle(unionId, newTitle, updatedAt);
  }

  async updateUnionCharacteristics(
    unionId: ObjectId,
    dimensions: number,
    direction: number,
    hasColor: boolean,
    titleColumn1: string,
    titleColumn2: string,
    titleColumn3: string,
    updatedAt: number,
  ): Promise<void> {
    this.unionDao.updateUnionCharacteristics(
      unionId,
      dimensions,
      direction,
      hasColor,
      titleColumn1,
      titleColumn2,
      titleColumn3,
      updatedAt,
    );
  }

  async setUnionOfChipboardsIsFinished(
    unionId: ObjectId,
    isFinished: boolean,
    updatedAt: number,
  ): Promise<void> {
    this.unionDao.setUnionOfChipboardsIsFinished(
      unionId,
      isFinished,
      updatedAt,
    );
  }

  async setUnionOfChipboardsIsMarkedAsDeleted(
    unionId: ObjectId,
    isMarkedAsDeleted: boolean,
    updatedAt: number,
  ): Promise<void> {
    this.unionDao.setUnionOfChipboardsIsMarkedAsDeleted(
      unionId,
      isMarkedAsDeleted,
      updatedAt,
    );
  }

  async countUnions(): Promise<number> {
    return this.unionDao.countUnions();
  }

  async getUnionOfChipboardsById(
    unionId: ObjectId,
  ): Promise<UnionOfChipboards | null> {
    const result = this.unionDao.getUnionOfChipboardsById(unionId);
    return result ? mapRealmToUnion(result) : null;
  }

  async getLastUnFinishedUnionOfChipboards(): Promise<UnionOfChipboards | null> {
    const result = this.unionDao.getLastUnFinishedUnionOfChipboards();
    return result ? mapRealmToUnion(result) : null;
  }

  async deleteUnionOfChipboards(unionId: ObjectId): Promise<void> {
    this.unionDao.deleteUnionOfChipboardsById(unionId);
  }

  subscribeToAllUnions(
    listener: (data: UnionOfChipboards[]) => void,
  ): Unsubscribe {
    const all = this.unionDao.getAllUnions();

    const callback = () => {
      const raw = this.unionDao.getAllUnions();
      const mapped = raw.map(mapRealmToUnion);
      listener(mapped);
    };

    // Note: Realm change listeners not abstracted into DAO
    // This placeholder is for compatibility; real implementation requires Realm object
    return () => {
      // removeListener not implemented in DAO abstraction
    };
  }

  async insertChipboard(chipboard: Chipboard): Promise<void> {
    this.chipboardDao.insertChipboard(mapChipboardToRealm(chipboard));
  }

  async updateChipboard(chipboard: Chipboard): Promise<void> {
    const dataToUpdate = mapChipboardToRealm(chipboard);
    this.chipboardDao.updateChipboard(dataToUpdate);
  }

  async updateChipboardState(id: ObjectId, newState: number): Promise<void> {
    this.chipboardDao.updateChipboardState(id, newState);
  }

  async updateChipboardQuantity(
    id: ObjectId,
    newQuantity: number,
  ): Promise<void> {
    this.chipboardDao.updateChipboardQuantity(id, newQuantity);
  }

  async findSimilarFoundChipboard(
    chipboard: Chipboard,
  ): Promise<Chipboard | null> {
    const similarChipboard = this.chipboardDao.findSimilarFoundChipboard(
      Realm.BSON.ObjectId.createFromHexString(chipboard.unionId),
      Realm.BSON.ObjectId.createFromHexString(chipboard.id),
      chipboard.color,
      chipboard.colorName,
      chipboard.size1,
      chipboard.realSize1,
      chipboard.size2,
      chipboard.realSize2,
      chipboard.size3,
      chipboard.realSize3,
    );
    return similarChipboard ? mapRealmToChipboard(similarChipboard) : null;
  }

  async getChipboardByIdAndUnionId(
    chipboardId: ObjectId,
    unionId: ObjectId,
  ): Promise<Chipboard | null> {
    const chipboard = this.chipboardDao.getChipboardByIdAndUnionId(
      chipboardId,
      unionId,
    );
    return chipboard ? mapRealmToChipboard(chipboard) : null;
  }

  async getChipboardsCountByUnionId(unionId: ObjectId): Promise<number> {
    return this.chipboardDao.getChipboardsCountByUnionId(unionId);
  }

  async getQuantityOfChipboardByConditions(
    id: ObjectId,
    unionId: ObjectId,
    state: number,
  ): Promise<number> {
    return this.chipboardDao.getQuantityOfChipboardByConditions(
      id,
      unionId,
      state,
    );
  }

  async deleteChipboardById(chipboardId: ObjectId): Promise<void> {
    this.chipboardDao.deleteChipboardById(chipboardId);
  }

  async deleteAllChipboardsByUnionId(unionId: ObjectId): Promise<void> {
    this.chipboardDao.deleteAllChipboardsByUnionId(unionId);
  }

  async getChipboardsByUnionId(unionId: ObjectId): Promise<Chipboard[]> {
    const chipboards = this.chipboardDao.getChipboardsByUnionId(unionId);
    return chipboards.map(mapRealmToChipboard);
  }

  subscribeToChipboardsByUnionId(
    unionId: ObjectId,
    listener: (data: Chipboard[]) => void,
  ): Unsubscribe {
    return this.chipboardDao.subscribeToChipboardsByUnionId(
      unionId,
      realmCollection => {
        const plainChipboards =
          Array.from(realmCollection).map(mapRealmToChipboard);
        listener(plainChipboards);
      },
    );
  }
}

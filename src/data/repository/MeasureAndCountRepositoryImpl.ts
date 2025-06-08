import Realm from "realm";
import {ObjectId} from "bson";
import {
  mapUnionOfChipboards,
  mapUnionToRealm,
  UnionOfChipboards,
} from "../db/schemas/UnionOfChipboards";
import {
  Chipboard,
  ChipboardSchema,
  mapChipboard,
} from "../db/schemas/Chipboard";
import {ChipboardDao} from "../db/dao/ChipboardDao";
import {UnionOfChipboardsDao} from "../db/dao/UnionOfChipboardsDao";

type Unsubscribe = () => void;

export class MeasureAndCountRepositoryImpl {
  private chipboardDao: ChipboardDao;
  private unionDao: UnionOfChipboardsDao;

  constructor(realm: Realm) {
    this.chipboardDao = new ChipboardDao(realm);
    this.unionDao = new UnionOfChipboardsDao(realm);
  }

  async insertUnionOfChipboards(
    union: UnionOfChipboards,
  ): Promise<Realm.BSON.ObjectId> {
    const dataToInsert = mapUnionToRealm(union);
    return this.unionDao.insertUnionOfChipboards(dataToInsert);
  }

  async insertAndGetUnionOfChipboards(
    union: UnionOfChipboards,
  ): Promise<UnionOfChipboards | null> {
    const id = await this.insertUnionOfChipboards(union);
    return this.unionDao.getUnionOfChipboardsById(id);
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
    return this.unionDao.getUnionOfChipboardsById(unionId);
  }

  async getLastUnFinishedUnionOfChipboards(): Promise<UnionOfChipboards | null> {
    return this.unionDao.getLastUnFinishedUnionOfChipboards();
  }

  async deleteUnionOfChipboards(unionId: ObjectId): Promise<void> {
    this.unionDao.deleteUnionOfChipboardsById(unionId);
  }

  subscribeToAllUnions(
    listener: (data: UnionOfChipboards[]) => void,
  ): Unsubscribe {
    const all = this.unionDao.getAllUnions();

    const callback = () => {
      listener(this.unionDao.getAllUnions());
    };

    // Note: Realm change listeners not abstracted into DAO
    // This placeholder is for compatibility; real implementation requires Realm object
    return () => {
      // removeListener not implemented in DAO abstraction
    };
  }

  async insertChipboard(chipboard: Chipboard): Promise<void> {
    this.chipboardDao.insertChipboard(chipboard);
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
    return this.chipboardDao.findSimilarFoundChipboard(
      chipboard.unionId,
      chipboard.id,
      chipboard.color,
      chipboard.colorName,
      chipboard.size1,
      chipboard.realSize1,
      chipboard.size2,
      chipboard.realSize2,
      chipboard.size3,
      chipboard.realSize3,
    );
  }

  async getChipboardByIdAndUnionId(
    chipboardId: ObjectId,
    unionId: ObjectId,
  ): Promise<Chipboard | null> {
    return this.chipboardDao.getChipboardByIdAndUnionId(chipboardId, unionId);
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
    return this.chipboardDao.getChipboardsByUnionId(unionId);
  }

  subscribeToChipboardsByUnionId(
    unionId: ObjectId,
    listener: (data: Chipboard[]) => void,
  ): Unsubscribe {
    return this.chipboardDao.subscribeToChipboardsByUnionId(
      unionId,
      realmCollection => {
        const plainChipboards = Array.from(realmCollection).map(mapChipboard);
        listener(plainChipboards);
      },
    );
  }
}

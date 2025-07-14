import {ObjectId} from "bson";
import {UnionOfChipboards} from "../db/schemas/UnionOfChipboards";
import {Chipboard} from "../db/schemas/Chipboard";

type Unsubscribe = () => void;

export interface MeasureAndCountRepository {
  insertUnionOfChipboards(union: UnionOfChipboards): Promise<string>;

  updateUnionOfChipboards(union: UnionOfChipboards): Promise<void>;

  updateUnionOfChipboardsTitle(
    unionId: ObjectId,
    newTitle: string,
    updatedAt: number,
  ): Promise<void>;

  updateUnionCharacteristics(
    unionId: ObjectId,
    dimensions: number,
    direction: number,
    hasColor: boolean,
    titleColumn1: string,
    titleColumn2: string,
    titleColumn3: string,
    updatedAt: number,
  ): Promise<void>;

  setUnionOfChipboardsIsFinished(
    unionId: ObjectId,
    isFinished: boolean,
    updatedAt: number,
  ): Promise<void>;

  setUnionOfChipboardsIsMarkedAsDeleted(
    unionId: ObjectId,
    isMarkedAsDeleted: boolean,
    updatedAt: number,
  ): Promise<void>;

  countUnions(): Promise<number>;

  getUnionOfChipboardsById(
    unionId: ObjectId,
  ): Promise<UnionOfChipboards | null>;
  getLastUnFinishedUnionOfChipboards(): Promise<UnionOfChipboards | null>;
  deleteUnionOfChipboards(unionId: ObjectId): Promise<void>;

  subscribeToAllUnions(
    listener: (data: UnionOfChipboards[]) => void,
  ): Unsubscribe;

  insertChipboard(chipboard: Chipboard): Promise<void>;

  updateChipboard(chipboard: Chipboard): Promise<void>;

  updateChipboardState(id: ObjectId, newState: number): Promise<void>;

  updateChipboardQuantity(id: ObjectId, newQuantity: number): Promise<void>;

  findSimilarFoundChipboard(chipboard: Chipboard): Promise<Chipboard | null>;

  getChipboardByIdAndUnionId(
    chipboardId: ObjectId,
    unionId: ObjectId,
  ): Promise<Chipboard | null>;

  getChipboardsCountByUnionId(unionId: ObjectId): Promise<number>;

  getQuantityOfChipboardByConditions(
    id: ObjectId,
    unionId: ObjectId,
    state: number,
  ): Promise<number>;

  deleteChipboardById(chipboardId: ObjectId): Promise<void>;

  deleteAllChipboardsByUnionId(unionId: ObjectId): Promise<void>;

  getChipboardsByUnionId(unionId: ObjectId): Promise<Chipboard[]>;

  subscribeToChipboardsByUnionId(
    unionId: ObjectId,
    listener: (data: Chipboard[]) => void,
  ): Unsubscribe;
}

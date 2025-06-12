import {MeasureAndCountRepository} from "../../../data/repository/MeasureAndCountRepository";
import {getDefaultUnionTitle} from "../../../utils/generalUtils";
import {
  createDefaultUnionOfChipboardsUI,
  UnionOfChipboardsUI,
} from "../../models/UnionOfChipboardsUI";
import {ChipboardUI} from "../models/ChipboardUI";

export async function createNewUnion(repo: MeasureAndCountRepository) {
  const newUnion: UnionOfChipboardsUI = {
    ...createDefaultUnionOfChipboardsUI(),
    title: getDefaultUnionTitle(),
    isFinished: false,
    createdAt: Date.now(),
  };
  const unionId = await repo.insertUnionOfChipboards(newUnion);

  return {
    unionOfChipboards: {
      ...newUnion,
      id: unionId,
    },
    newOrEditChipboard: {
      unionId,
      colorName: "White",
    } as ChipboardUI,
  };
}

import {MeasureAndCountRepository} from "../../../../data/repository/MeasureAndCountRepository";
import {getDefaultUnionTitle} from "../../../utils/generalUtils";
import {
  createDefaultUnionOfChipboardsUI,
  UnionOfChipboardsUI,
} from "../../../models/UnionOfChipboardsUI";
import {AddNewItemEffect} from "../../AddNewItemEffect";
import {AddNewItemState} from "../../AddNewItemState";
import {AddNewItemStore} from "../AddNewItemStore";

export async function handleCreateNewUnion(
  repo: MeasureAndCountRepository,
  get: () => AddNewItemStore,
): Promise<{newState: AddNewItemState; effect?: AddNewItemEffect}> {
  console.log("MaC handleCreateNewUnion started");
  const newUnion: UnionOfChipboardsUI = {
    ...createDefaultUnionOfChipboardsUI(),
    title: getDefaultUnionTitle(),
    isFinished: false,
    createdAt: Date.now(),
  };

  const unionId = await repo.insertUnionOfChipboards(newUnion);

  const newState: AddNewItemState = {
    ...get().state,
    unionOfChipboards: {
      ...newUnion,
      id: unionId,
    },
    newOrEditChipboard: {
      ...get().state.newOrEditChipboard,
      unionId,
      colorName: "White",
    },
  };
  console.log("MaC handleCreateNewUnion finished");

  return {newState, effect: undefined};
}

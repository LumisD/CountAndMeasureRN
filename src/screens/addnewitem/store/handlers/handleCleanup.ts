import {toObjectIdOrUndefined} from "../../../../data/db/utils";
import {MeasureAndCountRepository} from "../../../../data/repository/MeasureAndCountRepository";
import {AddNewItemEffect} from "../../AddNewItemEffect";
import {AddNewItemState} from "../../AddNewItemState";

export async function handleCleanup(
  repo: MeasureAndCountRepository,
  get: () => {state: AddNewItemState},
): Promise<{newState: AddNewItemState; effect?: AddNewItemEffect}> {
  console.log("MaC handleCleanup started");

  const currentState = get().state;
  const unionId = currentState.newOrEditChipboard.unionId;

  const objectId = toObjectIdOrUndefined(unionId);
  if (!objectId) {
    console.error(
      `MaC handleCleanup: Invalid unionId: ${unionId} , objectId: ${objectId}`,
    );
    return {newState: currentState};
  }

  const count = await repo.getChipboardsCountByUnionId(objectId);
  if (count === 0) {
    await repo.deleteUnionOfChipboards(objectId);
  }

  console.log("MaC handleCleanup finished");
  return {newState: currentState, effect: undefined};
}

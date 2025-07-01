import {toObjectIdOrUndefined} from "../../../../data/db/utils";
import {MeasureAndCountRepository} from "../../../../data/repository/MeasureAndCountRepository";
import {AddNewItemEffect} from "../../AddNewItemEffect";
import {AddNewItemState} from "../../AddNewItemState";

export async function handleScreenExit(
  repo: MeasureAndCountRepository,
  get: () => {state: AddNewItemState},
): Promise<{newState: AddNewItemState; effect?: AddNewItemEffect}> {
  const currentState = get().state;
  const unionId = currentState.newOrEditChipboard.unionId;
  const objectId = toObjectIdOrUndefined(unionId);

  if (!objectId) {
    console.error(
      `handleScreenExit: Invalid union.id: ${unionId} , objectId: ${objectId}`,
    );
    return {newState: currentState, effect: undefined};
  }

  const chipboardCount = await repo.getChipboardsCountByUnionId(objectId);
  if (chipboardCount === 0) {
    await repo.deleteUnionOfChipboards(objectId);
  }

  return {newState: currentState, effect: undefined};
}

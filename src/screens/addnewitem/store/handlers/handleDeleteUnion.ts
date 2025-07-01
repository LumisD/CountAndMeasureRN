import {toObjectIdOrUndefined} from "../../../../data/db/schemas/UnionOfChipboards";
import {MeasureAndCountRepository} from "../../../../data/repository/MeasureAndCountRepository";
import {AddNewItemEffect, NAVIGATE_BACK} from "../../AddNewItemEffect";
import {AddNewItemState} from "../../AddNewItemState";

export async function handleDeleteUnion(
  hasToDeletePermanently: boolean,
  repo: MeasureAndCountRepository,
  get: () => {state: AddNewItemState},
): Promise<{newState: AddNewItemState; effect?: AddNewItemEffect}> {
  const currentState = get().state;
  const union = currentState.unionOfChipboards;
  const objectId = toObjectIdOrUndefined(union.id);

  if (!objectId) {
    console.error("Invalid union.id, skipping deletion");
    return {newState: currentState, effect: undefined};
  }

  if (hasToDeletePermanently) {
    // IF hasToDeletePermanently:
    // delete unionOfChipboards and related chipboards from db
    // go back to AddScreen
    await repo.deleteUnionOfChipboards(objectId);
    await repo.deleteAllChipboardsByUnionId(objectId);
  } else {
    // IF NOT hasToDeletePermanently:
    // set unionOfChipboards.isMarkedAsDeleted to true and updatedAt = System.currentTimeMillis()
    // save unionOfChipboards in db
    // go back to AddScreen
    await repo.setUnionOfChipboardsIsMarkedAsDeleted(
      objectId,
      true,
      Date.now(),
    );
  }

  return {
    newState: currentState,
    effect: {type: NAVIGATE_BACK},
  };
}

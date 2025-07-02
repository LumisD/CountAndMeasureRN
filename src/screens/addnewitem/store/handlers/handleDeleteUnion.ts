import {toObjectIdOrUndefined} from "../../../../data/db/utils";
import {MeasureAndCountRepository} from "../../../../data/repository/MeasureAndCountRepository";
import {AddNewItemEffect, NAVIGATE_BACK} from "../../AddNewItemEffect";
import {AddNewItemState} from "../../AddNewItemState";

export async function handleDeleteUnion(
  hasToDeletePermanently: boolean,
  repo: MeasureAndCountRepository,
  get: () => {state: AddNewItemState},
): Promise<{newState: AddNewItemState; effect?: AddNewItemEffect}> {
  console.log("MaC handleDeleteUnion started");
  const currentState = get().state;
  const union = currentState.unionOfChipboards;
  const objectId = toObjectIdOrUndefined(union.id);

  if (!objectId) {
    console.error(
      `MaC handleDeleteUnion: Invalid union.id: ${union.id} , objectId: ${objectId}`,
    );
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
  console.log("MaC handleDeleteUnion finished");

  return {
    newState: currentState,
    effect: {type: NAVIGATE_BACK},
  };
}

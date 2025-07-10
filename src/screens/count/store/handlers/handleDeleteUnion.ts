import {CountState} from "../../CountState";
import {
  CountEffect,
  NAVIGATE_TO_LISTS_SCREEN,
  NAVIGATE_TO_NEW_SCREEN,
} from "../../CountEffect";
import {MeasureAndCountRepository} from "../../../../data/repository/MeasureAndCountRepository";
import {toObjectIdOrUndefined} from "../../../../data/db/utils";

export async function handleDeleteUnion(
  hasToDeleteCompletely: boolean,
  repo: MeasureAndCountRepository,
  get: () => {state: CountState},
): Promise<{newState: CountState; effect?: CountEffect}> {
  const currentState = get().state;
  const unionId = toObjectIdOrUndefined(currentState.unionOfChipboards.id);

  if (!unionId) {
    console.error(
      `handleDeleteUnion: invalid unionId: ${currentState.unionOfChipboards.id}`,
    );
    return {newState: currentState, effect: undefined};
  }

  if (hasToDeleteCompletely) {
    await repo.deleteUnionOfChipboards(unionId);
  } else {
    // set unionOfChipboards.isMarkedAsDeleted to true and updatedAt = System.currentTimeMillis()
    // save unionOfChipboards in db
    await repo.setUnionOfChipboardsIsMarkedAsDeleted(unionId, true, Date.now());
  }

  // check if db has unionOfChipboards at least one
  // if yes - go to ListsScreen
  // if no - go to NewScreen
  const unionCount = await repo.countUnions();
  const effect: CountEffect =
    unionCount > 0
      ? {type: NAVIGATE_TO_LISTS_SCREEN}
      : {type: NAVIGATE_TO_NEW_SCREEN};

  return {
    newState: currentState,
    effect,
  };
}

import {CountState} from "../../CountState";
import {MeasureAndCountRepository} from "../../../../data/repository/MeasureAndCountRepository";
import {toObjectIdOrUndefined} from "../../../../data/db/utils";

export async function handleRestoreUnion(
  repo: MeasureAndCountRepository,
  get: () => {state: CountState},
): Promise<{newState: CountState; effect?: undefined}> {
  // set unionOfChipboards.isMarkedAsDeleted to false and updatedAt = System.currentTimeMillis()
  // save unionOfChipboards in db
  // update state with new unionOfChipboards
  console.log("MaC handleRestoreUnion started");

  const currentState = get().state;
  const unionId = toObjectIdOrUndefined(currentState.unionOfChipboards.id);
  if (!unionId) {
    console.error(
      `handleRestoreUnion: invalid unionId: ${currentState.unionOfChipboards.id}`,
    );
    return {newState: currentState};
  }

  await repo.setUnionOfChipboardsIsMarkedAsDeleted(unionId, false, Date.now());

  const newState: CountState = {
    ...currentState,
    unionOfChipboards: {
      ...currentState.unionOfChipboards,
      isMarkedAsDeleted: false,
    },
  };
  console.log("MaC handleRestoreUnion finished");

  return {newState, effect: undefined};
}

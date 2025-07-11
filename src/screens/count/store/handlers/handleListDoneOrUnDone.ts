import {CountState} from "../../CountState";
import {MeasureAndCountRepository} from "../../../../data/repository/MeasureAndCountRepository";
import {toObjectIdOrUndefined} from "../../../../data/db/utils";

export async function handleListDoneOrUnDone(
  repo: MeasureAndCountRepository,
  get: () => {state: CountState},
): Promise<{newState: CountState; effect?: undefined}> {
  // set unionOfChipboards.isFinished to opposite of current value
  // set updatedAt = System.currentTimeMillis()
  // save unionOfChipboards in db
  // update state with new unionOfChipboards
  console.log("MaC handleListDoneOrUnDone started");

  const currentState = get().state;
  const currentUnion = currentState.unionOfChipboards;

  const unionId = toObjectIdOrUndefined(currentUnion.id);
  if (!unionId) {
    console.error(
      `handleListDoneOrUnDone: invalid unionId: ${currentUnion.id}`,
    );
    return {newState: currentState};
  }

  const updatedAt = Date.now();
  const newIsFinished = !currentUnion.isFinished;

  await repo.setUnionOfChipboardsIsFinished(unionId, newIsFinished, updatedAt);

  const updatedUnion = {
    ...currentUnion,
    isFinished: newIsFinished,
    updatedAt,
  };

  const newState: CountState = {
    ...currentState,
    unionOfChipboards: updatedUnion,
  };
  console.log("MaC handleListDoneOrUnDone finished");

  return {newState, effect: undefined};
}

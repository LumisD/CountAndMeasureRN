import {toObjectIdOrUndefined} from "../../../../data/db/utils";
import {MeasureAndCountRepository} from "../../../../data/repository/MeasureAndCountRepository";
import {AddNewItemEffect} from "../../AddNewItemEffect";
import {AddNewItemState} from "../../AddNewItemState";

export async function handleUpdateUnionTitle(
  newTitle: string,
  repo: MeasureAndCountRepository,
  get: () => {state: AddNewItemState},
): Promise<{newState: AddNewItemState; effect?: AddNewItemEffect}> {
  const currentState = get().state;
  const union = currentState.unionOfChipboards;

  const objectId = toObjectIdOrUndefined(union.id);
  if (!objectId) {
    console.error("Invalid union.id, skipping update");
    return {newState: currentState, effect: undefined};
  }

  await repo.updateUnionOfChipboardsTitle(objectId, newTitle, Date.now());

  const updatedUnion = {
    ...union,
    title: newTitle,
  };

  const newState: AddNewItemState = {
    ...currentState,
    unionOfChipboards: updatedUnion,
  };

  return {newState, effect: undefined};
}

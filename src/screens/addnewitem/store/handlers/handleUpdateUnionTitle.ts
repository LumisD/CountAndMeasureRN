import {toObjectIdOrUndefined} from "../../../../data/db/utils";
import {MeasureAndCountRepository} from "../../../../data/repository/MeasureAndCountRepository";
import {AddNewItemEffect} from "../../AddNewItemEffect";
import {AddNewItemState} from "../../AddNewItemState";

export async function handleUpdateUnionTitle(
  newTitle: string,
  repo: MeasureAndCountRepository,
  get: () => {state: AddNewItemState},
): Promise<{newState: AddNewItemState; effect?: AddNewItemEffect}> {
  console.log("MaC handleUpdateUnionTitle started");
  const currentState = get().state;
  const union = currentState.unionOfChipboards;

  const objectId = toObjectIdOrUndefined(union.id);
  if (!objectId) {
    console.error(
      `MaC handleUpdateUnionTitle: Invalid union.id: ${union.id} , objectId: ${objectId}`,
    );
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
  console.log("MaC handleUpdateUnionTitle finished");

  return {newState, effect: undefined};
}

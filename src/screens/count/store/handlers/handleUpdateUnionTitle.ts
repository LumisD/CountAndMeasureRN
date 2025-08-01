import {toObjectIdOrUndefined} from "../../../../data/db/utils";
import {MeasureAndCountRepository} from "../../../../data/repository/MeasureAndCountRepository";
import {CountEffect} from "../../CountEffect";
import {CountState} from "../../CountState";

export async function handleUpdateUnionTitle(
  newTitle: string,
  repo: MeasureAndCountRepository,
  get: () => {state: CountState},
): Promise<{newState: CountState; effect?: CountEffect}> {
  console.log("MaC handleUpdateUnionTitle started newTitle:", newTitle);
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

  const newState: CountState = {
    ...currentState,
    unionOfChipboards: updatedUnion,
  };
  console.log("MaC handleUpdateUnionTitle finished");

  return {newState, effect: undefined};
}

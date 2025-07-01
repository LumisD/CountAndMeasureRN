import {toObjectIdOrUndefined} from "../../../../data/db/utils";
import {MeasureAndCountRepository} from "../../../../data/repository/MeasureAndCountRepository";
import {AddNewItemEffect, FLASH_ADD_ITEM_AREA} from "../../AddNewItemEffect";
import {AddNewItemState} from "../../AddNewItemState";
import {ChipboardUI} from "../../models/ChipboardUI";

export async function handleEditChipboardInAddAreaAndRemoveFromDb(
  chipboard: ChipboardUI,
  repo: MeasureAndCountRepository,
  get: () => {state: AddNewItemState},
): Promise<{newState: AddNewItemState; effect?: AddNewItemEffect}> {
  const currentState = get().state;

  const objectId = toObjectIdOrUndefined(chipboard.id);
  if (!objectId) {
    console.error(
      `handleEditChipboardInAddAreaAndRemoveFromDb: Invalid chipboard.id: ${chipboard.id} , objectId: ${objectId}`,
    );
    return {newState: currentState, effect: undefined};
  }

  const newState: AddNewItemState = {
    ...currentState,
    isAddAreaOpen: true,
    isAddButtonAvailable: true,
    newOrEditChipboard: chipboard,
  };

  await repo.deleteChipboardById(objectId);

  return {
    newState,
    effect: {type: FLASH_ADD_ITEM_AREA},
  };
}

import {toObjectIdOrUndefined} from "../../../../data/db/utils";
import {MeasureAndCountRepository} from "../../../../data/repository/MeasureAndCountRepository";
import {AddNewItemEffect, SHOW_SNACKBAR} from "../../AddNewItemEffect";
import {AddNewItemState} from "../../AddNewItemState";

export async function handleDeleteChipboardFromDb(
  chipboardId: string,
  repo: MeasureAndCountRepository,
  get: () => {state: AddNewItemState},
  t: (key: string) => string,
): Promise<{newState: AddNewItemState; effect?: AddNewItemEffect}> {
  const currentState = get().state;
  const objectId = toObjectIdOrUndefined(chipboardId);
  if (!objectId) {
    console.error("Invalid chipboardId, skipping update");
    return {newState: currentState, effect: undefined};
  }

  await repo.deleteChipboardById(objectId);

  return {
    newState: currentState,
    effect: {type: SHOW_SNACKBAR, message: t("item_deleted")},
  };
}

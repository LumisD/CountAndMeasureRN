import {toObjectIdOrUndefined} from "../../../../data/db/utils";
import {MeasureAndCountRepository} from "../../../../data/repository/MeasureAndCountRepository";
import {
  CountEffect,
  FLASH_FIND_ITEM_AREA,
  SHOW_NOT_EXCEEDING_TARGET_QUANTITY_DIALOG,
} from "../../CountEffect";
import {CountState} from "../../CountState";
import {getChipboardWithInitialValuesAndCharacteristics} from "../utils";

export async function handleSetFoundChipboard(
  repo: MeasureAndCountRepository,
  get: () => {state: CountState},
): Promise<{newState: CountState; effect?: CountEffect}> {
  // Starting points:
  // this function can be called only for chipboards with state = 0
  // qty can be equal or smaller than original qty
  // chipboardToFind can differ only with real sizes and qty from the chipboard in db with the same id

  const currentState = get().state;
  const chipboardToFind = currentState.chipboardToFind;

  const chipboardToFindId = toObjectIdOrUndefined(chipboardToFind.id);
  const unionId = toObjectIdOrUndefined(chipboardToFind.unionId);
  if (!chipboardToFindId || !unionId) {
    console.error(
      `MaC handleStart: Invalid chipboardToFindId: ${chipboardToFind.id}, unionId: ${chipboardToFind.unionId}`,
    );
    return {newState: currentState, effect: undefined};
  }

  const originalChipboardInDb = await repo.getChipboardByIdAndUnionId(
    chipboardToFindId,
    unionId,
  );

  let effect: CountEffect | undefined = undefined;
  let isShouldSkipLogic = false;

  if (!originalChipboardInDb) {
    // This should not happen if the logic is correct,
    // but save in db chipboardToFind with current id
    const foundChipboard = {...chipboardToFind, state: 1};
    await repo.insertChipboard(foundChipboard);
    isShouldSkipLogic = true;
  }

  if (!isShouldSkipLogic) {
    const quantityOriginalInDb = originalChipboardInDb!.quantity;
    const quantityFromToFind = chipboardToFind.quantity;

    // first to check: unionId, id != chipboardToFind.id, state = 1
    // second to check: all fields except qty - dimensions, direction, color, colorName,
    // title1, size1, realSize1, title2, size2, realSize2, title3, size3, realSize3
    const similarFoundChipboard = await repo.findSimilarFoundChipboard(
      chipboardToFind,
    );

    if (quantityFromToFind > quantityOriginalInDb) {
      // impossible according current logic
      effect = {
        type: SHOW_NOT_EXCEEDING_TARGET_QUANTITY_DIALOG,
        targetQuantity: quantityOriginalInDb,
        enteredQuantity: quantityFromToFind,
      };
      return {newState: currentState, effect};
    }

    const similarFoundChipboardId = similarFoundChipboard
      ? toObjectIdOrUndefined(similarFoundChipboard.id)
      : undefined;
    const originalChipboardInDbId = originalChipboardInDb
      ? toObjectIdOrUndefined(originalChipboardInDb!.id)
      : undefined;

    if (!originalChipboardInDbId || !similarFoundChipboardId) {
      console.error(
        `MaC handleStart: Invalid originalChipboardInDbId: ${originalChipboardInDbId}, similarFoundChipboardId: ${similarFoundChipboardId}`,
      );
      return {newState: currentState, effect: undefined};
    }

    if (quantityFromToFind === quantityOriginalInDb) {
      if (similarFoundChipboard) {
        // Similar found chipboard exists:
        await repo.updateChipboardQuantity(
          similarFoundChipboardId,
          similarFoundChipboard.quantity + quantityFromToFind,
        );
        await repo.deleteChipboardById(originalChipboardInDbId);
      } else {
        // No similar found chipboard: insert chipboardToFind in db as found (state = 1)
        await repo.insertChipboard({...chipboardToFind, state: 1});
      }
    } else {
      // quantityFromToFind < quantityOriginalInDb
      if (similarFoundChipboard) {
        // Similar found chipboard exists:
        await repo.updateChipboardQuantity(
          similarFoundChipboardId,
          similarFoundChipboard.quantity + quantityFromToFind,
        );
        await repo.updateChipboardQuantity(
          originalChipboardInDbId,
          quantityOriginalInDb - quantityFromToFind,
        );
      } else {
        // No similar found chipboard: create new chipboard with qty of chipboardToFind
        // AND decrease qty of original chipboard with the same id in db
        const newFoundChipboard = {
          ...chipboardToFind,
          id: "0", // to make db create new chipboard
          state: 1,
        };
        await repo.insertChipboard(newFoundChipboard);
        await repo.updateChipboardQuantity(
          originalChipboardInDbId,
          quantityOriginalInDb - quantityFromToFind,
        );
      }
    }
  }

  // finally:
  // set chipboardToFind to initial values and characteristics,
  // also isUnderReview = false (in getChipboardWithInitialValuesAndCharacteristics) in the list,
  // also isFoundButtonAvailable = false

  const updatedChipboards = currentState.chipboards.map(it =>
    it.isUnderReview ? {...it, isUnderReview: false} : it,
  );

  const newChipboardToFind = getChipboardWithInitialValuesAndCharacteristics(
    currentState.chipboardToFind,
    currentState.unionOfChipboards.dimensions,
    currentState.unionOfChipboards.direction,
  );

  const newState: CountState = {
    ...currentState,
    chipboards: updatedChipboards,
    chipboardToFind: newChipboardToFind,
    isUnknownButtonAvailable: false,
    isFoundButtonAvailable: false,
  };

  effect = {type: FLASH_FIND_ITEM_AREA};
  return {newState, effect};
}

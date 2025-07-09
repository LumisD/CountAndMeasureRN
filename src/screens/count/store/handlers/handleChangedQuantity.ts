import {MeasureAndCountRepository} from "../../../../data/repository/MeasureAndCountRepository";
import {
  CountEffect,
  SHOW_NOT_EXCEEDING_TARGET_QUANTITY_DIALOG,
} from "../../CountEffect";
import {CountState} from "../../CountState";
import {getChipboardAsString, setUnknownButtonAvailability} from "../utils";
import {toObjectIdOrUndefined} from "../../../../data/db/utils";
import {ChipboardUI} from "../../models/ChipboardUI";

export async function handleChangedQuantity(
  newQuantityAsString: string,
  repo: MeasureAndCountRepository,
  get: () => {state: CountState},
): Promise<{newState: CountState; effect?: CountEffect}> {
  // chipboardToFind can have only state 0 or 2 (not found and unknown)
  // if state == 0 - quantity cannot be bigger than the qty of the chipboard with the same id in the list
  //   so, if that happened - set chipboardToFind.quantity = chipboard.quantity AND show a dialog with a message about not exceeding target quantity
  // if state == 2 - quantity can be any number
  // don't sortByQuantity if a chipbord isUnderReview = true
  console.log("MaC handleChangedQuantity started", newQuantityAsString);

  const currentState = get().state;
  const chipboardInFindArea = currentState.chipboardToFind;
  const isUnderReview = chipboardInFindArea.isUnderReview;
  const newQuantityAsInt = parseInt(newQuantityAsString) || 0;

  if (
    newQuantityAsInt === 0 ||
    newQuantityAsInt === 1 ||
    chipboardInFindArea.state === 2
  ) {
    // if qty is small OR it's unknown chipboard
    const stateAfterSort = isUnderReview
      ? currentState
      : {
          ...currentState,
          chipboards: sortByQuantity(newQuantityAsString, currentState),
        };

    const {chipboardToFind, isUnknownButtonAvailable, isFoundButtonAvailable} =
      updateChipboardQuantity(newQuantityAsString, stateAfterSort);

    const newState: CountState = {
      ...stateAfterSort,
      chipboardToFind,
      isUnknownButtonAvailable,
      isFoundButtonAvailable,
    };

    return {newState, effect: undefined};
  }

  const chipboardId = toObjectIdOrUndefined(chipboardInFindArea.id);
  const unionId = toObjectIdOrUndefined(chipboardInFindArea.unionId);

  if (!chipboardId || !unionId) {
    console.error(
      `MaC handleChangedQuantity: Invalid chipboardId/unionId: ${chipboardInFindArea.id} , unionId: ${chipboardInFindArea.unionId}`,
    );
    return {newState: currentState, effect: undefined};
  }

  const originalQuantity = await repo.getQuantityOfChipboardByConditions(
    chipboardId,
    unionId,
    0,
  );

  const quantityToUse =
    originalQuantity === -1 || newQuantityAsInt <= originalQuantity
      ? newQuantityAsString
      : originalQuantity.toString();

  const stateAfterSort = isUnderReview
    ? currentState
    : {
        ...currentState,
        chipboards: sortByQuantity(quantityToUse, currentState),
      };

  const {chipboardToFind, isUnknownButtonAvailable, isFoundButtonAvailable} =
    updateChipboardQuantity(quantityToUse, stateAfterSort);

  const newState: CountState = {
    ...stateAfterSort,
    chipboardToFind,
    isUnknownButtonAvailable,
    isFoundButtonAvailable,
  };

  const effect =
    originalQuantity !== -1 && newQuantityAsInt > originalQuantity
      ? {
          type: SHOW_NOT_EXCEEDING_TARGET_QUANTITY_DIALOG,
          targetQuantity: originalQuantity,
          enteredQuantity: newQuantityAsInt,
        }
      : undefined;
  console.log("MaC handleChangedQuantity finished");

  return {newState, effect};
}

function sortByQuantity(
  findQuantityAsString: string,
  currentState: CountState,
): ChipboardUI[] {
  // sort not found chipboard by quantity among those only with state = 0
  // and sorting logic is: for example findQuantityAsString = "2"
  // a) first find a quantity with "2" and place them on top (if more than one chipboard is found)
  // b) then rest of chipboards
  // The logic has to be applied only to not found chipboards (state = 0)

  if (!findQuantityAsString || findQuantityAsString === "0")
    return currentState.chipboards;

  const chipboardsToSort = currentState.chipboards.filter(it => it.state === 0);
  const otherChipboards = currentState.chipboards.filter(it => it.state !== 0);

  const sortedChipboards = chipboardsToSort.sort((a, b) => {
    const aPriority = a.quantityAsString === findQuantityAsString ? 0 : 1;
    const bPriority = b.quantityAsString === findQuantityAsString ? 0 : 1;
    return aPriority - bPriority;
  });

  return [...sortedChipboards, ...otherChipboards];
}

function updateChipboardQuantity(
  newQuantityAsString: string,
  currentState: CountState,
): {
  chipboardToFind: ChipboardUI;
  isUnknownButtonAvailable: boolean;
  isFoundButtonAvailable: boolean;
} {
  const newQuantityAsInt = parseInt(newQuantityAsString) || 0;

  const updatedChipboard = {
    ...currentState.chipboardToFind,
    quantityAsString: newQuantityAsString,
    quantity: newQuantityAsInt,
  };

  const updatedChipboard2 = {
    ...updatedChipboard,
    chipboardAsString: getChipboardAsString(
      updatedChipboard,
      currentState.unionOfChipboards.dimensions,
      currentState.unionOfChipboards.direction,
    ),
  };

  const isUnknownButtonAvailable = setUnknownButtonAvailability(
    updatedChipboard,
    currentState.unionOfChipboards.dimensions,
  );

  const isFoundButtonAvailable = newQuantityAsInt > 0;

  return {
    chipboardToFind: updatedChipboard2,
    isUnknownButtonAvailable,
    isFoundButtonAvailable,
  };
}
